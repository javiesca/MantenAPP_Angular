import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Piezas } from '../../interfaces/piezas';
import { Vehiculo } from '../../interfaces/vehiculo';
import { VehiculoService } from '../../services/vehiculo.service';
import { PiezasService } from '../../services/piezas.service';

@Component({
  selector: 'app-guardar-piezas',
  templateUrl: './guardar-piezas.component.html',
  styleUrl: './guardar-piezas.component.css'
})
export class GuardarPiezasComponent implements OnInit {

  idVehiculo: number;
  idPiezas: number;
  piezas : Piezas = new Piezas();
  vehiculo : Vehiculo = new Vehiculo();
  edit : boolean = false;

  constructor(
    private route : ActivatedRoute,
    private router: Router,
    private vs : VehiculoService,
    private ps : PiezasService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['idPiezas']) {
        this.edit = true;
        this.idPiezas = params['idPiezas'];
        this.getPieza();
      } else if (params['idVehiculo']) {
        this.idVehiculo = params['idVehiculo'];
        this.getVehiculo();
      }
    });
  }

  onSubmit() {
    if(this.edit)
      this.uptadaPiezas();
    else
      this.savePiezas();
  }

  getVehiculo(){
    this.vs.getVehiculoById(this.idVehiculo).subscribe(data => {
      this.vehiculo = data;
      this.piezas.vehiculo = this.vehiculo;
    })
  }

  getPieza(){
    this.ps.getPieza(this.idPiezas).subscribe(datos =>{
      this.piezas = datos;
    })
  }

  savePiezas(){
    this.ps.savePieza(this.piezas).subscribe(dato => {
      console.log(dato);
      this.irDetalleVehiculo();
    }, error => console.log(error));
  }

  uptadaPiezas(){
    this.ps.updatePiezas(this.idPiezas, this.piezas).subscribe(datos =>{
      console.log(datos);
      this.router.navigate(['vehiculo-detalles', this.piezas.vehiculo.idVehiculo]);
    }, error => console.log(error));
  }

  irDetalleVehiculo(){
    this.router.navigate(['vehiculo-detalles', this.idVehiculo]);
  }

}
