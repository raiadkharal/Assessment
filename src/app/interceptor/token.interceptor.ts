import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Constant } from '../constant/constant';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  const token = localStorage.getItem(Constant.ACCESS_TOKEN_KEY);
  const clonedReq = req.clone({
    setHeaders:{
      Authorization:'Bearer '+token
    }
  })
  return next(clonedReq).pipe(
    catchError((error:HttpErrorResponse)=>{
      debugger;
      if(error.status===401){
        const isConfirm = confirm("Your Session is expired. Do you want to Continue");
        if(isConfirm){
          authService.$refreshToken.next(true);
        }
      }

      return throwError(()=>error)
    })
  );
};
