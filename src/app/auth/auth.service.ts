import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from './models/login';
import { LoginRes } from './models/login-response';
import { OrdersList } from './models/order-list';
import { Summary } from './models/summary';
import { WeekData } from './models/week-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn = false;

  constructor(private http: HttpClient) {}

  login(credentials: Login): Observable<LoginRes> {
    return this.http.post<LoginRes>(
      'http://13.76.214.165:8001/api/login',
      credentials
    );
  }

  getOrdersSummary(): Observable<Summary> {
    const tokenObj = JSON.parse(sessionStorage.getItem('user'));

    if (tokenObj != null) {
      const token = tokenObj.token;

      let headers = {
        Authorization: token,
      };
      return this.http.get<Summary>(
        'http://13.76.214.165:8001/api/analytics/summary',
        {
          headers,
        }
      );
    }
    return null;
  }

  getWeekOrders(): Observable<WeekData> {
    const tokenObj = JSON.parse(sessionStorage.getItem('user'));

    if (tokenObj != null) {
      const token = tokenObj.token;

      let headers = {
        Authorization: token,
      };
      return this.http.get<WeekData>(
        'http://13.76.214.165:8001/api/analytics/last7Days',
        {
          headers,
        }
      );
    }
    return null;
  }

  getOrdersList(page: number, limit: number): Observable<OrdersList> {
    const tokenObj = JSON.parse(sessionStorage.getItem('user'));

    if (tokenObj != null) {
      const token = tokenObj.token;

      let headers = {
        Authorization: token,
      };

      let params = new HttpParams();
      params = params.append('page', page);
      params = params.append('limit', limit);

      return this.http.get<OrdersList>(
        'http://13.76.214.165:8001/api/orders',
        {
          headers,
          params,
        }
      );
    }
    return null;
  }
}
