
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehiculo } from '../../interfaces/vehiculo';
import { VehiculoService } from '../../services/vehiculo.service';

import { Filtros } from '../../interfaces/filtros';
import { RuedasService } from '../../services/ruedas.service';
import { Ruedas } from '../../interfaces/ruedas';
import { Piezas } from '../../interfaces/piezas';
import { PiezasService } from '../../services/piezas.service';
import { FiltrosService } from '../../services/filtros.service';

@Component({
  selector: 'app-vehiculo-detalles',
  templateUrl: './vehiculo-detalles.component.html',
  styleUrl: './vehiculo-detalles.component.css'
})

export class VehiculoDetallesComponent implements OnInit{

    idVehiculo:number;
    filtrosList: Filtros[];
    ruedasList : Ruedas[];
    piezasList : Piezas[];
    vehiculo : Vehiculo;

    constructor(private route : ActivatedRoute, private router : Router, private vs : VehiculoService,
      private sf : FiltrosService, private rs : RuedasService, private ps : PiezasService) {};

    ngOnInit(): void {
        this.idVehiculo = this.route.snapshot.params['idVehiculo'];
        this.getVehiculo(this.idVehiculo);
        this.getMantenimientoMotor(this.idVehiculo);
        this.getRuedas(this.idVehiculo);
        this.getPiezas(this.idVehiculo);
    }


    getVehiculo(idVehiculo : number) {
      this.vs.getVehiculoById(idVehiculo).subscribe(data => {
          this.vehiculo = data;
      });
  }

    getMantenimientoMotor(idVehiculo : number) {
        this.sf.getListaMantenimentos(idVehiculo).subscribe(data => {
            this.filtrosList = data;
        });
    }

    getRuedas(idVehiculo : number) {
        this.rs.getListaCambiosRuedas(idVehiculo).subscribe(data => {
            this.ruedasList = data;
        });
    }

    getPiezas(idVehiculo : number) {
        this.ps.getListaPiezas(idVehiculo).subscribe(data => {
            this.piezasList = data;
        });
    }

    saveMantenimiento(idVehiculo : number){
      this.router.navigate(['guardar-mantenimiento', idVehiculo]);
    }

    savePiezas(idVehiculo : number){
      this.router.navigate(['guardar-piezas', idVehiculo]);
    }

    saveRuedas(idVehiculo : number){
      this.router.navigate(['guardar-ruedas', idVehiculo]);
    }

    deleteRuedas(idRuedas : number){
      this.rs.deleteRuedas(idRuedas).subscribe(data => {
        this.ngOnInit();
      })
    }

    deletePiezas(idPiezas : number){
      this.ps.deletePieza(idPiezas).subscribe(data => {
        this.ngOnInit();
      })
    }

    deleteFiltros(idFiltros : number){
      this.sf.deleteFiltros(idFiltros).subscribe(data => {
        this.ngOnInit();
      })
    }

    getMantenimeintos(idVehiculo : number){
      this.router.navigate(['vehiculo-detalles', idVehiculo]);
    }

    updateMantenimiento(idFiltros : number){
      this.router.navigate(['update-mantenimiento', idFiltros]);
    }

    updatePiezas(idPiezas : number){
      this.router.navigate(['update-piezas', idPiezas]);
    }

    updateRuedas(idRuedas : number){
      this.router.navigate(['update-ruedas', idRuedas]);
    }
}
