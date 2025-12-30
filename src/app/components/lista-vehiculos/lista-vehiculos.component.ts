import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../interfaces/vehiculo';
import { VehiculoService } from '../../services/vehiculo.service';
import { Router } from '@angular/router';
import { SwalFlowService } from '../../services/swal-flow.service';


@Component({
  selector: 'app-lista-vehiculos',
  templateUrl: './lista-vehiculos.component.html',
  styleUrl: './lista-vehiculos.component.css'
})


export class ListaVehiculosComponent implements OnInit {

  vehiculos: Vehiculo[];
  loading: boolean = false;
  imgError: Record<number, boolean> = {};
  pressedId: number | null = null;
  pressedBtn: string | null = null;
  
  constructor(
    private vs: VehiculoService,
    private router: Router,
    private swalFlow: SwalFlowService
  ) { };

  ngOnInit(): void {
    this.getVehiculos();
  }

  private getVehiculos() {
    this.vs.getListaVehiculos().subscribe(datos => {
      this.vehiculos = datos;
    })
  }

  deleteVehiculo(id: number) {
    this.swalFlow
      .deleteConfirm(() => this.vs.deleteVehiculo(id), () => this.getVehiculos())
      .subscribe();
  }

  guardarVehiculo(idVehiculo: number) {
    this.router.navigate(['guardar-vehiculo', idVehiculo]);
  }

  detallesVehiculo(idVehiculo: number) {
    this.router.navigate(['vehiculo-detalles', idVehiculo]);
  }
}
