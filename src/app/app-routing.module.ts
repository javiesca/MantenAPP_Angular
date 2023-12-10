import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaVehiculosComponent } from './lista-vehiculos/lista-vehiculos.component';
import { GuardarVehiculoComponent } from './guardar-vehiculo/guardar-vehiculo.component';
import { UpdateVehiculoComponent } from './update-vehiculo/update-vehiculo.component';
import { VehiculoDetallesComponent } from './vehiculo-detalles/vehiculo-detalles.component';

const routes: Routes = [

  {path : 'vehiculos', component: ListaVehiculosComponent},
  {path : '', redirectTo:'vehiculos', pathMatch:'full'},
  {path: 'guardar-vehiculo', component: GuardarVehiculoComponent},
  {path: 'update-vehiculo/:idVehiculo', component: UpdateVehiculoComponent},
  {path: 'vehiculo-detalles/:idVehiculo', component:VehiculoDetallesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
