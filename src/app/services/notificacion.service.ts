import { Injectable } from '@angular/core';
import { environment } from '../utils/variables';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  private baseURL = environment.apiBaseURL;

  constructor(private http: HttpClient) { }

  disparar(): Observable<string> {
    const token = sessionStorage.getItem('token');

    return this.http.post(
      `${this.baseURL}avisos`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'text'
      }
    );
  }
}
