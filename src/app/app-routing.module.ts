import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaVehiculosComponent } from './lista-vehiculos/lista-vehiculos.component';
import { GuardarVehiculoComponent } from './guardar-vehiculo/guardar-vehiculo.component';
import { UpdateVehiculoComponent } from './update-vehiculo/update-vehiculo.component';
import { VehiculoDetallesComponent } from './vehiculo-detalles/vehiculo-detalles.component';
import { GuardarMantenimientoComponent } from './guardar-mantenimiento/guardar-mantenimiento.component';
import { GuardarPiezasComponent } from './guardar-piezas/guardar-piezas.component';
import { GuardarRuedasComponent } from './guardar-ruedas/guardar-ruedas.component';
import { UpdateMantenimientoComponent } from './update-mantenimiento/update-mantenimiento.component';
import { UpdatePiezasComponent } from './update-piezas/update-piezas.component';
import { UpdateRuedasComponent } from './update-ruedas/update-ruedas.component';

const routes: Routes = [

  {path : 'vehiculos', component: ListaVehiculosComponent},
  {path : '', redirectTo:'vehiculos', pathMatch:'full'},
  {path: 'guardar-vehiculo', component: GuardarVehiculoComponent},
  {path: 'update-vehiculo/:idVehiculo', component: UpdateVehiculoComponent},
  {path: 'vehiculo-detalles/:idVehiculo', component:VehiculoDetallesComponent},
  {path: 'guardar-mantenimiento/:idVehiculo', component: GuardarMantenimientoComponent},
  {path: 'guardar-piezas/:idVehiculo', component: GuardarPiezasComponent},
  {path: 'guardar-ruedas/:idVehiculo', component: GuardarRuedasComponent},
  {path: 'update-mantenimiento/:idFiltros', component: UpdateMantenimientoComponent},
  {path: 'update-piezas/:idPiezas', component: UpdatePiezasComponent},
  {path: 'update-ruedas/:idRuedas', component: UpdateRuedasComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
