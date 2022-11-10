import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { OrdersData } from '../models/order-list';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  public page = 1;
  public limit = 10;
  public ordersList: OrdersData[] = [];

  private $unSub = new Subject();

  constructor(private authService: AuthService) {}

  // Closing subscription for API call
  ngOnDestroy(): void {
    this.$unSub.next(true);
    this.$unSub.complete();
  }

  ngOnInit(): void {
    this.getOrdersList();
  }

  // Fetch Order list from API
  getOrdersList() {
    this.authService
      .getOrdersList(this.page, this.limit)
      .pipe(takeUntil(this.$unSub))
      .subscribe((res) => {
        this.ordersList = res.data;
        console.log(res.data);
      });
  }

  // Fetch more Orders from API
  getMoreOrders() {
    this.limit += 5;
    this.getOrdersList();
  }

  // Assign class Based on Order Status
  getClass(orderStatus) {
    if (orderStatus == 'processing') {
      return { 'text-bg-warning': true };
    } else if (orderStatus == 'delivered') {
      return { 'text-bg-success': true };
    } else if (orderStatus == 'cancelled') {
      return { 'text-bg-danger': true };
    } else if (orderStatus == 'refund') {
      return { 'text-bg-secondary': true };
    } else if (orderStatus == 'in delivery') {
      return { 'text-bg-primary': true };
    } else {
      return { 'text-bg-dark': true };
    }
  }

  // Filter Methods
  filterByDate() {
    this.ordersList = this.ordersList.sort((a, b) =>
      a.date.localeCompare(b.date)
    );
  }
  filterByAmount() {
    this.ordersList = this.ordersList.sort((a, b) => a.amount - b.amount);
  }
}
