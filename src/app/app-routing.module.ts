import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaVehiculosComponent } from './components/lista-vehiculos/lista-vehiculos.component';
import { GuardarVehiculoComponent } from './components/vehiculos/guardar-vehiculo.component';
import { VehiculoDetallesComponent } from './components/vehiculo-detalles/vehiculo-detalles.component';
import { GuardarMantenimientoComponent } from './components/mantenimientos/guardar-mantenimiento.component';
import { GuardarPiezasComponent } from './components/piezas/guardar-piezas.component';
import { GuardarRuedasComponent } from './components/ruedas/guardar-ruedas.component';
import { LoginComponent } from './components/login/login.component';
import { NotasComponent } from './components/notas/notas.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path : '', redirectTo:'login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path : 'vehiculos', component: ListaVehiculosComponent, canActivate: [AuthGuard]},
  {path: 'vehiculo-detalles/:idVehiculo', component:VehiculoDetallesComponent, canActivate: [AuthGuard]},
  {path: 'guardar-vehiculo', component: GuardarVehiculoComponent, canActivate: [AuthGuard] },
  {path: 'guardar-vehiculo/:idVehiculo', component: GuardarVehiculoComponent, canActivate: [AuthGuard] },
  {path: 'guardar-mantenimiento', component: GuardarMantenimientoComponent, canActivate: [AuthGuard] },
  {path: 'guardar-ruedas', component: GuardarRuedasComponent, canActivate: [AuthGuard]},
  {path: 'guardar-piezas', component: GuardarPiezasComponent, canActivate: [AuthGuard]},
  {path: 'guardar-notas', component: NotasComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
