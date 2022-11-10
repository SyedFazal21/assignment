import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { AuthService } from '../auth.service';
import { Summary } from '../models/summary';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  // Helper Vaiables to show API data in the UI
  public newOrders;
  public averageSales;
  public totalEarnings;
  public inDelivery;
  public delivered;
  public refund;
  public processing;
  public cancelled;

  public weekDataArray = [];

  // Helper for closing API Subscription
  private $unSub = new Subject();

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getSummary();
    this.getWeekSummary();
  }

  // Closing subscription for API call
  ngOnDestroy(): void {
    this.$unSub.next(false);
    this.$unSub.complete();
  }

  // Get Summary from API and map it to variable
  getSummary() {
    this.authService
      .getOrdersSummary()
      .pipe(takeUntil(this.$unSub))
      .subscribe((res: Summary) => {
        this.mapValues(res);
      });
  }

  // Assigns values to variable that are shown in the UI
  mapValues(summary: Summary) {
    this.newOrders = summary.data.overview.new_orders[0].new_orders;
    this.totalEarnings = summary.data.overview.total_earnings[0].total_earnings;
    this.averageSales = summary.data.overview.average_sale[0].average_sale;

    this.processing = summary.data.summary[0].count;
    this.delivered = summary.data.summary[1].count;
    this.inDelivery = summary.data.summary[2].count;
    this.refund = summary.data.summary[3].count;
    this.cancelled = summary.data.summary[4].count;
  }

  // Get last 7 days of summary to show in the graph
  getWeekSummary() {
    this.authService
      .getWeekOrders()
      .pipe(takeUntil(this.$unSub))
      .subscribe((res) => {
        this.weekDataArray = Object.values(res.data.last7Days);
      });
  }

  // Navigate to Orders page
  navigateToOrders() {
    this.router.navigate(['/orders']);
  }
}
