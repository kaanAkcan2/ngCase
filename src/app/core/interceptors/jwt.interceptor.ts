import { AuthService } from '../../features/auth/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.authService.getAccessToken();

        if (token) {
            authReq = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }

        return next.handle(authReq).pipe(
            catchError(err => {
                if (err.status === 401) {
                    return this.authService.refreshToken().pipe(
                        switchMap(newToken => {
                            this.authService.setAccessToken(newToken);
                            const clonedReq = req.clone({
                                setHeaders: { Authorization: `Bearer ${newToken}` }
                            });
                            return next.handle(clonedReq);
                        }),
                        catchError(refreshErr => {
                            this.authService.logout();
                            this.router.navigate(['/login']);
                            return throwError(() => refreshErr);
                        })
                    );
                }
                return throwError(() => err);
            })
        );
    }
}

export const JwtInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
};
