import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../interfaces/vehiculo';
import { VehiculoService } from '../../services/vehiculo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

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
        matricula: this.formBuilder.control(''),
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

  updateVehiculo() {
    Swal.fire({
      title: 'Actualizando...',
      text: 'Por favor, espera mientras se actualiza el vehículo.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.vehiculoService.updateVehiculo(this.formVehiculo.value).subscribe(
      response => {
        if (this.selectedFile) {
          this.vehiculoService.updateVehiculoImage(this.formVehiculo.value.idVehiculo, this.selectedFile).subscribe(
            data => {
              Swal.close();
              Swal.fire({
                title: 'Actualizado',
                text: 'El vehículo ha sido actualizado con éxito.',
                icon: 'success'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.irListaVehiculos();
                }
              });
            },
            error => {
              Swal.close();
              Swal.fire({
                title: 'Error',
                text: 'Hubo un error al actualizar la imagen del vehículo.',
                icon: 'error'
              });
            }
          );
        } else {
          Swal.close();
          Swal.fire({
            title: 'Actualizado',
            text: 'El vehículo ha sido actualizado con éxito.',
            icon: 'success'
          }).then((result) => {
            if (result.isConfirmed) {
              this.irListaVehiculos();
            }
          });
        }
      },
      error => {
        Swal.close();
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al actualizar el vehículo.',
          icon: 'error'
        });
      }
    );
  }

  saveVehiculo() {
    Swal.fire({
      title: 'Guardando...',
      text: 'Por favor, espera mientras se guarda el vehículo.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.vehiculoService.saveVehiculo(this.formVehiculo.value, this.selectedFile).subscribe(
      response => {
        Swal.close();
        Swal.fire({
          title: 'Guardado',
          text: 'El vehículo ha sido guardado con éxito.',
          icon: 'success'
        }).then((result) => {
          if (result.isConfirmed) {
            this.irListaVehiculos();
          }
        });
      },
      error => {
        Swal.close();
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al guardar el vehículo.',
          icon: 'error'
        });
      }
    );
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
        matricula: this.vehiculo.matricula,
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
  }

}
