import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    accessToken: string | null = '';

    constructor(
        private httpClient: HttpClient) { }    

    getUrl(endpoint: string) {
        let serviceBaseUrl = environment.endPoints.beCase;
        let serviceUrl = `${serviceBaseUrl}/${endpoint}`;

        return serviceUrl;
    }

    get<T>(endpoint: string) {
        const url = this.getUrl(endpoint);
        return this.httpClient.get<T>(url);
    }

    getFromJson<T>(fileName: string) {
        return this.httpClient.get<T>(fileName);
    }

    post<T>(endpoint: string, data: any) {
        const url = this.getUrl(endpoint);
        return this.httpClient.post<T>(url, data);
    }

    put<T>(endpoint: string, data: any) {
        const url = this.getUrl(endpoint);
        return this.httpClient.put<T>(url, data);
    }

    delete<T>(endpoint: string) {
        const url = this.getUrl(endpoint);
        return this.httpClient.delete<T>(url);
    }
}
