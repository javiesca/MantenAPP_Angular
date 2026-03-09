import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../interfaces/vehiculo';
import { VehiculoService } from '../../services/vehiculo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SwalFlowService } from '../../services/swal-flow.service';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-guardar-vehiculo',
  templateUrl: './guardar-vehiculo.component.html',
  styleUrl: './guardar-vehiculo.component.css'
})
export class GuardarVehiculoComponent implements OnInit {
  formVehiculo : FormGroup;
  vehiculo : Vehiculo = new Vehiculo();
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  edit : boolean = false;

constructor(
    private formBuilder: FormBuilder,
    private vehiculoService: VehiculoService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private swalFlow: SwalFlowService){

      this.formVehiculo = new FormGroup({
        idVehiculo: this.formBuilder.control(null),
        marca: this.formBuilder.control(''),
        modelo: this.formBuilder.control(''),
        tipoVehiculo: this.formBuilder.control('COCHE'),
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
    this.swalFlow
      .updateWith(
        this.vehiculoService.updateVehiculo(this.formVehiculo.value).pipe(
          switchMap(() => this.selectedFile
            ? this.vehiculoService.updateVehiculoImage(this.formVehiculo.value.idVehiculo, this.selectedFile)
            : of(null))
        ),
        {
          successTitle: 'Vehiculo actualizado',
          errorText: 'Hubo un error al actualizar el vehiculo o su imagen.'
        },
        () => this.irListaVehiculos()
      )
      .subscribe();
  }

  saveVehiculo() {
    this.swalFlow
      .saveWith(
        this.vehiculoService.saveVehiculo(this.formVehiculo.value, this.selectedFile),
        {
          successTitle: 'Vehiculo guardado'
        },
        () => this.irListaVehiculos()
      )
      .subscribe();
  }

  irListaVehiculos(){
    this.router.navigate(['/vehiculos'])
  }

  getVehiculoId(id: number){
    this.vehiculoService.getVehiculoById(id).subscribe(data => {
      this.vehiculo = data;

      this.formVehiculo.patchValue({
        idVehiculo: this.vehiculo.idVehiculo,
        marca: this.vehiculo.marca,
        modelo: this.vehiculo.modelo,
        tipoVehiculo: this.vehiculo.tipoVehiculo ?? 'COCHE',
        matricula: this.vehiculo.matricula,
        fechaCompra: this.vehiculo.fechaCompra,
        image: this.vehiculo.image
      });

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

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

}
