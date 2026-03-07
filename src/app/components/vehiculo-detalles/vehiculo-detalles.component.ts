import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EMPTY } from 'rxjs';
import { Vehiculo } from '../../interfaces/vehiculo';
import { Filtros } from '../../interfaces/filtros';
import { Ruedas } from '../../interfaces/ruedas';
import { Piezas } from '../../interfaces/piezas';
import { Notas } from '../../interfaces/notas';
import { Seguro } from '../../interfaces/seguros';
import { ITV } from '../../interfaces/itv';
import { VehiculoService } from '../../services/vehiculo.service';
import { FiltrosService } from '../../services/filtros.service';
import { RuedasService } from '../../services/ruedas.service';
import { PiezasService } from '../../services/piezas.service';
import { NotasService } from '../../services/notas.service';
import { SegurosService } from '../../services/seguros.service';
import { ITVService } from '../../services/itvs.service';
import { SwalFlowService } from '../../services/swal-flow.service';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vs: VehiculoService,
    private sf: FiltrosService,
    private rs: RuedasService,
    private ps: PiezasService,
    private ns: NotasService,
    private ss: SegurosService,
    private itvs: ITVService,
    private swalFlow: SwalFlowService
  ) {}

  ngAfterViewInit(): void {
    this.route.fragment.subscribe(tabId => {
      if (tabId) {
        this.showTab(tabId);
      }
    });
  }

  cambiarTab(event: any) {
    const tabId = event.target.value;
    this.showTab(tabId);
    this.router.navigate([], { fragment: tabId, replaceUrl: true });
  }

  private showTab(tabId: string) {
    const btn = document.getElementById(`${tabId}-tab`);
    if (btn && typeof bootstrap !== 'undefined') {
      bootstrap.Tab.getOrCreateInstance(btn).show();
    } else {
      document.querySelectorAll('.tab-pane').forEach(t => t.classList.remove('show', 'active'));
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      document.getElementById(tabId)?.classList.add('show', 'active');
      btn?.classList.add('active');
    }

    const sel = document.querySelector('.mobile-tabs') as HTMLSelectElement | null;
    if (sel) {
      sel.value = tabId;
    }
  }

  ngOnInit(): void {
    this.idVehiculo = this.route.snapshot.params['idVehiculo'];
    this.getVehiculo(this.idVehiculo);
    this.getMantenimientoMotor(this.idVehiculo);
    this.getRuedas(this.idVehiculo);
    this.getPiezas(this.idVehiculo);
    this.getNotas(this.idVehiculo);
    this.getSeguros(this.idVehiculo);
    this.getItvs(this.idVehiculo);
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
      this.itvList = data;
    });
  }

  get orderedSegurosList(): Seguro[] {
    if (!this.segurosList || this.segurosList.length === 0) {
      return [];
    }

    const vigente = this.getSeguroEnVigorPrincipal();
    return [...this.segurosList].sort((a, b) => {
      if (vigente) {
        if (a.idSeguro === vigente.idSeguro) {
          return -1;
        }
        if (b.idSeguro === vigente.idSeguro) {
          return 1;
        }
      }

      const fechaA = this.parseDateOnly(a.fechaFin);
      const fechaB = this.parseDateOnly(b.fechaFin);
      if (!fechaA || !fechaB) {
        return 0;
      }
      return fechaB.getTime() - fechaA.getTime();
    });
  }

  get orderedItvList(): ITV[] {
    if (!this.itvList || this.itvList.length === 0) {
      return [];
    }

    const vigente = this.getItvEnVigorPrincipal();
    return [...this.itvList].sort((a, b) => {
      if (vigente) {
        if (a.idITV === vigente.idITV) {
          return -1;
        }
        if (b.idITV === vigente.idITV) {
          return 1;
        }
      }

      const fechaA = this.parseDateOnly(a.fechaProximaITV);
      const fechaB = this.parseDateOnly(b.fechaProximaITV);
      if (!fechaA || !fechaB) {
        return 0;
      }
      return fechaB.getTime() - fechaA.getTime();
    });
  }

  saveFiltros(data: number | Filtros) {
    if (typeof data === 'number') {
      this.router.navigate(['guardar-mantenimiento', { idVehiculo: data }]);
    } else {
      this.router.navigate(['guardar-mantenimiento', { idFiltros: data.idFiltros }]);
    }
  }

  saveRuedas(data: number | Ruedas) {
    if (typeof data === 'number') {
      this.router.navigate(['guardar-ruedas', { idVehiculo: data }]);
    } else {
      this.router.navigate(['guardar-ruedas', { idRuedas: data.idRuedas }]);
    }
  }

  savePiezas(data: number | Piezas) {
    if (typeof data === 'number') {
      this.router.navigate(['guardar-piezas', { idVehiculo: data }]);
    } else {
      this.router.navigate(['guardar-piezas', { idPiezas: data.idPieza }]);
    }
  }

  saveNotas(data: number | Notas) {
    if (typeof data === 'number') {
      this.router.navigate(['guardar-notas', { idVehiculo: data }]);
    } else {
      this.router.navigate(['guardar-notas', { idNota: data.idNota }]);
    }
  }

  saveSeguro(data: number | Seguro) {
    if (typeof data === 'number') {
      this.router.navigate(['guardar-seguro', { idVehiculo: data }]);
    } else {
      this.router.navigate(['guardar-seguro', { idSeguro: data.idSeguro }]);
    }
  }

  saveITV(data: number | ITV) {
    if (typeof data === 'number') {
      this.router.navigate(['guardar-itv', { idVehiculo: data }]);
    } else {
      this.router.navigate(['guardar-itv', { idITV: data.idITV }]);
    }
  }

  deleteDato(id: number, tipo: string) {
    const requestFactory = () => {
      switch (tipo) {
        case 'rueda':
          return this.rs.deleteRuedas(id);
        case 'pieza':
          return this.ps.deletePieza(id);
        case 'filtro':
          return this.sf.deleteFiltros(id);
        case 'nota':
          return this.ns.deleteNota(id);
        case 'seguro':
          return this.ss.deleteSeguro(id);
        case 'itv':
          return this.itvs.deleteITV(id);
        default:
          return EMPTY;
      }
    };

    this.swalFlow.deleteConfirm(requestFactory, () => this.ngOnInit()).subscribe();
  }

  isItvEnVigor(itv: ITV): boolean {
    const vigente = this.getItvEnVigorPrincipal();
    return !!vigente && vigente.idITV === itv.idITV;
  }

  isItvPasada(itv: ITV): boolean {
    return !this.isItvEnVigor(itv);
  }

  isItvEnVigorPrincipal(itv: ITV): boolean {
    return this.isItvEnVigor(itv);
  }

  isSeguroEnVigor(seguro: Seguro): boolean {
    const vigente = this.getSeguroEnVigorPrincipal();
    return !!vigente && vigente.idSeguro === seguro.idSeguro;
  }

  isSeguroPasado(seguro: Seguro): boolean {
    return !this.isSeguroEnVigor(seguro);
  }

  isSeguroEnVigorPrincipal(seguro: Seguro): boolean {
    return this.isSeguroEnVigor(seguro);
  }

  marcarItvPasada(itvActual: ITV): void {
    const tipoVehiculo = this.inferirTipoVehiculo();
    if (!tipoVehiculo) {
      Swal.fire({
        title: 'Falta el tipo de vehiculo',
        text: 'Configura el tipo como COCHE o MOTO para calcular la proxima ITV.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    const fechaFinActual = this.parseDateOnly(itvActual?.fechaProximaITV);
    if (!fechaFinActual) {
      Swal.fire({
        title: 'ITV invalida',
        text: 'La ITV actual no tiene una fecha de fin valida.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    const fechaCompra = this.parseDateOnly(this.vehiculo?.fechaCompra);
    const proximaItv = this.calcularFechaProximaITV(fechaFinActual, fechaCompra, tipoVehiculo);
    const proximaItvIso = this.toIsoDate(proximaItv);

    Swal.fire({
      title: 'Pasar ITV',
      width: 760,
      customClass: {
        popup: 'itv-swal-popup',
        htmlContainer: 'itv-swal-html'
      },
      html: `
        <div style="text-align:left; margin: 0 0 6px 4px; font-weight:600;">Lugar de la siguiente ITV</div>
        <input id="swal-itv-lugar" class="swal2-input" placeholder="Ej: ITV Miere" value="${itvActual?.sitioITV ?? ''}">
        <div style="text-align:left; margin: 8px 0 6px 4px; font-weight:600;">Notas para la siguiente ITV</div>
        <textarea id="swal-itv-notas" class="swal2-textarea" style="width:100%; min-height:160px; box-sizing:border-box;" placeholder="Ej: Revisar luces y desgaste neumaticos antes de llevarlo"></textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const lugarEl = document.getElementById('swal-itv-lugar') as HTMLInputElement | null;
        const notasEl = document.getElementById('swal-itv-notas') as HTMLTextAreaElement | null;
        const sitioITV = (lugarEl?.value ?? '').trim();
        const notasITV = (notasEl?.value ?? '').trim();
        if (!sitioITV) {
          Swal.showValidationMessage('Indica el lugar de la siguiente ITV.');
          return null;
        }
        return {
          sitioITV,
          notasITV
        };
      }
    }).then(result => {
      if (!result.isConfirmed || !result.value) {
        return;
      }

      const nuevaItv: ITV = {
        idITV: 0,
        sitioITV: result.value.sitioITV || itvActual?.sitioITV || '',
        fechaITV: this.toIsoDate(fechaFinActual),
        fechaProximaITV: proximaItvIso,
        notasITV: result.value.notasITV || '',
        vehiculo: this.vehiculo
      };

      this.swalFlow
        .saveWith(
          this.itvs.saveITV(nuevaItv),
          {
            successTitle: 'Siguiente ITV creada',
            successText: ''
          },
          () => {}
        )
        .subscribe((saved: any) => {
          const savedId = Number(saved?.idITV);
          const savedProxima = this.normalizeIsoDate(saved?.fechaProximaITV);

          if (savedId && savedProxima && savedProxima !== proximaItvIso) {
            const itvCorregida: ITV = {
              ...saved,
              fechaProximaITV: proximaItvIso,
              vehiculo: this.vehiculo
            };

            this.itvs.updateITV(savedId, itvCorregida).subscribe({
              next: () => this.getItvs(this.idVehiculo),
              error: () => this.getItvs(this.idVehiculo)
            });
            return;
          }

          this.getItvs(this.idVehiculo);
        });
    });
  }

  renovarSeguro(seguroActual: Seguro): void {
    const fechaInicio = this.parseDateOnly(seguroActual?.fechaFin);
    if (!fechaInicio) {
      Swal.fire({
        title: 'Seguro invalido',
        text: 'El seguro actual no tiene una fecha de fin valida.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    const fechaFin = this.addYears(fechaInicio, 1);

    Swal.fire({
      title: 'Renovar seguro',
      width: 760,
      customClass: {
        popup: 'itv-swal-popup',
        htmlContainer: 'itv-swal-html'
      },
      html: `
        <div style="text-align:left; margin: 0 0 6px 4px; font-weight:600;">Nombre</div>
        <input id="swal-seguro-nombre" class="swal2-input" placeholder="Ej: Mapfre" value="${seguroActual?.nombreSeguro ?? ''}">
        <div style="text-align:left; margin: 8px 0 6px 4px; font-weight:600;">Modalidad</div>
        <input id="swal-seguro-modo" class="swal2-input" placeholder="Ej: Todo riesgo" value="${seguroActual?.modoSeguro ?? ''}">
        <div style="text-align:left; margin: 8px 0 6px 4px; font-weight:600;">Fecha inicio</div>
        <input id="swal-seguro-inicio" class="swal2-input" type="date" value="${this.toIsoDate(fechaInicio)}">
        <div style="text-align:left; margin: 8px 0 6px 4px; font-weight:600;">Fecha fin</div>
        <input id="swal-seguro-fin" class="swal2-input" type="date" value="${this.toIsoDate(fechaFin)}">
        <div style="text-align:left; margin: 8px 0 6px 4px; font-weight:600;">Precio</div>
        <input id="swal-seguro-precio" class="swal2-input" type="number" min="0" step="0.01" placeholder="Ej: 420" value="${seguroActual?.precio ?? ''}">
        <div style="text-align:left; margin: 8px 0 6px 4px; font-weight:600;">Notas</div>
        <textarea id="swal-seguro-notas" class="swal2-textarea" style="width:100%; min-height:140px; box-sizing:border-box;" placeholder="Notas del nuevo seguro">${seguroActual?.notas ?? ''}</textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const nombreEl = document.getElementById('swal-seguro-nombre') as HTMLInputElement | null;
        const modoEl = document.getElementById('swal-seguro-modo') as HTMLInputElement | null;
        const inicioEl = document.getElementById('swal-seguro-inicio') as HTMLInputElement | null;
        const finEl = document.getElementById('swal-seguro-fin') as HTMLInputElement | null;
        const precioEl = document.getElementById('swal-seguro-precio') as HTMLInputElement | null;
        const notasEl = document.getElementById('swal-seguro-notas') as HTMLTextAreaElement | null;

        const nombreSeguro = (nombreEl?.value ?? '').trim();
        const modoSeguro = (modoEl?.value ?? '').trim();
        const fechaInicioValue = (inicioEl?.value ?? '').trim();
        const fechaFinValue = (finEl?.value ?? '').trim();
        const precioValue = (precioEl?.value ?? '').trim();
        const notas = (notasEl?.value ?? '').trim();

        if (!nombreSeguro || !modoSeguro || !fechaInicioValue || !fechaFinValue) {
          Swal.showValidationMessage('Completa nombre, modalidad y fechas del seguro.');
          return null;
        }

        return {
          nombreSeguro,
          modoSeguro,
          fechaInicio: fechaInicioValue,
          fechaFin: fechaFinValue,
          precio: precioValue ? Number(precioValue) : 0,
          notas
        };
      }
    }).then(result => {
      if (!result.isConfirmed || !result.value) {
        return;
      }

      const nuevoSeguro: Seguro = {
        idSeguro: 0,
        nombreSeguro: result.value.nombreSeguro,
        modoSeguro: result.value.modoSeguro,
        fechaInicio: result.value.fechaInicio,
        fechaFin: result.value.fechaFin,
        precio: result.value.precio,
        notas: result.value.notas,
        vehiculo: this.vehiculo
      };

      this.swalFlow
        .saveWith(
          this.ss.saveSeguro(nuevoSeguro),
          {
            successTitle: 'Seguro renovado',
            successText: ''
          },
          () => this.getSeguros(this.idVehiculo)
        )
        .subscribe();
    });
  }

  private getItvEnVigorPrincipal(): ITV | undefined {
    if (!this.itvList || this.itvList.length === 0) {
      return undefined;
    }

    return [...this.itvList].sort((a, b) => {
      const inicioA = this.parseDateOnly(a.fechaITV);
      const inicioB = this.parseDateOnly(b.fechaITV);
      if (inicioA && inicioB) {
        return inicioB.getTime() - inicioA.getTime();
      }

      const finA = this.parseDateOnly(a.fechaProximaITV);
      const finB = this.parseDateOnly(b.fechaProximaITV);
      if (finA && finB) {
        return finB.getTime() - finA.getTime();
      }

      return 0;
    })[0];
  }

  private getSeguroEnVigorPrincipal(): Seguro | undefined {
    if (!this.segurosList || this.segurosList.length === 0) {
      return undefined;
    }

    return [...this.segurosList].sort((a, b) => {
      const inicioA = this.parseDateOnly(a.fechaInicio);
      const inicioB = this.parseDateOnly(b.fechaInicio);
      if (inicioA && inicioB) {
        return inicioB.getTime() - inicioA.getTime();
      }

      const finA = this.parseDateOnly(a.fechaFin);
      const finB = this.parseDateOnly(b.fechaFin);
      if (finA && finB) {
        return finB.getTime() - finA.getTime();
      }

      return 0;
    })[0];
  }

  private inferirTipoVehiculo(): 'COCHE' | 'MOTO' | null {
    const tipo = (this.vehiculo?.tipoVehiculo ?? '').toUpperCase().trim();
    if (tipo === 'MOTO' || tipo === 'COCHE') {
      return tipo;
    }
    return null;
  }

  private calcularFechaProximaITV(
    fechaItvActual: Date,
    fechaCompra: Date | null,
    tipoVehiculo: string
  ): Date {
    if (fechaCompra && this.fullYearsBetween(fechaCompra, this.startOfDay(new Date())) < 4) {
      return this.addYears(fechaCompra, 4);
    }

    const intervaloAnos = this.getIntervaloAnos(tipoVehiculo as 'COCHE' | 'MOTO', fechaCompra);
    return this.addYears(fechaItvActual, intervaloAnos);
  }

  private getIntervaloAnos(tipoVehiculo: 'COCHE' | 'MOTO', fechaCompra: Date | null): number {
    if (tipoVehiculo === 'MOTO') {
      return 2;
    }

    if (!fechaCompra) {
      return 1;
    }

    const hoy = this.startOfDay(new Date());
    const edadActual = this.fullYearsBetween(fechaCompra, hoy);
    return edadActual >= 10 ? 1 : 2;
  }

  private fullYearsBetween(inicio: Date, fin: Date): number {
    let years = fin.getFullYear() - inicio.getFullYear();
    const monthDiff = fin.getMonth() - inicio.getMonth();
    const dayDiff = fin.getDate() - inicio.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      years--;
    }
    return years;
  }

  private addYears(fecha: Date, years: number): Date {
    const resultado = new Date(fecha);
    resultado.setFullYear(resultado.getFullYear() + years);
    return this.startOfDay(resultado);
  }

  private parseDateOnly(value: string | null | undefined): Date | null {
    if (!value) {
      return null;
    }

    const dateOnly = value.slice(0, 10);
    const parts = dateOnly.split('-').map(Number);
    if (parts.length === 3) {
      const [year, month, day] = parts;
      if (year && month && day) {
        return new Date(year, month - 1, day);
      }
    }

    const fallback = new Date(value);
    if (isNaN(fallback.getTime())) {
      return null;
    }
    return this.startOfDay(fallback);
  }

  private toIsoDate(value: Date): string {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private normalizeIsoDate(value: string | null | undefined): string | null {
    const parsed = this.parseDateOnly(value);
    return parsed ? this.toIsoDate(parsed) : null;
  }

  private startOfDay(value: Date): Date {
    return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  }
}
