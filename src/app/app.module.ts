import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaVehiculosComponent } from './lista-vehiculos/lista-vehiculos.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { GuardarVehiculoComponent } from './guardar-vehiculo/guardar-vehiculo.component';
import { FormsModule } from '@angular/forms';
import { UpdateVehiculoComponent } from './update-vehiculo/update-vehiculo.component';
import { VehiculoDetallesComponent } from './vehiculo-detalles/vehiculo-detalles.component';
import { GuardarMantenimientoComponent } from './guardar-mantenimiento/guardar-mantenimiento.component';
import { GuardarRuedasComponent } from './guardar-ruedas/guardar-ruedas.component';
import { GuardarPiezasComponent } from './guardar-piezas/guardar-piezas.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaVehiculosComponent,
    GuardarVehiculoComponent,
    UpdateVehiculoComponent,
    VehiculoDetallesComponent,
    GuardarMantenimientoComponent,
    GuardarRuedasComponent,
    GuardarPiezasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
