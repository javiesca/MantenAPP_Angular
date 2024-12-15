import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Filtros } from '../../interfaces/filtros';
import { VehiculoService } from '../../services/vehiculo.service';
import { Vehiculo } from '../../interfaces/vehiculo';
import { FiltrosService } from '../../services/filtros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-guardar-mantenimiento',
  templateUrl: './guardar-mantenimiento.component.html',
  styleUrl: './guardar-mantenimiento.component.css'
})

export class GuardarMantenimientoComponent implements OnInit {
  idVehiculo: number;
  idFiltros: number;
  filtros : Filtros = new Filtros();
  vehiculo : Vehiculo = new Vehiculo();
  edit : boolean = false;

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private fs : FiltrosService,
    private vs : VehiculoService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
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

  getFiltroId(id: number){
    this.fs.getMantenimiento(id).subscribe(datos =>{
      console.log(datos);
      this.filtros = datos;
    })
  }

  getVehiculo(){
    this.vs.getVehiculoById(this.idVehiculo).subscribe(data => {
      this.vehiculo = data;
      this.filtros.vehiculo = this.vehiculo;
    })
  }

  updateFiltros(){
    this.fs.updateMantenimiento(this.filtros.idFiltros, this.filtros).subscribe(datos =>{
      this.router.navigate(['vehiculo-detalles', this.filtros.vehiculo.idVehiculo]);
    }, error => console.log(error));
  }

  saveFiltros(){
    Swal.fire({
      title: 'Guardando...',
      text: 'Por favor, espera mientras se guarda el mantenimiento.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.fs.saveFiltros(this.filtros).subscribe(
      dato => {
        Swal.close();
        Swal.fire({
          title: 'Guardado',
          text: 'Mantenimiento guardado con éxito',
          icon: 'success'
        })
        this.irDetalleVehiculo();
      },
      error => {
        Swal.close();
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al guardar el mantenimiento',
          icon: 'error'
        })
      }
    );
  }

  irDetalleVehiculo(){
    this.router.navigate(['vehiculo-detalles', this.idVehiculo]);
  }

  onSubmit(){
    if(this.edit)
      this.updateFiltros();
    else
    this.saveFiltros();
  }

}
