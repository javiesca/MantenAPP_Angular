import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Piezas } from '../../interfaces/piezas';
import { Vehiculo } from '../../interfaces/vehiculo';
import { VehiculoService } from '../../services/vehiculo.service';
import { PiezasService } from '../../services/piezas.service';
import { SwalFlowService } from '../../services/swal-flow.service';


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
    private ps : PiezasService,
    private swalFlow: SwalFlowService
  ){ }

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
    this.swalFlow
      .save(this.ps.savePieza(this.piezas), () => this.irDetalleVehiculo())
      .subscribe();
  }

  
  uptadaPiezas(){
    this.swalFlow
      .update(this.ps.updatePiezas(this.idPiezas, this.piezas), () => this.irDetalleVehiculo())
      .subscribe();
  }  

  irDetalleVehiculo(){
    const id = this.piezas?.vehiculo?.idVehiculo ?? this.vehiculo?.idVehiculo ?? this.idVehiculo;
    this.router.navigate(['vehiculo-detalles', id], { fragment: 'piezas' });
  }

}
