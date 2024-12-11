import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../vehiculo';
import { VehiculoService } from '../vehiculo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-guardar-vehiculo',
  templateUrl: './guardar-vehiculo.component.html',
  styleUrl: './guardar-vehiculo.component.css'
})
export class GuardarVehiculoComponent implements OnInit {
  formVehiculo : FormGroup;
  vehiculo : Vehiculo = new Vehiculo();
  selectedFile: File | null = null; // Para almacenar el archivo
  previewUrl: string | ArrayBuffer | null = null; // Para la vista previa
  edit : boolean = false;


constructor(
    private formBuilder: FormBuilder,
    private vehiculoService: VehiculoService, 
    private router: Router,
    private activateRoute: ActivatedRoute){
      this.formVehiculo = new FormGroup({
        idVehiculo: this.formBuilder.control(null),
        marca: this.formBuilder.control(''),
        modelo: this.formBuilder.control(''),
        fechaCompra: this.formBuilder.control(null),
        image: this.formBuilder.control(null)
      });
  }

  ngOnInit(){
    let id = this.activateRoute.snapshot.params['idVehiculo'];
    if (id && id !== 'new'){
      this.edit = true;
      this.getVehiculoId(+id!);
    }
  }

  updateVehiculo(){
    this.vehiculoService.updateVehiculo(this.formVehiculo.value).subscribe(dato => {
      this.irListaVehiculos();
    }, error => console.log(error));
  }

  saveVehiculo(){
    this.vehiculoService
    .saveVehiculo(this.formVehiculo.value, this.selectedFile)
    .subscribe(dato => {
      this.irListaVehiculos();
    }, error => console.log(error));
  }

  irListaVehiculos(){
    this.router.navigate(['/vehiculos'])
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      // Generar la URL de vista previa
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }


  getVehiculoId(id: number){
    this.vehiculoService.getVehiculoById(id).subscribe(data => {
      this.vehiculo = data;

      this.formVehiculo.patchValue({
        idVehiculo: this.vehiculo.idVehiculo,
        marca: this.vehiculo.marca,
        modelo: this.vehiculo.modelo,
        fechaCompra: this.vehiculo.fechaCompra,
        image: this.vehiculo.image
      });

      // Si ya tienes una imagen, puedes asignarla a la vista previa
      if (this.vehiculo.image) {
        this.previewUrl = this.vehiculo.image.imageUrl;
      }
    });
  }

  onSubmit(){
    if (this.edit) {
      this.updateVehiculo();
    } else {
      this.saveVehiculo();
    }
  }

  changeImage(event: any){

    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      // Generar la URL de vista previa
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }

    this.vehiculoService.updateVehiculoImage(this.formVehiculo.value.idVehiculo, this.selectedFile).subscribe(data => {
      this.irListaVehiculos();
    }
    , error => console.log(error));
  }

}
