
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
import { Notas } from '../../interfaces/notas';
import { NotasService } from '../../services/notas.service';
import { Seguro } from '../../interfaces/seguros';
import { SegurosService } from '../../services/seguros.service';
import Swal from 'sweetalert2';
import { ITV } from '../../interfaces/itv';
import { ItvsService } from '../../services/itvs.service';


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
    notasList : Notas[];
    segurosList : Seguro[];
    itvList : ITV[];
    vehiculo : Vehiculo;

    constructor(private route : ActivatedRoute, private router : Router, private vs : VehiculoService,
      private sf : FiltrosService, private rs : RuedasService, private ps : PiezasService, private ns : NotasService,
      private ss : SegurosService, private is : ItvsService) {};

    ngOnInit(): void {
        this.idVehiculo = this.route.snapshot.params['idVehiculo'];
        this.getVehiculo(this.idVehiculo);
        this.getMantenimientoMotor(this.idVehiculo);
        this.getRuedas(this.idVehiculo);
        this.getPiezas(this.idVehiculo);
        this.getNotas(this.idVehiculo);
        this.getSeguros(this.idVehiculo);
        this.getItvs(this.idVehiculo)
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

    getNotas(idVehiculo : number) {
      this.ns.getNotas(idVehiculo).subscribe(data => {
          this.notasList = data;
      });
    }

    getSeguros(idVehiculo : number) {
      this.ss.getListaSeguros(idVehiculo).subscribe(data => {
          this.segurosList = data;
      });
    }


    getItvs(idVehiculo : number) {
      this.is.getItvs(idVehiculo).subscribe(data => {
          this.itvList = data
      });
    }

    saveFiltros(data: number | Filtros) {
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

    saveNotas(data : number | Notas){
      if (typeof data === 'number') {
        // Es una creación
        this.router.navigate(['guardar-notas', { idVehiculo: data }]);
      } else {
        // Es una actualización
        this.router.navigate(['guardar-notas', { idNota: data.idNota }]);
      }
    }

    saveSeguro(data : number | Seguro){
      if (typeof data === 'number') {
        // Es una creación
        this.router.navigate(['guardar-seguro', { idVehiculo: data }]);
      } else {
        // Es una actualización
        this.router.navigate(['guardar-seguro', { idSeguro: data.idSeguro }]);
      }
    }


    saveITV(data : number | ITV){
      if (typeof data === 'number') {
        // Es una creación
        this.router.navigate(['guardar-itv', { idVehiculo: data }]);
      } else {
        // Es una actualización
        this.router.navigate(['guardar-itv', { idITV: data.idITV }]);
      }
    }

    deleteDato(id : number, tipo : string){
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
          //Ruedas 
          if(tipo == 'rueda'){
            this.rs.deleteRuedas(id).subscribe(data => {
              this.ngOnInit();
          })
          }
          //Piezas 
          if(tipo == 'pieza'){
            this.ps.deletePieza(id).subscribe(data => {
              this.ngOnInit();
          })
          }
          //Filtros
          if(tipo == 'filtro'){
            this.sf.deleteFiltros(id).subscribe(data => {
              this.ngOnInit();
          })
          }
          //Notas
          if(tipo == 'nota'){
            this.ns.deleteNota(id).subscribe(data => {
              this.ngOnInit();
          })
          }
          //Seguros
          if(tipo == 'seguro'){
            this.ss.deleteSeguro(id).subscribe(data => {
              this.ngOnInit();
          })
          }
          //ITV
          if(tipo == 'itv'){
            this.is.deleteItv(id).subscribe(data => {
              this.ngOnInit();
          })
          }
        }
      });
    }

    cambiarTab(event: any) {
      const tabId = event.target.value;
      // Ocultar todos los tabs
      document.querySelectorAll('.tab-pane').forEach(tab => {
        tab.classList.remove('show', 'active');
      });

      // Mostrar el tab seleccionado
      const selectedTab = document.getElementById(tabId);
      if (selectedTab) {
        selectedTab.classList.add('show', 'active');
      }
    }

}
