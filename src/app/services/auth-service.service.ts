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
    const token = this.getStoredToken();
    if (!token || this.isTokenExpired(token)) {
      this.clearSession();
      return false;
    }

    this.token = token;
    return true;
  }

  getUsername(): string | null {
    const token = this.getStoredToken();

    if (!token) {
      return null;
    }

    try {
      const payloadBase64 = token.split('.')[1];
      const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = atob(base64);
      const payload = JSON.parse(jsonPayload);
      return payload.userName || payload.sub || null;
    } catch (e) {
      return null;
    }
  }

  clearSession(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('token');
    }
  }

  private getStoredToken(): string | null {
    if (typeof window !== 'undefined') {
      this.token = sessionStorage.getItem('token');
    }

    return this.token;
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payloadBase64 = token.split('.')[1];
      if (!payloadBase64) {
        return true;
      }

      const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = atob(base64);
      const payload = JSON.parse(jsonPayload);
      const exp = Number(payload.exp);

      if (!exp) {
        return false;
      }

      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      return exp <= currentTimeInSeconds;
    } catch {
      return true;
    }
  }
}
