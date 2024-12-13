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
  ruedas : Ruedas = new Ruedas();
  vehiculo : Vehiculo = new Vehiculo();



  constructor(private route : ActivatedRoute, private router: Router, private vs : VehiculoService,
    private rs : RuedasService) { }

  ngOnInit() {
    this.idVehiculo = this.route.snapshot.params['idVehiculo'];
    this.getVehiculo();
  }

  onSubmit() {
    this.saveRuedas();
  }


  saveRuedas(){
    this.rs.saveCambioRuedas(this.ruedas).subscribe(dato => {
      console.log(dato);
      this.irDetalleVehiculo();
    }, error => console.log(error));
  }

  getVehiculo(){
    this.vs.getVehiculoById(this.idVehiculo).subscribe(data => {
      this.vehiculo = data;
      this.ruedas.vehiculo = this.vehiculo;
    })
  }

  irDetalleVehiculo(){
    this.router.navigate(['vehiculo-detalles', this.idVehiculo]);
  }

}
