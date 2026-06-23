import { Component, OnInit } from '@angular/core';
import { ITV } from '../../interfaces/itv';
import { Vehiculo } from '../../interfaces/vehiculo';
import { ActivatedRoute, Router } from '@angular/router';
import { ITVService } from '../../services/itvs.service';
import { VehiculoService } from '../../services/vehiculo.service';
import { SwalFlowService } from '../../services/swal-flow.service';
import { VehiculoRecordsService } from '../../services/vehiculo-records.service';


@Component({
  selector: 'app-itvs',
  templateUrl: './itvs.component.html',
  styleUrl: './itvs.component.css'
})
export class ItvsComponent implements OnInit {

  idVehiculo: number;
  idITV: number;
  itv: ITV = new ITV();
  vehiculo: Vehiculo = new Vehiculo();
  edit: boolean = false;
  private prefill: Partial<ITV> | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itvs: ITVService,
    private vs: VehiculoService,
    private swalFlow: SwalFlowService,
    private vehiculoRecords: VehiculoRecordsService
  ) { }


  onSubmit() {
    if (this.isEditMode())
      this.updateITV();
    else
      this.saveITV();
  }

  isEditMode(): boolean {
    return this.edit && !!this.idITV;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.resetState();

      if (params['idITV']) {
        this.edit = true;
        this.idITV = params['idITV'];
        this.getITV();
      } else if (params['idVehiculo']) {
        this.idVehiculo = params['idVehiculo'];
        this.prefill = history.state?.prefill ?? null;
        this.getVehiculo();
      }
    });
  }

  private resetState(): void {
    this.edit = false;
    this.idVehiculo = undefined as unknown as number;
    this.idITV = undefined as unknown as number;
    this.prefill = null;
    this.itv = new ITV();
    this.vehiculo = new Vehiculo();
  }


  getITV(): void {
    this.idITV = this.route.snapshot.params['idITV'];
    this.itvs.getITV(this.idITV).subscribe(data => {
      this.itv = data;
    });
  }


  getVehiculo() {
    this.vs.getVehiculoById(this.idVehiculo).subscribe(data => {
      this.vehiculo = data;
      this.itv.vehiculo = this.vehiculo;
      const prefill = this.prefill ?? this.vehiculoRecords.buildNewItvPrefill(this.vehiculo);
      if (prefill) {
        this.itv = {
          ...this.itv,
          ...prefill,
          vehiculo: this.vehiculo
        };
      }
    })
  }

  saveITV() {
    this.swalFlow
      .save(this.itvs.saveITV(this.itv), () => this.irDetalleVehiculo())
      .subscribe();
  }

  updateITV() {
    this.swalFlow
      .update(this.itvs.updateITV(this.idITV, this.itv), () => this.irDetalleVehiculo())
      .subscribe();
  }

  irDetalleVehiculo() {
    const id = this.itv?.vehiculo?.idVehiculo ?? this.vehiculo?.idVehiculo ?? this.idVehiculo;
    this.router.navigate(['vehiculo-detalles', id], { fragment: 'itv' });
  }
}
