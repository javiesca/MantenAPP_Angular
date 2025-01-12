import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../utils/variables';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //URL de la API Spring
  private baseURL = environment.apiBaseURL + "login";

  token : string | null;

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined') {
      this.token = sessionStorage.getItem('token');
    }
  }

  login(userName: string, password: string) {
    return this.http.post<{token: string}>(this.baseURL, {userName, password}).pipe(
      tap(response => {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('token', response.token);
        }
        this.token = response.token;
      })
    );
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      this.token = sessionStorage.getItem('token');
    }
    return !!this.token;
  }
}
