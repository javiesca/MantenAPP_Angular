import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../interfaces/vehiculo';
import { VehiculoService } from '../../services/vehiculo.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-vehiculos',
  templateUrl: './lista-vehiculos.component.html',
  styleUrl: './lista-vehiculos.component.css'
})


export class ListaVehiculosComponent implements OnInit {

  vehiculos: Vehiculo[];
  loading: boolean = false;

  constructor(
    private vs: VehiculoService,
    private router: Router) { };

  ngOnInit(): void {
    this.getVehiculos();
  }

  private getVehiculos() {
    this.vs.getListaVehiculos().subscribe(datos => {
      this.vehiculos = datos;
    })
  }

  confirmDeleteVehiculo(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteVehiculo(id);
      }
    });
  }


  deleteVehiculo(id: number) {
    Swal.fire({
      title: 'Eliminando...',
      text: 'Por favor, espera mientras se elimina el vehículo.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.vs.deleteVehiculo(id).subscribe(
      response => {
        Swal.close();
        this.getVehiculos();
        Swal.fire(
          'Eliminado',
          'El vehículo ha sido eliminado.',
          'success'
        );
      },
      error => {
        Swal.close();
        Swal.fire(
          'Error',
          'Hubo un error al eliminar el vehículo.',
          'error'
        );
      }
    );
  }


  guardarVehiculo(idVehiculo: number) {
    this.router.navigate(['guardar-vehiculo', idVehiculo]);
  }

  detallesVehiculo(idVehiculo: number) {
    this.router.navigate(['vehiculo-detalles', idVehiculo]);
  }
}
