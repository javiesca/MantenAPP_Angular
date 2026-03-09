import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Filtros } from '../../interfaces/filtros';
import { VehiculoService } from '../../services/vehiculo.service';
import { Vehiculo } from '../../interfaces/vehiculo';
import { FiltrosService } from '../../services/filtros.service';
import { SwalFlowService } from '../../services/swal-flow.service';


@Component({
  selector: 'app-guardar-mantenimiento',
  templateUrl: './guardar-mantenimiento.component.html',
  styleUrl: './guardar-mantenimiento.component.css'
})

export class GuardarMantenimientoComponent implements OnInit {
  idVehiculo: number;
  idFiltros: number;
  filtros: Filtros = new Filtros();
  vehiculo: Vehiculo = new Vehiculo();
  edit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fs: FiltrosService,
    private vs: VehiculoService,
    private swalFlow: SwalFlowService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.resetState();

      if (params['idFiltros']) {
        this.edit = true;
        this.idFiltros = params['idFiltros'];
        this.getFiltroId(this.idFiltros);

      } else if (params['idVehiculo']) {
        this.idVehiculo = params['idVehiculo'];
        this.getVehiculo();
      }
    });
  }

  private resetState(): void {
    this.edit = false;
    this.idVehiculo = undefined as unknown as number;
    this.idFiltros = undefined as unknown as number;
    this.filtros = new Filtros();
    this.filtros.fechaCambio = this.getTodayIsoDate();
    this.vehiculo = new Vehiculo();
  }

  private getTodayIsoDate(): string {
    return new Date().toISOString().split('T')[0];
  }


  onSubmit() {
    if (this.isEditMode())
      this.updateFiltros();
    else
      this.saveFiltros();
  }

  isEditMode(): boolean {
    return this.edit && !!this.idFiltros;
  }


  getFiltroId(id: number) {
    this.fs.getMantenimiento(id).subscribe(datos => {
      this.filtros = datos;
    })
  }

  getVehiculo() {
    this.vs.getVehiculoById(this.idVehiculo).subscribe(data => {
      this.vehiculo = data;
      this.filtros.vehiculo = this.vehiculo;
    })
  }

  updateFiltros() {
    this.swalFlow
      .update(this.fs.updateMantenimiento(this.filtros.idFiltros, this.filtros),() => this.irDetalleVehiculo())
      .subscribe();
  }

  saveFiltros() {
    this.swalFlow
      .save(this.fs.saveFiltros(this.filtros), () => this.irDetalleVehiculo())
      .subscribe();
  }


  irDetalleVehiculo() {
    const id = this.filtros?.vehiculo?.idVehiculo ?? this.vehiculo?.idVehiculo ?? this.idVehiculo;
    this.router.navigate(['vehiculo-detalles', id], { fragment: 'mantenimientos' });
  }

}
