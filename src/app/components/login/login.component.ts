import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  incorrectCredentials = false;
  userName: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.userName, this.password).subscribe(
      data => {
        this.router.navigate(['/vehiculos']);
      },
      error => {
        if (error.status === 401) {
          this.incorrectCredentials = true;
        }
      }
    );
  }
}
