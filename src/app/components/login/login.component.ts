import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  isLoading = false;
  successMessage: string | null = null;


  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    if (params['registered'] === 'true') {
      this.successMessage = 'Usuario creado satisfactoriamente.';
    }
  });
}

  login() {

    this.isLoading = true;


    this.authService.login(this.userName, this.password).subscribe(
      data => {
        this.isLoading = false;
        this.router.navigate(['/vehiculos']);
      },
      error => {
        if (error.status === 401) {
          this.incorrectCredentials = true;
          this.isLoading = false;
        }
      }
    );
  }
}
