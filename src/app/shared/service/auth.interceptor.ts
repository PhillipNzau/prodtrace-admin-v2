import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {LocalService} from "./local.service";
import {LoginDataService} from "../../auth/services/login/login-data.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private localStore: LocalService,
    private authService: LoginDataService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const refresh = this.localStore.getData('ptr');
    const token = this.localStore.getData('ptt');

    if (token) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        // if (err instanceof HttpErrorResponse) {
        //   if (err.status === 401) {
        //     console.log('refeshtok', refresh)
        //     //// Run auto login
        //     this.authService.refreshToken(refresh).subscribe({
        //       next: (data)=> {
        //         console.log('Refreshed')},
        //       error: (error) => console.log('Error Refreshing')
        //     })
        //   }
        // }
        return throwError(err)
      })
    );
  }
}
