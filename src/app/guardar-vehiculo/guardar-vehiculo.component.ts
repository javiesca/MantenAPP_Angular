import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../vehiculo';
import { VehiculoService } from '../vehiculo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guardar-vehiculo',
  templateUrl: './guardar-vehiculo.component.html',
  styleUrl: './guardar-vehiculo.component.css'
})
export class GuardarVehiculoComponent implements OnInit {

  vehiculo : Vehiculo = new Vehiculo();
  imagePreview: string | ArrayBuffer | null = null;


  constructor(private vehiculoService: VehiculoService, private router: Router){}

  ngOnInit(){
  }

  saveVehiculo(){
    if(this.vehiculo.marca == "" || this.vehiculo.modelo == "" || this.vehiculo.fechaCompra == null){
      alert("Rellene todos los campos");
      return;
    }

    const base64String = this.imagePreview instanceof ArrayBuffer
  ? new TextDecoder('utf-8').decode(new Uint8Array(this.imagePreview))
  : this.imagePreview;

  const base64Data = base64String?.split(',')[1];


       // Asignar la imagen al vehículo si hay una imagen seleccionada
    if (base64Data) {
      this.vehiculo.imagen = base64Data;
    }

    this.vehiculoService.saveVehiculo(this.vehiculo).subscribe(dato => {
      this.irListaVehiculos();
    }, error => console.log(error));
  }

  irListaVehiculos(){
    this.router.navigate(['/vehiculos'])
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(){
    this.saveVehiculo();
  }
}
