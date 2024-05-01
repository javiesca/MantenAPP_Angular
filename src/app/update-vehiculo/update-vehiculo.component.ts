import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoService } from '../vehiculo.service';
import { Vehiculo } from './../vehiculo';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-vehiculo',
  templateUrl: './update-vehiculo.component.html',
  styleUrl: './update-vehiculo.component.css'
})

export class UpdateVehiculoComponent implements OnInit {

  idVehiculo : number;
  vehiculo : Vehiculo = new Vehiculo();
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private vs : VehiculoService, private route : ActivatedRoute, private router : Router) {};

  ngOnInit(): void {
    this.idVehiculo = this.route.snapshot.params['idVehiculo'];
    this.obtenerVehiculo(this.idVehiculo);
  }

  obtenerVehiculo(idVehiculo:number){
    this.vs.getVehiculoById(idVehiculo).subscribe(datos =>{
      this.vehiculo = datos;
      this.imagePreview = 'data:image/jpeg;base64,' + this.vehiculo.imagen;
      console.log(datos);
    })
  }

  onSubmit(){
    this.vs.updateVehiculo(this.idVehiculo, this.vehiculo).subscribe(datos =>{
      console.log(datos);
      this.router.navigate(['vehiculos']);
    }, error => console.log(error));
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      this.imagePreview = reader.result;
      if (typeof this.imagePreview === 'string') {
        const base64Data = this.imagePreview.split(',')[1];
        this.vehiculo.imagen = base64Data;
      }
    };
    reader.readAsDataURL(file);
  }

}
