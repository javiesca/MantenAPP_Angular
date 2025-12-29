import { VehiculoService } from '../../services/vehiculo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ruedas } from '../../interfaces/ruedas';
import { RuedasService } from '../../services/ruedas.service';
import { Vehiculo } from '../../interfaces/vehiculo';
import { SwalFlowService } from '../../services/swal-flow.service';


@Component({
  selector: 'app-guardar-ruedas',
  templateUrl: './guardar-ruedas.component.html',
  styleUrl: './guardar-ruedas.component.css'
})

export class GuardarRuedasComponent implements OnInit {

  idVehiculo: number;
  idRuedas: number;
  ruedas: Ruedas = new Ruedas();
  vehiculo: Vehiculo = new Vehiculo();
  edit: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vs: VehiculoService,
    private rs: RuedasService,
    private swalFlow: SwalFlowService
  ) { }



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['idRuedas']) {
        this.edit = true;
        this.idRuedas = params['idRuedas'];
        this.getCambioRuedas();

      } else if (params['idVehiculo']) {
        this.idVehiculo = params['idVehiculo'];
        this.getVehiculo();
      }
    });
  }

  onSubmit() {
    if (this.edit) {
      this.updateCambioRuedas();
    }else {
      this.saveCambioRuedas();
    }
  }

  getVehiculo() {
    this.vs.getVehiculoById(this.idVehiculo).subscribe(data => {
      this.vehiculo = data;
      this.ruedas.vehiculo = this.vehiculo;
    })
  }

  getCambioRuedas(): void {
    this.idRuedas = this.route.snapshot.params['idRuedas'];
    this.rs.getRuedas(this.idRuedas).subscribe(datos => {
      this.ruedas = datos;
    })
  }

  saveCambioRuedas() {
    this.swalFlow
      .save(this.rs.saveCambioRuedas(this.ruedas), () => this.irDetalleVehiculo())
      .subscribe();
  }

  updateCambioRuedas() {
    this.swalFlow
      .update(this.rs.updateRuedas(this.idRuedas, this.ruedas), () => this.irDetalleVehiculo())
      .subscribe();
  }

  irDetalleVehiculo() {
    const id = this.ruedas?.vehiculo?.idVehiculo ?? this.vehiculo?.idVehiculo ?? this.idVehiculo;
    this.router.navigate(['vehiculo-detalles', id], { fragment: 'ruedas' });
  }

}
