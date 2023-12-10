import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaVehiculosComponent } from './lista-vehiculos/lista-vehiculos.component';
import { HttpClientModule } from '@angular/common/http';
import { GuardarVehiculoComponent } from './guardar-vehiculo/guardar-vehiculo.component';
import { FormsModule } from '@angular/forms';
import { UpdateVehiculoComponent } from './update-vehiculo/update-vehiculo.component';
import { VehiculoDetallesComponent } from './vehiculo-detalles/vehiculo-detalles.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaVehiculosComponent,
    GuardarVehiculoComponent,
    UpdateVehiculoComponent,
    VehiculoDetallesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
