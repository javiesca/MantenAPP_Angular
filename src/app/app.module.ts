import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common'; // Añade esta línea
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './utils/JwtInterceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { ListaVehiculosComponent } from './components/lista-vehiculos/lista-vehiculos.component';
import { VehiculoDetallesComponent } from './components/vehiculo-detalles/vehiculo-detalles.component';
import { GuardarVehiculoComponent } from './components/vehiculos/guardar-vehiculo.component';
import { GuardarMantenimientoComponent } from './components/mantenimientos/guardar-mantenimiento.component';
import { GuardarRuedasComponent } from './components/ruedas/guardar-ruedas.component';
import { GuardarPiezasComponent } from './components/piezas/guardar-piezas.component';
import { LoginComponent } from './components/login/login.component';
import { NotasComponent } from './components/notas/notas.component';


@NgModule({
  declarations: [
    AppComponent,
    ListaVehiculosComponent,
    GuardarVehiculoComponent,
    VehiculoDetallesComponent,
    GuardarMantenimientoComponent,
    GuardarRuedasComponent,
    GuardarPiezasComponent,
    LoginComponent,
    NotasComponent
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

