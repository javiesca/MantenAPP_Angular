import { Component } from '@angular/core';
import { Notas } from '../../interfaces/notas';
import { Vehiculo } from '../../interfaces/vehiculo';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoService } from '../../services/vehiculo.service';
import { NotasService } from '../../services/notas.service';
import { SwalFlowService } from '../../services/swal-flow.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.css'
})
export class NotasComponent {

  idVehiculo: number;
  idNota: number;
  nota: Notas = new Notas();
  vehiculo: Vehiculo = new Vehiculo();
  edit: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vs: VehiculoService,
    private ns: NotasService,
    private swalFlow: SwalFlowService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['idNota']) {
        this.edit = true;
        this.idNota = params['idNota'];
        this.getNota();
      } else if (params['idVehiculo']) {
        this.idVehiculo = params['idVehiculo'];
        this.getVehiculo();
      }
    });
  }

  onSubmit() {
    if (this.edit)
      this.uptadaNota();
    else
      this.saveNota();
  }

  getVehiculo() {
    this.vs.getVehiculoById(this.idVehiculo).subscribe(data => {
      this.vehiculo = data;
      this.nota.vehiculo = this.vehiculo;
    })
  }

  getNota() {
    this.ns.getNota(this.idNota).subscribe(datos => {
      this.nota = datos;
    })
  }

  saveNota() {
    this.swalFlow
      .update(this.ns.saveNota(this.nota), () => this.irDetalleVehiculo())
      .subscribe();
  }

  uptadaNota() {
    this.swalFlow
      .update(this.ns.updateNota(this.idNota, this.nota), () => this.irDetalleVehiculo())
      .subscribe();
  }

  irDetalleVehiculo() {
    const id = this.nota?.vehiculo?.idVehiculo ?? this.vehiculo?.idVehiculo ?? this.idVehiculo;
    this.router.navigate(['vehiculo-detalles', id], { fragment: 'notas' });
  }
}
