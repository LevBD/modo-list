import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseApi {
  constructor(protected http: HttpClient) {}

  public get<T>(url: string, options: any = {}): Observable<any> {
    return this.http.get<T>(url, options);
  }

  public post<T>(url: string, body: any = {}): Observable<any> {
    return this.http.post<T>(url, body);
  }

  public put<T>(url: string, body: any = {}): Observable<any> {
    return this.http.put<T>(url, body);
  }

  public patch<T>(url: string, body: any = {}): Observable<any> {
    return this.http.patch<T>(url, body);
  }

  public delete<T>(url: string, body: any = {}): Observable<any> {
    return this.http.delete<T>(url, body);
  }
}
