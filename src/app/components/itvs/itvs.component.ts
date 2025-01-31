import { Component, OnInit } from '@angular/core';
import { ITV } from '../../interfaces/itv';
import { Vehiculo } from '../../interfaces/vehiculo';
import { ActivatedRoute, Router } from '@angular/router';
import { ITVService } from '../../services/itvs.service';
import { VehiculoService } from '../../services/vehiculo.service';

@Component({
  selector: 'app-itvs',
  templateUrl: './itvs.component.html',
  styleUrl: './itvs.component.css'
})
export class ItvsComponent implements OnInit {

  idVehiculo : number;
  idITV : number;
  itv : ITV = new ITV();
  vehiculo : Vehiculo = new Vehiculo();
  edit : boolean = false;

  constructor(
    private route : ActivatedRoute,
    private router: Router,
    private itvs : ITVService,
    private vs : VehiculoService
  ) { }


  onSubmit() {
    if(this.edit)
      this.updateITV();
    else
    this.saveITV();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['idITV']) {
        this.edit = true;
        this.idITV = params['idITV'];
        this.getITV();
      }else if(params['idVehiculo']){
        this.idVehiculo = params['idVehiculo'];
        this.getVehiculo();
      }
    });
  }


  getITV(): void {
    this.idITV = this.route.snapshot.params['idITV'];
    this.itvs.getITV(this.idITV).subscribe(data => {
      this.itv = data;
    });
  }


  getVehiculo(){
    this.vs.getVehiculoById(this.idVehiculo).subscribe(data => {
      this.vehiculo = data;
      this.itv.vehiculo = this.vehiculo;
    })
  }


  saveITV(){
    this.itvs.saveITV(this.itv).subscribe(dato => {
      this.irDetalleVehiculo();
    }, error => console.log(error));
  }


  updateITV(){
    this.itvs.updateITV(this.idITV, this.itv).subscribe(datos =>{
      this.router.navigate(['vehiculo-detalles', this.itv.vehiculo.idVehiculo]);
    }, error => console.log(error));
  }

  irDetalleVehiculo(){
    this.router.navigate(['vehiculo-detalles', this.idVehiculo]);
  }

}
