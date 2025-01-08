import { Component } from '@angular/core';
import { Notas } from '../../interfaces/notas';
import { Vehiculo } from '../../interfaces/vehiculo';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoService } from '../../services/vehiculo.service';
import { NotasService } from '../../services/notas.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.css'
})
export class NotasComponent {

    idVehiculo: number;
    idNota: number;
    nota : Notas = new Notas();
    vehiculo : Vehiculo = new Vehiculo();
    edit : boolean = false;
  
    constructor(
      private route : ActivatedRoute,
      private router: Router,
      private vs : VehiculoService,
      private ns : NotasService) { }
  
    ngOnInit() {
      this.route.params.subscribe(params => {
        if (params['idNota']) {
          this.edit = true;
          this.idNota = params['idNota'];
          this.getNota();
        } else if (params['idVehiculo']) {
          this.idVehiculo = params['idVehiculo'];
          this.getVehiculo();
        }
      });
    }
  
    onSubmit() {
      if(this.edit)
        this.uptadaNota();
      else
        this.saveNota();
    }
  
    getVehiculo(){
      this.vs.getVehiculoById(this.idVehiculo).subscribe(data => {
        this.vehiculo = data;
        this.nota.vehiculo = this.vehiculo;
      })
    }
  
    getNota(){
      this.ns.getNota(this.idNota).subscribe(datos =>{
        this.nota = datos;
      })
    }
  
    saveNota(){
      this.ns.saveNota(this.nota).subscribe(dato => {
        console.log(dato);
        this.irDetalleVehiculo();
      }, error => console.log(error));
      
    }
  
    uptadaNota(){
      this.ns.updateNota(this.idNota, this.nota).subscribe(datos =>{
        console.log(datos);
        this.router.navigate(['vehiculo-detalles', this.nota.vehiculo.idVehiculo]);
      }, error => console.log(error));
      
    }
  
    irDetalleVehiculo(){
      this.router.navigate(['vehiculo-detalles', this.idVehiculo]);
    }

}
