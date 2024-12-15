
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
import Swal from 'sweetalert2';

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

    saveMantenimiento(data: number | Filtros) {
      if (typeof data === 'number') {
        // Es una creación
        this.router.navigate(['guardar-mantenimiento', { idVehiculo: data }]);
      } else {
        // Es una actualización
        this.router.navigate(['guardar-mantenimiento', { idFiltros: data.idFiltros }]);
      }
    }


    saveRuedas(data : number | Ruedas){
      if (typeof data === 'number') {
        // Es una creación
        this.router.navigate(['guardar-ruedas', { idVehiculo: data }]);
      } else {
        // Es una actualización
        this.router.navigate(['guardar-ruedas', { idRuedas: data.idRuedas }]);
      }
    }


    savePiezas(data : number | Piezas){
      if (typeof data === 'number') {
        // Es una creación
        this.router.navigate(['guardar-piezas', { idVehiculo: data }]);
      } else {
        // Es una actualización
        this.router.navigate(['guardar-piezas', { idPiezas: data.idPieza }]);
      }
    }

    deleteRuedas(idRuedas: number) {
      Swal.fire({
        title: '¿Estás seguro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.rs.deleteRuedas(idRuedas).subscribe(data => {
            this.ngOnInit();
          })
        }
      });
    }


    deletePiezas(idPiezas : number){
      Swal.fire({
        title: '¿Estás seguro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.ps.deletePieza(idPiezas).subscribe(data => {
            this.ngOnInit();
          })
        }
      });
    }

    deleteFiltros(idFiltros : number){
      Swal.fire({
        title: '¿Estás seguro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.sf.deleteFiltros(idFiltros).subscribe(data => {
            this.ngOnInit();
          })
        }
      });
    }

    getMantenimeintos(idVehiculo : number){
      this.router.navigate(['vehiculo-detalles', idVehiculo]);
    }
}
