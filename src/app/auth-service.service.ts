import { OnInit } from '@angular/core';
// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from './variables';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //URL de la API Spring
  private baseURL = environment.apiBaseURL + "login";
  token : string | null;

  OnInit(){
    this.token = sessionStorage.getItem('token');
  }

  constructor(private http: HttpClient) { }

  login(userName: string, password: string) {
    return this.http.post<{token: string}>(this.baseURL, {userName, password}).pipe(
      tap(response => {
        sessionStorage.setItem('token', response.token);
      })
    );
  }
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }
}
