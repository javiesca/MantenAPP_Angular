import { Injectable } from '@angular/core';
import { environment } from '../utils/variables';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  private baseURL = environment.apiBaseURL; // acaba en '/'

  constructor(private http: HttpClient) {}

  disparar(): Observable<string> {
    return this.http.post(`${this.baseURL}disparar`, {}, { responseType: 'text' });
  }
}
