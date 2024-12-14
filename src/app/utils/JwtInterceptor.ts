import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}
  
  intercept(
    request: HttpRequest<any>, 
    next: HttpHandler,) {
    const token = sessionStorage.getItem('token');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Redirigir a la página de login
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}
  

