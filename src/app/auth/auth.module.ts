import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { GraphComponent } from './graph/graph.component';
import { OrdersComponent } from './orders/orders.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [SigninComponent, HomeComponent, GraphComponent, OrdersComponent, PagenotfoundComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule],
})
export class AuthModule {}
