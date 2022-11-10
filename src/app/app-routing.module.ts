import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { HomeComponent } from './auth/home/home.component';
import { OrdersComponent } from './auth/orders/orders.component';
import { PagenotfoundComponent } from './auth/pagenotfound/pagenotfound.component';
import { SigninComponent } from './auth/signin/signin.component';

const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuardService],
  },
  {path: '**', component:PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
