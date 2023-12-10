
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vehiculo } from '../vehiculo';
import { VehiculoService } from '../vehiculo.service';
import { FiltrosService } from '../filtros.service';
import { Filtros } from '../filtros';
import { RuedasService } from '../ruedas.service';
import { Ruedas } from '../ruedas';
import { Piezas } from '../piezas';
import { PiezasService } from '../piezas.service';

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

    constructor(private route : ActivatedRoute, private vs : VehiculoService,
      private sf : FiltrosService, private rs : RuedasService, private ps : PiezasService) {};

    ngOnInit(): void {
        this.idVehiculo = this.route.snapshot.params['idVehiculo'];
        this.getMantenimientoMotor(this.idVehiculo);
        this.getRuedas(this.idVehiculo);
        this.getPiezas(this.idVehiculo);
        this.getVehiculo(this.idVehiculo);
    }

    getMantenimientoMotor(idVehiculo : number) {
        this.sf.getListaMantenimentos(idVehiculo).subscribe(data => {
            this.filtrosList = data;
            console.log(data);
        });
    }

    getRuedas(idVehiculo : number) {
        this.rs.getListaCambiosRuedas(idVehiculo).subscribe(data => {
            this.ruedasList = data;
            console.log(data);
        });
    }

    getPiezas(idVehiculo : number) {
        this.ps.getListaPiezas(idVehiculo).subscribe(data => {
            this.piezasList = data;
            console.log(data);
        });
    }

    getVehiculo(idVehiculo : number) {
        this.vs.getVehiculoById(idVehiculo).subscribe(data => {
            this.vehiculo = data;
            console.log(data);
        });
    }

}
