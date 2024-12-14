import { VehiculoService } from '../../services/vehiculo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ruedas } from '../../interfaces/ruedas';
import { RuedasService } from '../../services/ruedas.service';
import { Vehiculo } from '../../interfaces/vehiculo';


@Component({
  selector: 'app-guardar-ruedas',
  templateUrl: './guardar-ruedas.component.html',
  styleUrl: './guardar-ruedas.component.css'
})
export class GuardarRuedasComponent implements OnInit {

  idVehiculo: number;
  idRuedas: number;
  ruedas : Ruedas = new Ruedas();
  vehiculo : Vehiculo = new Vehiculo();
  edit : boolean = false;


  constructor(private route : ActivatedRoute, private router: Router, private vs : VehiculoService,
    private rs : RuedasService) { }

 

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['idRuedas']) {
        this.edit = true;
        this.idRuedas = params['idRuedas'];
        this.getCambioRuedas();
  
      } else if (params['idVehiculo']) {
        this.idVehiculo = params['idVehiculo'];
        this.getVehiculo();
      }
    });
  }
  
  

  onSubmit() {
    if(this.edit)
      this.updateCambioRuedas();
    else
    this.saveCambioRuedas();
  }


  saveCambioRuedas(){
    this.rs.saveCambioRuedas(this.ruedas).subscribe(dato => {
      this.irDetalleVehiculo();
    }, error => console.log(error));
  }

  updateCambioRuedas(){
    this.rs.updateRuedas(this.idRuedas, this.ruedas).subscribe(datos =>{
      this.router.navigate(['vehiculo-detalles', this.ruedas.vehiculo.idVehiculo]);
    }, error => console.log(error));
  }

  getVehiculo(){
    this.vs.getVehiculoById(this.idVehiculo).subscribe(data => {
      this.vehiculo = data;
      this.ruedas.vehiculo = this.vehiculo;
    })
  }

  getCambioRuedas(): void {
    this.idRuedas = this.route.snapshot.params['idRuedas'];
    this.rs.getRuedas(this.idRuedas).subscribe(datos =>{
        this.ruedas = datos;
    })
}

  irDetalleVehiculo(){
    this.router.navigate(['vehiculo-detalles', this.idVehiculo]);
  }

}
