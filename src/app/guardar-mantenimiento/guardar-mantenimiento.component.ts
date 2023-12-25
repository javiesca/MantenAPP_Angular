import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Filtros } from '../filtros';
import { FiltrosService } from '../filtros.service';
import { VehiculoService } from '../vehiculo.service';
import { Vehiculo } from '../vehiculo';

@Component({
  selector: 'app-guardar-mantenimiento',
  templateUrl: './guardar-mantenimiento.component.html',
  styleUrl: './guardar-mantenimiento.component.css'
})
export class GuardarMantenimientoComponent implements OnInit {

  idVehiculo: number

  filtros : Filtros = new Filtros();
  vehiculo : Vehiculo = new Vehiculo();

  constructor(private route:ActivatedRoute, private router:Router, private fs : FiltrosService,
      private vs : VehiculoService) { }

  ngOnInit(): void {
    this.idVehiculo = this.route.snapshot.params['idVehiculo'];
    this.getVehiculo();
  }

  getVehiculo(){
    this.vs.getVehiculoById(this.idVehiculo).subscribe(data => {
      this.vehiculo = data;
      this.filtros.vehiculo = this.vehiculo;
    })
  }

  saveFiltros(){
    this.fs.saveFiltros(this.filtros).subscribe(dato => {
      console.log(dato);
      this.irDetalleVehiculo();
    }, error => console.log(error));
  }

  irDetalleVehiculo(){
    this.router.navigate(['vehiculo-detalles', this.idVehiculo]);
  }

  onSubmit(){
    this.saveFiltros();
  }

}
