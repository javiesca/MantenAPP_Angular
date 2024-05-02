import { Component, OnInit } from '@angular/core';
import { Piezas } from '../piezas';
import { PiezasService } from '../piezas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-piezas',
  templateUrl: './update-piezas.component.html',
  styleUrl: './update-piezas.component.css'
})
export class UpdatePiezasComponent implements OnInit {

  piezas : Piezas = new Piezas();
  idPiezas : number;

  constructor(private ps : PiezasService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.idPiezas = this.route.snapshot.params['idPiezas'];
    this.obtenerPieza();
  }

  obtenerPieza(){
    this.ps.getPieza(this.idPiezas).subscribe(datos =>{
      this.piezas = datos;
    })
  }

  onSubmit(){
    this.ps.updatePiezas(this.idPiezas, this.piezas).subscribe(datos =>{
      console.log(datos);
      this.router.navigate(['vehiculo-detalles', this.piezas.vehiculo.idVehiculo]);
    }, error => console.log(error));
  }


}
