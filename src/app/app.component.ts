import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth-service.service';
import { NotificacionService } from './services/notificacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Gestión Mantenimiento';
  http: any;

  constructor(
    public authService: AuthService,
    private router : Router,
    private notificacionService : NotificacionService) { }

  logout() {
    this.authService.clearSession();
    this.router.navigate(['/login']);
  }

  dispararNotificaciones() {
    Swal.fire({
      title: 'Comprobando...',
      text: 'Se están comprobando las fechas.',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    this.notificacionService.disparar().subscribe({
      next: () => {
        Swal.close();
        Swal.fire({
          title: 'Completado',
          text: 'Se han comprobado las fechas.',
          icon: 'success'
        });
      },
      error: err => {
        console.error(err);
        Swal.close();
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error al comprobar las fechas.',
          icon: 'error'
        });
      }
    });
  }

}
