import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common'; // Añade esta línea

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaVehiculosComponent } from './lista-vehiculos/lista-vehiculos.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { GuardarVehiculoComponent } from './guardar-vehiculo/guardar-vehiculo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehiculoDetallesComponent } from './vehiculo-detalles/vehiculo-detalles.component';
import { GuardarMantenimientoComponent } from './guardar-mantenimiento/guardar-mantenimiento.component';
import { GuardarRuedasComponent } from './guardar-ruedas/guardar-ruedas.component';
import { GuardarPiezasComponent } from './guardar-piezas/guardar-piezas.component';
import { UpdateMantenimientoComponent } from './update-mantenimiento/update-mantenimiento.component';
import { UpdatePiezasComponent } from './update-piezas/update-piezas.component';
import { UpdateRuedasComponent } from './update-ruedas/update-ruedas.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './JwtInterceptor';
@NgModule({
  declarations: [
    AppComponent,
    ListaVehiculosComponent,
    GuardarVehiculoComponent,
    VehiculoDetallesComponent,
    GuardarMantenimientoComponent,
    GuardarRuedasComponent,
    GuardarPiezasComponent,
    UpdateMantenimientoComponent,
    UpdatePiezasComponent,
    UpdateRuedasComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
