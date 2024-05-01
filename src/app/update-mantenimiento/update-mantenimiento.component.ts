import { ActivatedRoute, Router } from '@angular/router';
import { FiltrosService } from '../filtros.service';
import { Filtros } from './../filtros';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-mantenimiento',
  templateUrl: './update-mantenimiento.component.html',
  styleUrl: './update-mantenimiento.component.css'
})
export class UpdateMantenimientoComponent implements OnInit {

  idFiltros : number;
  filtro : Filtros = new Filtros();

  constructor(private fs : FiltrosService, private route : ActivatedRoute, private router : Router) {}

  ngOnInit(): void {
    this.idFiltros = this.route.snapshot.params['idFiltros'];
    this.obtenerFiltros(this.idFiltros);
  }

  obtenerFiltros(idFiltros:number){
    this.fs.getMantenimiento(idFiltros).subscribe(datos =>{
      this.filtro = datos;
    })
  }
  onSubmit(){
    this.fs.updateMantenimiento(this.idFiltros, this.filtro).subscribe(datos =>{
      console.log(datos);
      this.router.navigate(['vehiculo-detalles', this.filtro.vehiculo.idVehiculo]);
    }, error => console.log(error));
  }

}
