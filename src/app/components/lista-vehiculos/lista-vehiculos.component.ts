import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../interfaces/vehiculo';
import { VehiculoService } from '../../services/vehiculo.service';
import { Router } from '@angular/router';
import { SwalFlowService } from '../../services/swal-flow.service';
import { SegurosService } from '../../services/seguros.service';
import { ITVService } from '../../services/itvs.service';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Seguro } from '../../interfaces/seguros';
import { ITV } from '../../interfaces/itv';
import { Filtros } from '../../interfaces/filtros';
import { FiltrosService } from '../../services/filtros.service';

interface AlertaFechaFin {
  tipo: 'Seguro' | 'ITV' | 'Mantenimiento';
  fecha: Date | null;
  diasRestantes: number;
  estado: 'vencido' | 'proximo' | 'ok' | 'sin_registro';
}

@Component({
  selector: 'app-lista-vehiculos',
  templateUrl: './lista-vehiculos.component.html',
  styleUrl: './lista-vehiculos.component.css'
})


export class ListaVehiculosComponent implements OnInit {

  vehiculos: Vehiculo[] = [];
  loading: boolean = false;
  readonly loadingCards = [1, 2, 3];
  imgError: Record<number, boolean> = {};
  pressedId: number | null = null;
  pressedBtn: string | null = null;
  alertasPorVehiculo: Record<number, AlertaFechaFin[]> = {};
  readonly diasAviso = 60;
  private readonly milisegundosPorDia = 1000 * 60 * 60 * 24;
  
  constructor(
    private vs: VehiculoService,
    private router: Router,
    private swalFlow: SwalFlowService,
    private segurosService: SegurosService,
    private itvService: ITVService,
    private filtrosService: FiltrosService
  ) { };

  ngOnInit(): void {
    this.getVehiculos();
  }

  private getVehiculos() {
    this.loading = true;
    this.vs.getListaVehiculos().subscribe({
      next: datos => {
        const vehiculos = datos ?? [];
        this.cargarAlertasFechasFin(vehiculos);
      },
      error: () => {
        this.loading = false;
        this.vehiculos = [];
        this.alertasPorVehiculo = {};
      }
    });
  }

  private cargarAlertasFechasFin(vehiculos: Vehiculo[]) {
    if (!vehiculos.length) {
      this.loading = false;
      this.vehiculos = [];
      this.alertasPorVehiculo = {};
      return;
    }

    const peticiones = vehiculos.map(vehiculo =>
      forkJoin({
        seguros: this.segurosService.getListaSeguros(vehiculo.idVehiculo).pipe(
          catchError(() => of([] as Seguro[]))
        ),
        itvs: this.itvService.getITVs(vehiculo.idVehiculo).pipe(
          catchError(() => of([] as ITV[]))
        ),
        mantenimientos: this.filtrosService.getListaMantenimentos(vehiculo.idVehiculo).pipe(
          catchError(() => of([] as Filtros[]))
        )
      }).pipe(
        map(({ seguros, itvs, mantenimientos }) => ({
          idVehiculo: vehiculo.idVehiculo,
          alertas: this.calcularAlertasVehiculo(seguros, itvs, mantenimientos)
        }))
      )
    );

    forkJoin(peticiones).subscribe({
      next: resultados => {
        const mapaAlertas: Record<number, AlertaFechaFin[]> = {};
        resultados.forEach(resultado => {
          mapaAlertas[resultado.idVehiculo] = resultado.alertas;
        });

        this.vehiculos = vehiculos;
        this.alertasPorVehiculo = mapaAlertas;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  private calcularAlertasVehiculo(seguros: Seguro[], itvs: ITV[], mantenimientos: Filtros[]): AlertaFechaFin[] {
    const alertas: AlertaFechaFin[] = [
      this.crearAlertaSinRegistro('Mantenimiento'),
      this.crearAlertaSinRegistro('Seguro'),
      this.crearAlertaSinRegistro('ITV')
    ];

    this.actualizarAlertaDesdeUltimoInsertado(
      alertas,
      'Seguro',
      seguros,
      seguro => seguro.idSeguro,
      seguro => seguro.fechaFin
    );

    this.actualizarAlertaDesdeUltimoInsertado(
      alertas,
      'ITV',
      itvs,
      itv => itv.idITV,
      itv => itv.fechaProximaITV
    );

    this.agregarAlertaMantenimiento(alertas, mantenimientos);

    return alertas;
  }

  private agregarAlertaMantenimiento(alertas: AlertaFechaFin[], mantenimientos: Filtros[]) {
    const ultimoMantenimiento = this.obtenerUltimoInsertado(mantenimientos, m => m.idFiltros);
    if (!ultimoMantenimiento) {
      return;
    }

    const fechaUltimoMantenimiento = this.parsearFecha(ultimoMantenimiento.fechaCambio);
    if (!fechaUltimoMantenimiento) {
      return;
    }

    const fechaVencimiento = new Date(
      fechaUltimoMantenimiento.getFullYear() + 1,
      fechaUltimoMantenimiento.getMonth(),
      fechaUltimoMantenimiento.getDate()
    );

    this.actualizarAlertaTipo(alertas, 'Mantenimiento', fechaVencimiento);
  }

  private actualizarAlertaDesdeUltimoInsertado<T>(
    alertas: AlertaFechaFin[],
    tipo: 'Seguro' | 'ITV',
    items: T[],
    getId: (item: T) => number,
    getFecha: (item: T) => string
  ) {
    const ultimoInsertado = this.obtenerUltimoInsertado(items, getId);
    if (!ultimoInsertado) {
      return;
    }

    const fecha = this.parsearFecha(getFecha(ultimoInsertado));
    if (!fecha) {
      return;
    }

    this.actualizarAlertaTipo(alertas, tipo, fecha);
  }

  private obtenerUltimoInsertado<T>(items: T[], getId: (item: T) => number): T | null {
    if (!items.length) {
      return null;
    }

    return items.reduce((ultimo, actual) => (getId(actual) > getId(ultimo) ? actual : ultimo));
  }

  private actualizarAlertaTipo(
    alertas: AlertaFechaFin[],
    tipo: 'Seguro' | 'ITV' | 'Mantenimiento',
    fechaObjetivo: Date
  ) {
    const indice = alertas.findIndex(alerta => alerta.tipo === tipo);
    if (indice < 0) {
      return;
    }

    const hoy = new Date();
    const hoyNormalizado = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    const diasRestantes = Math.floor((fechaObjetivo.getTime() - hoyNormalizado.getTime()) / this.milisegundosPorDia);

    alertas[indice] = {
      tipo,
      fecha: fechaObjetivo,
      diasRestantes,
      estado: this.calcularEstadoAlerta(diasRestantes)
    };
  }

  private parsearFecha(fecha: string): Date | null {
    if (!fecha) {
      return null;
    }

    const fechaCorta = fecha.substring(0, 10);
    const partes = fechaCorta.split('-').map(valor => Number(valor));

    if (partes.length === 3 && partes.every(valor => !Number.isNaN(valor))) {
      const [anio, mes, dia] = partes;
      return new Date(anio, mes - 1, dia);
    }

    const fechaParseada = new Date(fecha);
    if (Number.isNaN(fechaParseada.getTime())) {
      return null;
    }

    return new Date(fechaParseada.getFullYear(), fechaParseada.getMonth(), fechaParseada.getDate());
  }

  getClaseAlerta(alerta: AlertaFechaFin): string {
    if (alerta.estado === 'sin_registro') {
      return 'alerta-sin-registro';
    }

    if (alerta.estado === 'vencido') {
      return 'alerta-vencida';
    }

    if (alerta.estado === 'proximo') {
      return 'alerta-proxima';
    }

    return 'alerta-ok';
  }

  getMensajeAlerta(alerta: AlertaFechaFin): string {
    if (alerta.estado === 'sin_registro') {
      return `${alerta.tipo}: Sin registro`;
    }

    if (alerta.estado === 'vencido') {
      const dias = Math.abs(alerta.diasRestantes);
      return `${alerta.tipo} vencido hace ${dias} dia${dias === 1 ? '' : 's'}`;
    }

    if (alerta.diasRestantes === 0) {
      return `${alerta.tipo} vence hoy`;
    }

    return `${alerta.tipo} vence en ${alerta.diasRestantes} dia${alerta.diasRestantes === 1 ? '' : 's'}`;
  }

  private calcularEstadoAlerta(diasRestantes: number): 'vencido' | 'proximo' | 'ok' {
    if (diasRestantes < 0) {
      return 'vencido';
    }

    if (diasRestantes <= this.diasAviso) {
      return 'proximo';
    }

    return 'ok';
  }

  private crearAlertaSinRegistro(tipo: 'Seguro' | 'ITV' | 'Mantenimiento'): AlertaFechaFin {
    return {
      tipo,
      fecha: null,
      diasRestantes: 0,
      estado: 'sin_registro'
    };
  }

  deleteVehiculo(id: number) {
    this.swalFlow
      .deleteConfirm(() => this.vs.deleteVehiculo(id), () => this.getVehiculos())
      .subscribe();
  }

  guardarVehiculo(idVehiculo: number) {
    this.router.navigate(['guardar-vehiculo', idVehiculo]);
  }

  detallesVehiculo(idVehiculo: number) {
    this.router.navigate(['vehiculo-detalles', idVehiculo]);
  }
}
