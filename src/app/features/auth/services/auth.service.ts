import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { JwtRefreshToken } from '../../../core/models/auth/jwtRefreshToken.model';
import { ResponseModel } from '../../../core/models/shared/response.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private accessTokenKey = 'accessToken';
    private refreshTokenKey = 'refreshToken';
    private expiresInKey = 'expiresIn';

    private isUserLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());

    constructor(private http: HttpClient,
        private router: Router
    ) { }

    getAccessToken(): string | null {
        return localStorage.getItem(this.accessTokenKey);
    }

    setAccessToken(token: string): void {
        localStorage.setItem(this.accessTokenKey, token);
    }

    getRefreshToken(): string | null {
        return localStorage.getItem(this.refreshTokenKey);
    }

    setRefreshToken(refreshToken: string): void {
        localStorage.setItem(this.refreshTokenKey, refreshToken);
    }

    refreshToken(): Observable<string> {
        const refreshToken = this.getRefreshToken();
        const accessToken = this.getAccessToken();
        if (!refreshToken) return of('');

        return this.http.post<ResponseModel<JwtRefreshToken>>('/api/v1/auth/validate', { refreshToken, accessToken }).pipe(
            tap(response => {
                if (response.data) {
                    this.setAccessToken(response.data.accessToken);
                    this.setRefreshToken(response.data.refreshToken);
                }
            }),
            switchMap(response => of(response.data?.accessToken ?? ''))
        );
    }

    logout() {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
        localStorage.removeItem(this.expiresInKey);

        this.isUserLoggedInSubject.next(false);

        console.log('❌ Kullanıcı çıkış yaptı');

        this.router.navigate(['/auth/login']);
    }

    login(accesstoken: string, refreshToken: string, expiresIn: number) {
        this.setAccessToken(accesstoken);
        this.setRefreshToken(refreshToken);
        localStorage.setItem('expiresIn', expiresIn.toString());

        this.isUserLoggedInSubject.next(true);

        console.log('✅ Kullanıcı giriş yaptı');

        this.router.navigate(['/invoice']);
    }

    private checkLoginStatus(): boolean {
        return this.getAccessToken() !== null;
    }

    isUserLogin$(): Observable<boolean> {
        return this.isUserLoggedInSubject.asObservable();
    }
    //   isTokenValid(): boolean {
    //     const token = this.getToken();
    //     if (!token) return false;

    //     const payload = JSON.parse(atob(token.split('.')[1])); // JWT payload'ı al
    //     const exp = payload.exp * 1000; // Saniyeyi milisaniyeye çevir

    //     return Date.now() < exp; // Token süresi dolmamışsa true döner
    //   }
}
