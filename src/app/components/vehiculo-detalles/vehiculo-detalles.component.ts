
import { Component, OnInit, AfterViewInit } from '@angular/core';
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
import { ITVService } from '../../services/itvs.service';
import { SwalFlowService } from '../../services/swal-flow.service';
import { EMPTY } from 'rxjs';


declare const bootstrap: any;

@Component({
  selector: 'app-vehiculo-detalles',
  templateUrl: './vehiculo-detalles.component.html',
  styleUrl: './vehiculo-detalles.component.css'
})

export class VehiculoDetallesComponent implements OnInit, AfterViewInit {

  idVehiculo: number;
  filtrosList: Filtros[];
  ruedasList: Ruedas[];
  piezasList: Piezas[];
  notasList: Notas[];
  segurosList: Seguro[];
  itvList: ITV[];
  vehiculo: Vehiculo;

  constructor(private route: ActivatedRoute, private router: Router, private vs: VehiculoService,
    private sf: FiltrosService,
    private rs: RuedasService,
    private ps: PiezasService,
    private ns: NotasService,
    private ss: SegurosService,
    private itvs: ITVService,
    private swalFlow: SwalFlowService) { };



  ngAfterViewInit(): void {
    this.route.fragment.subscribe(tabId => {
      if (tabId) this.showTab(tabId);
    });
  }

  cambiarTab(event: any) {
    const tabId = event.target.value;
    this.showTab(tabId);
    this.router.navigate([], { fragment: tabId, replaceUrl: true });
  }

  private showTab(tabId: string) {
    // 1) activar tab bootstrap (botón)
    const btn = document.getElementById(`${tabId}-tab`);
    if (btn && typeof bootstrap !== 'undefined') {
      bootstrap.Tab.getOrCreateInstance(btn).show();
    } else {
      // fallback manual si no hay bootstrap.js
      document.querySelectorAll('.tab-pane').forEach(t => t.classList.remove('show', 'active'));
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

      document.getElementById(tabId)?.classList.add('show', 'active');
      btn?.classList.add('active');
    }

    // 2) sincronizar el select (móvil)
    const sel = document.querySelector('.mobile-tabs') as HTMLSelectElement | null;
    if (sel) sel.value = tabId;
  }

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

  getVehiculo(idVehiculo: number) {
    this.vs.getVehiculoById(idVehiculo).subscribe(data => {
      this.vehiculo = data;
    });
  }

  getMantenimientoMotor(idVehiculo: number) {
    this.sf.getListaMantenimentos(idVehiculo).subscribe(data => {
      this.filtrosList = data;
    });
  }

  getRuedas(idVehiculo: number) {
    this.rs.getListaCambiosRuedas(idVehiculo).subscribe(data => {
      this.ruedasList = data;
    });
  }

  getPiezas(idVehiculo: number) {
    this.ps.getListaPiezas(idVehiculo).subscribe(data => {
      this.piezasList = data;
    });
  }

  getNotas(idVehiculo: number) {
    this.ns.getNotas(idVehiculo).subscribe(data => {
      this.notasList = data;
    });
  }

  getSeguros(idVehiculo: number) {
    this.ss.getListaSeguros(idVehiculo).subscribe(data => {
      this.segurosList = data;
    });
  }


  getItvs(idVehiculo: number) {
    this.itvs.getITVs(idVehiculo).subscribe(data => {
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

  saveRuedas(data: number | Ruedas) {
    if (typeof data === 'number') {
      // Es una creación
      this.router.navigate(['guardar-ruedas', { idVehiculo: data }]);
    } else {
      // Es una actualización
      this.router.navigate(['guardar-ruedas', { idRuedas: data.idRuedas }]);
    }
  }


  savePiezas(data: number | Piezas) {
    if (typeof data === 'number') {
      // Es una creación
      this.router.navigate(['guardar-piezas', { idVehiculo: data }]);
    } else {
      // Es una actualización
      this.router.navigate(['guardar-piezas', { idPiezas: data.idPieza }]);
    }
  }

  saveNotas(data: number | Notas) {
    if (typeof data === 'number') {
      // Es una creación
      this.router.navigate(['guardar-notas', { idVehiculo: data }]);
    } else {
      // Es una actualización
      this.router.navigate(['guardar-notas', { idNota: data.idNota }]);
    }
  }

  saveSeguro(data: number | Seguro) {
    if (typeof data === 'number') {
      // Es una creación
      this.router.navigate(['guardar-seguro', { idVehiculo: data }]);
    } else {
      // Es una actualización
      this.router.navigate(['guardar-seguro', { idSeguro: data.idSeguro }]);
    }
  }


  saveITV(data: number | ITV) {
    if (typeof data === 'number') {
      // Es una creación
      this.router.navigate(['guardar-itv', { idVehiculo: data }]);
    } else {
      // Es una actualización
      this.router.navigate(['guardar-itv', { idITV: data.idITV }]);
    }
  }

  //Función genérica para eliminar datos de cualquier tipo
  deleteDato(id: number, tipo: string) {
    const requestFactory = () => {
      switch (tipo) {
        case 'rueda': return this.rs.deleteRuedas(id);
        case 'pieza': return this.ps.deletePieza(id);
        case 'filtro': return this.sf.deleteFiltros(id);
        case 'nota': return this.ns.deleteNota(id);
        case 'seguro': return this.ss.deleteSeguro(id);
        case 'itv': return this.itvs.deleteITV(id);
        default: return EMPTY;
      }
    };

    this.swalFlow
      .deleteConfirm(requestFactory, () => this.ngOnInit())
      .subscribe();
  }

  // Mensaje informativo genérico para los iconos de los filtros
  info(texto: string) {
    Swal.fire({
      text: texto,
      width: '65%',
      showConfirmButton: false
    });
  }

}
