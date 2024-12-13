import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common'; // Añade esta línea
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaVehiculosComponent } from './components/lista-vehiculos/lista-vehiculos.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { GuardarVehiculoComponent } from './components/vehiculos/guardar-vehiculo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehiculoDetallesComponent } from './components/vehiculo-detalles/vehiculo-detalles.component';
import { GuardarMantenimientoComponent } from './components/guardar-mantenimiento/guardar-mantenimiento.component';
import { GuardarRuedasComponent } from './components/guardar-ruedas/guardar-ruedas.component';
import { GuardarPiezasComponent } from './components/guardar-piezas/guardar-piezas.component';
import { UpdateMantenimientoComponent } from './components/update-mantenimiento/update-mantenimiento.component';
import { UpdatePiezasComponent } from './components/update-piezas/update-piezas.component';
import { UpdateRuedasComponent } from './components/update-ruedas/update-ruedas.component';
import { LoginComponent } from './components/login/login.component';
import { JwtInterceptor } from './utils/JwtInterceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
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
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
