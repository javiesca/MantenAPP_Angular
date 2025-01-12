import { Component, OnInit } from '@angular/core';
import { Seguro } from '../../interfaces/seguros';
import { Vehiculo } from '../../interfaces/vehiculo';
import { VehiculoService } from '../../services/vehiculo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SegurosService } from '../../services/seguros.service';

@Component({
  selector: 'app-seguros',
  templateUrl: './seguros.component.html',
  styleUrl: './seguros.component.css'
})
export class SegurosComponent implements OnInit {

  idVehiculo : number;
  idSeguro : number;
  seguro : Seguro = new Seguro();
  vehiculo : Vehiculo = new Vehiculo();
  edit : boolean = false;

  constructor(
    private route : ActivatedRoute,
    private router: Router,
    private vs : VehiculoService,
    private ss : SegurosService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['idSeguro']) {
        this.edit = true;
        this.idSeguro = params['idSeguro'];
        this.getSeguro();
      }else if(params['idVehiculo']){
        this.idVehiculo = params['idVehiculo'];
        this.getVehiculo();
      }
    });
  }

  onSubmit() {
    if(this.edit)
      this.updateSeguro();
    else
    this.saveSeguro();
  }

  getSeguro(): void {
    this.idSeguro = this.route.snapshot.params['idSeguro'];
    this.ss.getSeguro(this.idSeguro).subscribe(data => {
      this.seguro = data;
    });
  }

  getVehiculo(){
    this.vs.getVehiculoById(this.idVehiculo).subscribe(data => {
      this.vehiculo = data;
      this.seguro.vehiculo = this.vehiculo;
    })
  }

  saveSeguro(){
    this.ss.saveSeguro(this.seguro).subscribe(dato => {
      this.irDetalleVehiculo();
    }, error => console.log(error));
  }


  updateSeguro(){
    this.ss.updateSeguro(this.idSeguro, this.seguro).subscribe(datos =>{
      this.router.navigate(['vehiculo-detalles', this.seguro.vehiculo.idVehiculo]);
    }, error => console.log(error));
  }

  irDetalleVehiculo(){
    this.router.navigate(['vehiculo-detalles', this.idVehiculo]);
  }

}
