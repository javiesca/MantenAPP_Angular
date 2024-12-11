import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../vehiculo';
import { VehiculoService } from '../vehiculo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-vehiculos',
  templateUrl: './lista-vehiculos.component.html',
  styleUrl: './lista-vehiculos.component.css'
})


export class ListaVehiculosComponent implements OnInit {

  vehiculos:Vehiculo[];

  constructor(private vs:VehiculoService, private router: Router) {};

  ngOnInit(): void {
    this.getVehiculos();
  }

  private getVehiculos(){
    this.vs.getListaVehiculos().subscribe(datos =>{
      this.vehiculos = datos;
      console.log(datos);
    })
  }

  deleteVehiculo(id: number){
    this.vs.deleteVehiculo(id).subscribe(datos =>{
      this.getVehiculos();
    })

  }

  guardarVehiculo(idVehiculo: number){
   this.router.navigate(['guardar-vehiculo', idVehiculo]);
  }

  detallesVehiculo(idVehiculo: number){
    this.router.navigate(['vehiculo-detalles', idVehiculo]);
  }
}
