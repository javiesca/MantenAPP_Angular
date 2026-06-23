import { Injectable } from '@angular/core';
import { ITV } from '../interfaces/itv';
import { Seguro } from '../interfaces/seguros';
import { Vehiculo } from '../interfaces/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoRecordsService {

  buildNewItvPrefill(vehiculo: Vehiculo | undefined): Partial<ITV> | null {
    const tipoVehiculo = this.inferirTipoVehiculo(vehiculo);
    if (!tipoVehiculo) {
      return null;
    }

    const fechaItv = this.startOfDay(new Date());
    const fechaCompra = this.parseDateOnly(vehiculo?.fechaCompra);
    const fechaProximaItv = this.calcularFechaProximaITV(fechaItv, fechaCompra, tipoVehiculo);

    return {
      sitioITV: '',
      fechaITV: this.toIsoDate(fechaItv),
      fechaProximaITV: this.toIsoDate(fechaProximaItv),
      notasITV: ''
    };
  }

  buildNextItvPrefill(itvActual: ITV, vehiculo: Vehiculo | undefined): Partial<ITV> | null {
    const tipoVehiculo = this.inferirTipoVehiculo(vehiculo);
    const fechaFinActual = this.parseDateOnly(itvActual?.fechaProximaITV);

    if (!tipoVehiculo || !fechaFinActual) {
      return null;
    }

    const fechaCompra = this.parseDateOnly(vehiculo?.fechaCompra);
    const proximaItv = this.calcularFechaProximaITV(fechaFinActual, fechaCompra, tipoVehiculo);

    return {
      sitioITV: itvActual?.sitioITV || '',
      fechaITV: this.toIsoDate(fechaFinActual),
      fechaProximaITV: this.toIsoDate(proximaItv),
      notasITV: itvActual?.notasITV || ''
    };
  }

  buildRenewedSeguroPrefill(seguroActual: Seguro): Partial<Seguro> | null {
    const fechaInicio = this.parseDateOnly(seguroActual?.fechaFin);
    if (!fechaInicio) {
      return null;
    }

    const fechaFin = this.addYears(fechaInicio, 1);

    return {
      nombreSeguro: seguroActual?.nombreSeguro || '',
      modoSeguro: seguroActual?.modoSeguro || '',
      fechaInicio: this.toIsoDate(fechaInicio),
      fechaFin: this.toIsoDate(fechaFin),
      precio: seguroActual?.precio || 0,
      notas: seguroActual?.notas || ''
    };
  }

  inferirTipoVehiculo(vehiculo: Vehiculo | undefined): 'COCHE' | 'MOTO' | null {
    const tipo = (vehiculo?.tipoVehiculo ?? '').toUpperCase().trim();
    if (tipo === 'COCHE' || tipo === 'MOTO') {
      return tipo;
    }
    return null;
  }

  parseDateOnly(value: string | null | undefined): Date | null {
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

  toIsoDate(value: Date): string {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private calcularFechaProximaITV(
    fechaItvActual: Date,
    fechaCompra: Date | null,
    tipoVehiculo: 'COCHE' | 'MOTO'
  ): Date {
    if (fechaCompra && this.fullYearsBetween(fechaCompra, this.startOfDay(new Date())) < 4) {
      return this.addYears(fechaCompra, 4);
    }

    const intervaloAnos = this.getIntervaloAnos(tipoVehiculo, fechaCompra);
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

  private startOfDay(value: Date): Date {
    return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  }
}
