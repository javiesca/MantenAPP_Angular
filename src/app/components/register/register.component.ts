import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  userName: string;
  password: string;
  mail: string

  errorMessage: string | null = null;


   constructor(private route : ActivatedRoute, private router: Router, private authServ : AuthService) { }

  register() {
    if (!this.userName || !this.mail || !this.password) {
      this.errorMessage = 'Debes rellenar todos los campos.';
      return;
    }

    this.errorMessage = null;

    this.authServ.register(this.userName, this.password, this.mail)
      .subscribe({
      next: () => {
        this.errorMessage = null;
        // navegar, mostrar éxito, etc.
        this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al registrar usuario.';
      }
    });
  }
  
  
}
