import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../utils/variables';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //URL de la API Spring
  private baseURL = environment.apiBaseURL;

  token: string | null = null;

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined') {
      this.token = sessionStorage.getItem('token');
    }
  }

  login(userName: string, password: string) {
    return this.http.post<{token: string}>(this.baseURL + "login", {userName, password}).pipe(
      tap(response => {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('token', response.token);
        }
        this.token = response.token;
      })
    );
  }

  register(userName: string, password: string, mail: string) {
    return this.http.post(
      `${this.baseURL}register`,
      { userName, password, mail }
    );
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      this.token = sessionStorage.getItem('token');
    }
    return !!this.token;
  }

  getUsername(): string | null {
    const token =
      this.token ||
      (typeof window !== 'undefined' ? sessionStorage.getItem('token') : null);

    if (!token) {
      return null;
    }

    try {
      const payloadBase64 = token.split('.')[1];
      const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = atob(base64);
      const payload = JSON.parse(jsonPayload);

      console.log(JSON.parse(atob(sessionStorage.getItem('token')!.split('.')[1])));

      // adapta esto al claim real de tu JWT
      return payload.userName || payload.sub || null;
    } catch (e) {
      return null;
    }
  }
}
