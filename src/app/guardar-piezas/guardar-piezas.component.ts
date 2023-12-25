import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Piezas } from '../piezas';
import { Vehiculo } from '../vehiculo';
import { VehiculoService } from '../vehiculo.service';
import { PiezasService } from '../piezas.service';

@Component({
  selector: 'app-guardar-piezas',
  templateUrl: './guardar-piezas.component.html',
  styleUrl: './guardar-piezas.component.css'
})
export class GuardarPiezasComponent implements OnInit {

  idVehiculo: number;
  piezas : Piezas = new Piezas();
  vehiculo : Vehiculo = new Vehiculo();

  constructor(private route : ActivatedRoute, private router: Router, private vs : VehiculoService,
      private ps : PiezasService) { }

  ngOnInit() {
    this.idVehiculo = this.route.snapshot.params['idVehiculo'];
    this.getVehiculo();
  }

  onSubmit() {
    this.savePiezas(this.piezas);
  }

  getVehiculo(){
    this.vs.getVehiculoById(this.idVehiculo).subscribe(data => {
      this.vehiculo = data;
      this.piezas.vehiculo = this.vehiculo;
    })
  }

  savePiezas(piezas : Piezas){
    this.ps.savePieza(piezas).subscribe(dato => {
      console.log(dato);
      this.irDetalleVehiculo();
    }, error => console.log(error));
  }

  irDetalleVehiculo(){
    this.router.navigate(['vehiculo-detalles', this.idVehiculo]);
  }

}
