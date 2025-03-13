import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Constant } from '../constant/constant';
import { ApiResponseModel } from '../models/ApiResponseModel';
import { User } from '../models/User';
import { LoginModel } from '../models/LoginModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  public $refreshToken = new BehaviorSubject<boolean>(false);
  public $refreshTokenReceived = new BehaviorSubject<boolean>(false);
  public $userLoggedIn = new BehaviorSubject<boolean>(false);

  constructor() {
    this.$refreshToken.subscribe((isRefresh: boolean) => {
      debugger;
      if (isRefresh) {
        this.refreshToken();
      }
    });
  }

  register(user: User): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(
      environment.BASE_URL + 'auth/register',
      user
    );
  }

  login(loginModel: LoginModel): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(
      environment.BASE_URL + 'auth/login',
      loginModel
    );
  }

  refreshToken() {
    debugger;
    let loggedUser: User = new User();
    const user = localStorage.getItem(Constant.LOGGED_IN_USER_KEY);
    if (user != null) {
      loggedUser = JSON.parse(user);
    }
    const obj = {
      userId: loggedUser.applicationUserId,
      refreshToken: localStorage.getItem(Constant.REFRESH_TOKEN_KEY),
    };
    this.http
      .post<ApiResponseModel>(environment.BASE_URL + 'auth/refresh-token', obj)
      .subscribe((res: ApiResponseModel) => {
        localStorage.setItem(Constant.ACCESS_TOKEN_KEY, res.data.accessToken);
        localStorage.setItem(Constant.REFRESH_TOKEN_KEY, res.data.refreshToken);
        this.$refreshTokenReceived.next(true);
      });
  }
}
