import { Component, OnInit } from '@angular/core';
import { Seguro } from '../../interfaces/seguros';
import { Vehiculo } from '../../interfaces/vehiculo';
import { VehiculoService } from '../../services/vehiculo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SegurosService } from '../../services/seguros.service';
import { SwalFlowService } from '../../services/swal-flow.service';

@Component({
  selector: 'app-seguros',
  templateUrl: './seguros.component.html',
  styleUrl: './seguros.component.css'
})


export class SegurosComponent implements OnInit {

  idVehiculo: number;
  idSeguro: number;
  seguro: Seguro = new Seguro();
  vehiculo: Vehiculo = new Vehiculo();
  edit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vs: VehiculoService,
    private ss: SegurosService,
    private swalFlow: SwalFlowService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['idSeguro']) {
        this.edit = true;
        this.idSeguro = params['idSeguro'];
        this.getSeguro();
      } else if (params['idVehiculo']) {
        this.idVehiculo = params['idVehiculo'];
        this.getVehiculo();
      }
    });
  }

  onSubmit() {
    if (this.edit)
      this.updateSeguro();
    else
      this.saveSeguro();
  }

  onFechaInicioChange(fecha: string) {
    if (!fecha) return;

    const inicio = new Date(fecha + 'T00:00:00'); 
    const fin = new Date(inicio);
    fin.setFullYear(fin.getFullYear() + 1);

    this.seguro.fechaFin = fin;
  }

  getSeguro(): void {
    this.idSeguro = this.route.snapshot.params['idSeguro'];
    this.ss.getSeguro(this.idSeguro).subscribe(data => {
      this.seguro = data;
    });
  }

  getVehiculo() {
    this.vs.getVehiculoById(this.idVehiculo).subscribe(data => {
      this.vehiculo = data;
      this.seguro.vehiculo = this.vehiculo;
    })
  }

  saveSeguro() {
    this.swalFlow
      .save(this.ss.saveSeguro(this.seguro), () => this.irDetalleVehiculo())
      .subscribe();
  }

  updateSeguro() {
    this.swalFlow
      .update(this.ss.updateSeguro(this.idSeguro, this.seguro), () => this.irDetalleVehiculo())
      .subscribe();
  }

  irDetalleVehiculo() {
    const id = this.seguro?.vehiculo?.idVehiculo ?? this.vehiculo?.idVehiculo ?? this.idVehiculo;
    this.router.navigate(['vehiculo-detalles', id], { fragment: 'seguros' });
  }

}
