import { TestBed } from '@angular/core/testing';
import { VehiculoRecordsService } from './vehiculo-records.service';
import { ITV } from '../interfaces/itv';
import { Seguro } from '../interfaces/seguros';
import { Vehiculo } from '../interfaces/vehiculo';

describe('VehiculoRecordsService', () => {
  let service: VehiculoRecordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiculoRecordsService);
  });

  it('builds renewed seguro dates from the current end date', () => {
    const seguro = {
      nombreSeguro: 'Mapfre',
      modoSeguro: 'Todo riesgo',
      fechaFin: '2026-05-20',
      precio: 420,
      notas: 'Cobertura completa'
    } as Seguro;

    const result = service.buildRenewedSeguroPrefill(seguro);

    expect(result).toEqual({
      nombreSeguro: 'Mapfre',
      modoSeguro: 'Todo riesgo',
      fechaInicio: '2026-05-20',
      fechaFin: '2027-05-20',
      precio: 420,
      notas: 'Cobertura completa'
    });
  });

  it('builds next itv prefill using the current expiry as the next start date', () => {
    const itv = {
      idITV: 1,
      sitioITV: 'ITV Centro',
      fechaITV: '2025-06-10',
      fechaProximaITV: '2026-06-10',
      notasITV: 'Revisar luces',
      vehiculo: {} as Vehiculo
    } as ITV;

    const vehiculo = {
      tipoVehiculo: 'COCHE',
      fechaCompra: '2018-01-15'
    } as Vehiculo;

    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2026, 2, 9));

    const result = service.buildNextItvPrefill(itv, vehiculo);

    expect(result).toEqual({
      sitioITV: 'ITV Centro',
      fechaITV: '2026-06-10',
      fechaProximaITV: '2028-06-10',
      notasITV: 'Revisar luces'
    });

    jasmine.clock().uninstall();
  });

  it('returns null when the current seguro has no valid end date', () => {
    const result = service.buildRenewedSeguroPrefill({ fechaFin: 'fecha-mala' } as Seguro);
    expect(result).toBeNull();
  });
});
