import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError, timer } from 'rxjs';
import { catchError, retryWhen } from 'rxjs/operators';
import {  tap, mergeMap } from 'rxjs/operators';
export class HttpErrorInterceptor implements HttpInterceptor {
  private retryDelay = 2000;
 private retryMaxAttempts = 2
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('this is client side error');
            errorMsg = `Error: ${error.error.message}`;
          }
          else {
            console.log('this is server side error',error);
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          console.log(errorMsg);
          return throwError(`Internal Server Error : ${error.url} does not succeeded`);
        }),
        retryWhen(errors => {
          return errors.pipe(
            mergeMap((err, count) => {
              if (count === this.retryMaxAttempts) {
                return throwError(err);
              }
              return of(err).pipe(
                tap(error => console.log(`Retrying ${error.url}. Retry count ${count + 1}`)),
                mergeMap(() => timer(this.retryDelay))
              );
            })
          );
        })
      )
  }
}