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
  readonly diasAviso = 60;
  private readonly milisegundosPorDia = 1000 * 60 * 60 * 24;
  idVehiculo: number;
  currentTab = 'resumen';
  filtrosList: Filtros[] = [];
  ruedasList: Ruedas[] = [];
  piezasList: Piezas[] = [];
  notasList: Notas[] = [];
  segurosList: Seguro[] = [];
  itvList: ITV[] = [];
  vehiculo: Vehiculo = new Vehiculo();
  loadErrors: Partial<Record<'vehiculo' | 'mantenimientos' | 'ruedas' | 'piezas' | 'notas' | 'seguros' | 'itv', string>> = {};

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
      this.showTab(tabId || 'resumen');
    });
  }

  cambiarTab(event: any) {
    const tabId = event.target.value;
    this.showTab(tabId);
    this.router.navigate([], { fragment: tabId, replaceUrl: true });
  }

  openTab(tabId: string): void {
    this.showTab(tabId);
    this.router.navigate([], { fragment: tabId, replaceUrl: true });
  }

  getCurrentSectionLabel(): string {
    switch (this.currentTab) {
      case 'mantenimientos':
        return 'Mantenimientos';
      case 'seguros':
        return 'Seguro';
      case 'itv':
        return 'ITV';
      case 'ruedas':
        return 'Ruedas';
      case 'piezas':
        return 'Piezas';
      case 'notas':
        return 'Notas';
      default:
        return 'Resumen';
    }
  }

  handleSummaryKeydown(event: KeyboardEvent, tabId: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.openTab(tabId);
    }
  }

  private showTab(tabId: string) {
    this.currentTab = tabId;
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
    this.idVehiculo = Number(this.route.snapshot.params['idVehiculo']);
    this.getVehiculo(this.idVehiculo);
    this.getMantenimientoMotor(this.idVehiculo);
    this.getRuedas(this.idVehiculo);
    this.getPiezas(this.idVehiculo);
    this.getNotas(this.idVehiculo);
    this.getSeguros(this.idVehiculo);
    this.getItvs(this.idVehiculo);
  }

  getVehiculo(idVehiculo: number) {
    this.vs.getVehiculoById(idVehiculo).subscribe({
      next: data => {
        this.vehiculo = data;
        delete this.loadErrors.vehiculo;
      },
      error: () => {
        this.vehiculo = new Vehiculo();
        this.loadErrors.vehiculo = 'No se pudo cargar el vehículo.';
      }
    });
  }

  getMantenimientoMotor(idVehiculo: number) {
    this.sf.getListaMantenimentos(idVehiculo).subscribe({
      next: data => {
        this.filtrosList = data;
        delete this.loadErrors.mantenimientos;
      },
      error: () => {
        this.filtrosList = [];
        this.loadErrors.mantenimientos = 'No se pudieron cargar los mantenimientos.';
      }
    });
  }

  getRuedas(idVehiculo: number) {
    this.rs.getListaCambiosRuedas(idVehiculo).subscribe({
      next: data => {
        this.ruedasList = data;
        delete this.loadErrors.ruedas;
      },
      error: () => {
        this.ruedasList = [];
        this.loadErrors.ruedas = 'No se pudieron cargar los cambios de ruedas.';
      }
    });
  }

  getPiezas(idVehiculo: number) {
    this.ps.getListaPiezas(idVehiculo).subscribe({
      next: data => {
        this.piezasList = data;
        delete this.loadErrors.piezas;
      },
      error: () => {
        this.piezasList = [];
        this.loadErrors.piezas = 'No se pudieron cargar las piezas.';
      }
    });
  }

  getNotas(idVehiculo: number) {
    this.ns.getNotas(idVehiculo).subscribe({
      next: data => {
        this.notasList = data;
        delete this.loadErrors.notas;
      },
      error: () => {
        this.notasList = [];
        this.loadErrors.notas = 'No se pudieron cargar las notas.';
      }
    });
  }

  getSeguros(idVehiculo: number) {
    this.ss.getListaSeguros(idVehiculo).subscribe({
      next: data => {
        this.segurosList = data;
        delete this.loadErrors.seguros;
      },
      error: () => {
        this.segurosList = [];
        this.loadErrors.seguros = 'No se pudieron cargar los seguros.';
      }
    });
  }

  getItvs(idVehiculo: number) {
    this.itvs.getITVs(idVehiculo).subscribe({
      next: data => {
        this.itvList = data;
        delete this.loadErrors.itv;
      },
      error: () => {
        this.itvList = [];
        this.loadErrors.itv = 'No se pudieron cargar las ITV.';
      }
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

  get latestMantenimiento(): Filtros | undefined {
    return this.getLatestByDate(this.filtrosList, item => item.fechaCambio, item => item.idFiltros);
  }

  get latestRuedas(): Ruedas | undefined {
    return this.getLatestByDate(this.ruedasList, item => item.fechaCambio, item => item.idRuedas);
  }

  get latestPieza(): Piezas | undefined {
    return this.getLatestByDate(this.piezasList, item => item.fechaCambio, item => item.idPieza);
  }

  get latestNota(): Notas | undefined {
    return this.getLatestByDate(this.notasList, item => item.fechaNota, item => item.idNota);
  }

  get seguroVigente(): Seguro | undefined {
    return this.getSeguroEnVigorPrincipal();
  }

  get itvVigente(): ITV | undefined {
    return this.getItvEnVigorPrincipal();
  }

  getMantenimientoResumenEstado(): 'vencido' | 'proximo' | 'ok' | 'sin_registro' {
    if (!this.latestMantenimiento) {
      return 'sin_registro';
    }

    const fechaCambio = this.parseDateOnly(this.latestMantenimiento.fechaCambio);
    if (!fechaCambio) {
      return 'sin_registro';
    }

    const fechaVencimiento = new Date(
      fechaCambio.getFullYear() + 1,
      fechaCambio.getMonth(),
      fechaCambio.getDate()
    );

    return this.getEstadoResumenDesdeFecha(fechaVencimiento);
  }

  getSeguroResumenEstado(): 'vencido' | 'proximo' | 'ok' | 'sin_registro' {
    if (!this.seguroVigente?.fechaFin) {
      return 'sin_registro';
    }

    const fechaFin = this.parseDateOnly(this.seguroVigente.fechaFin);
    return fechaFin ? this.getEstadoResumenDesdeFecha(fechaFin) : 'sin_registro';
  }

  getItvResumenEstado(): 'vencido' | 'proximo' | 'ok' | 'sin_registro' {
    if (!this.itvVigente?.fechaProximaITV) {
      return 'sin_registro';
    }

    const fechaFin = this.parseDateOnly(this.itvVigente.fechaProximaITV);
    return fechaFin ? this.getEstadoResumenDesdeFecha(fechaFin) : 'sin_registro';
  }

  getResumenBadgeLabel(estado: 'vencido' | 'proximo' | 'ok' | 'sin_registro'): string {
    switch (estado) {
      case 'vencido':
        return 'CADUCADO';
      case 'proximo':
        return 'PROXIMO';
      case 'ok':
        return 'AL DIA';
      default:
        return 'SIN REGISTROS';
    }
  }

  saveFiltros(data?: number | Filtros) {
    if (typeof data === 'number' || typeof data === 'undefined') {
      const idVehiculo = this.getCurrentVehiculoId(data);
      if (idVehiculo) {
        this.router.navigate(['guardar-mantenimiento', 'vehiculo', idVehiculo]);
      }
      return;
    }

    this.router.navigate(['guardar-mantenimiento', 'editar', data.idFiltros]);
  }

  saveRuedas(data?: number | Ruedas) {
    if (typeof data === 'number' || typeof data === 'undefined') {
      const idVehiculo = this.getCurrentVehiculoId(data);
      if (idVehiculo) {
        this.router.navigate(['guardar-ruedas', 'vehiculo', idVehiculo]);
      }
      return;
    }

    this.router.navigate(['guardar-ruedas', 'editar', data.idRuedas]);
  }

  savePiezas(data?: number | Piezas) {
    if (typeof data === 'number' || typeof data === 'undefined') {
      const idVehiculo = this.getCurrentVehiculoId(data);
      if (idVehiculo) {
        this.router.navigate(['guardar-piezas', 'vehiculo', idVehiculo]);
      }
      return;
    }

    this.router.navigate(['guardar-piezas', 'editar', data.idPieza]);
  }

  saveNotas(data?: number | Notas) {
    if (typeof data === 'number' || typeof data === 'undefined') {
      const idVehiculo = this.getCurrentVehiculoId(data);
      if (idVehiculo) {
        this.router.navigate(['guardar-notas', 'vehiculo', idVehiculo]);
      }
      return;
    }

    this.router.navigate(['guardar-notas', 'editar', data.idNota]);
  }

  saveSeguro(data?: number | Seguro) {
    if (typeof data === 'number' || typeof data === 'undefined') {
      const idVehiculo = this.getCurrentVehiculoId(data);
      if (idVehiculo) {
        this.router.navigate(['guardar-seguro', 'vehiculo', idVehiculo]);
      }
      return;
    }

    this.router.navigate(['guardar-seguro', 'editar', data.idSeguro]);
  }

  saveITV(data?: number | ITV) {
    if (typeof data === 'number' || typeof data === 'undefined') {
      const idVehiculo = this.getCurrentVehiculoId(data);
      if (idVehiculo) {
        this.router.navigate(['guardar-itv', 'vehiculo', idVehiculo]);
      }
      return;
    }

    this.router.navigate(['guardar-itv', 'editar', data.idITV]);
  }

  private getCurrentVehiculoId(id?: number): number | null {
    const candidates = [
      id,
      this.idVehiculo,
      Number(this.route.snapshot.paramMap.get('idVehiculo')),
      this.vehiculo?.idVehiculo
    ];

    const vehiculoId = candidates.find(value => typeof value === 'number' && !Number.isNaN(value) && value > 0);
    if (vehiculoId) {
      return vehiculoId;
    }

    Swal.fire({
      title: 'No se pudo abrir el formulario',
      text: 'No se ha encontrado el vehículo asociado.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });

    return null;
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

  hasItvEnVigor(): boolean {
    return !!this.getItvEnVigorPrincipal();
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

  hasSeguroEnVigor(): boolean {
    return !!this.getSeguroEnVigorPrincipal();
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

    this.router.navigate(['guardar-itv', 'vehiculo', this.idVehiculo], {
      state: {
        prefill: {
          sitioITV: itvActual?.sitioITV || '',
          fechaITV: this.toIsoDate(fechaFinActual),
          fechaProximaITV: proximaItvIso,
          notasITV: ''
        }
      }
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

    this.router.navigate(['guardar-seguro', 'vehiculo', this.idVehiculo], {
      state: {
        prefill: {
          nombreSeguro: seguroActual?.nombreSeguro || '',
          modoSeguro: seguroActual?.modoSeguro || '',
          fechaInicio: this.toIsoDate(fechaInicio),
          fechaFin: this.toIsoDate(fechaFin),
          precio: seguroActual?.precio ?? 0,
          notas: seguroActual?.notas || ''
        }
      }
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

  private getEstadoResumenDesdeFecha(fechaObjetivo: Date): 'vencido' | 'proximo' | 'ok' {
    const hoy = this.startOfDay(new Date());
    const diasRestantes = Math.floor((fechaObjetivo.getTime() - hoy.getTime()) / this.milisegundosPorDia);

    if (diasRestantes < 0) {
      return 'vencido';
    }

    if (diasRestantes <= this.diasAviso) {
      return 'proximo';
    }

    return 'ok';
  }

  private getLatestByDate<T>(
    items: T[] | undefined,
    dateSelector: (item: T) => string | null | undefined,
    idSelector: (item: T) => number
  ): T | undefined {
    if (!items || items.length === 0) {
      return undefined;
    }

    return [...items].sort((a, b) => {
      const fechaA = this.parseDateOnly(dateSelector(a));
      const fechaB = this.parseDateOnly(dateSelector(b));

      if (fechaA && fechaB) {
        return fechaB.getTime() - fechaA.getTime();
      }

      return idSelector(b) - idSelector(a);
    })[0];
  }
}
