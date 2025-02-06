import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpErrorService } from './http-error.service';
import { catchError, filter, map, Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from '../models/shared/response.model';

@Injectable({
    providedIn: 'root'
})
export class ApiHttpService {

    constructor(
        private httpService: HttpService,
        private httpErrorService: HttpErrorService) { }

    getWithQuery<T>(endpoint: string, queries: string[]): Observable<T> {
        let queriesString = "?";

        for (var i = 0; i < queries.length; i++) {
            if (i == 0)
                queriesString += queries;
            else
                queriesString += ("&" + queries);
        }

        return this.httpService.get<ResponseModel<T>>(endpoint + queriesString).pipe(
            filter(Boolean),
            map((response) => {
                if (!response || !response.data) {
                    throw new Error('Invalid response or no data found');
                }
                return response.data;
            }),
            catchError((err) => this.handleError(err))
        );
    };

    get<T>(endpoint: string): Observable<T> {

        return this.httpService.get<ResponseModel<T>>(endpoint).pipe(
            filter(Boolean),
            map((response) => {
                if (!response || !response.data) {
                    throw new Error('Invalid response or no data found');
                }
                return response.data;
            }),
            catchError((err) => this.handleError(err))
        );
    };

    post<T>(endpoint: string, data: any): Observable<T> {

        return this.httpService.post<ResponseModel<T>>(endpoint, data).pipe(
            filter(Boolean),
            map((response) => {
                if (!response || !response.data) {
                    throw new Error('Invalid response or no data found');
                }
                return response.data;
            }),
            catchError((err) => this.handleError(err))
        );
    };

    put<T>(endpoint: string, data: any): Observable<T> {

        return this.httpService.put<ResponseModel<T>>(endpoint, data).pipe(
            filter(Boolean),
            map((response) => {
                if (!response || !response.data) {
                    throw new Error('Invalid response or no data found');
                }
                return response.data;
            }),
            catchError((err) => this.handleError(err))
        );
    };

    delete<T>(endpoint: string): Observable<T> {

        return this.httpService.delete<ResponseModel<T>>(endpoint).pipe(
            filter(Boolean),
            map((response) => {
                if (!response || !response.data) {
                    throw new Error('Invalid response or no data found');
                }
                return response.data;
            }),
            catchError((err) => this.handleError(err))
        );
    };

    private handleError(err: HttpErrorResponse): Observable<never> {
        const formattedMessage = this.httpErrorService.formatError(err);
        return throwError(() => formattedMessage);
    }
}
