import { Component } from '@angular/core';
import { AuthService } from './auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Gestión Mantenimiento';

  constructor(public authService: AuthService, private router : Router) { }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
