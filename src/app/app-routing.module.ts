import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaVehiculosComponent } from './components/lista-vehiculos/lista-vehiculos.component';
import { GuardarVehiculoComponent } from './components/vehiculos/guardar-vehiculo.component';
import { VehiculoDetallesComponent } from './components/vehiculo-detalles/vehiculo-detalles.component';
import { GuardarMantenimientoComponent } from './components/guardar-mantenimiento/guardar-mantenimiento.component';
import { GuardarPiezasComponent } from './components/guardar-piezas/guardar-piezas.component';
import { GuardarRuedasComponent } from './components/guardar-ruedas/guardar-ruedas.component';
import { UpdateMantenimientoComponent } from './components/update-mantenimiento/update-mantenimiento.component';
import { UpdatePiezasComponent } from './components/update-piezas/update-piezas.component';
import { UpdateRuedasComponent } from './components/update-ruedas/update-ruedas.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path : '', redirectTo:'login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path : 'vehiculos', component: ListaVehiculosComponent, canActivate: [AuthGuard]},
  {path: 'guardar-vehiculo/:idVehiculo', component: GuardarVehiculoComponent, canActivate: [AuthGuard]},
  {path: 'guardar-vehiculo', component: GuardarVehiculoComponent, canActivate: [AuthGuard] },
  {path: 'vehiculo-detalles/:idVehiculo', component:VehiculoDetallesComponent, canActivate: [AuthGuard]},
  {path: 'guardar-mantenimiento/:idVehiculo', component: GuardarMantenimientoComponent, canActivate: [AuthGuard]},
  {path: 'guardar-piezas/:idVehiculo', component: GuardarPiezasComponent, canActivate: [AuthGuard]},
  {path: 'guardar-ruedas/:idVehiculo', component: GuardarRuedasComponent, canActivate: [AuthGuard]},
  {path: 'update-mantenimiento/:idFiltros', component: UpdateMantenimientoComponent, canActivate: [AuthGuard]},
  {path: 'update-piezas/:idPiezas', component: UpdatePiezasComponent, canActivate: [AuthGuard]},
  {path: 'update-ruedas/:idRuedas', component: UpdateRuedasComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
