import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common'; // Añade esta línea

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaVehiculosComponent } from './lista-vehiculos/lista-vehiculos.component';
import { HttpClientModule} from '@angular/common/http';
import { GuardarVehiculoComponent } from './guardar-vehiculo/guardar-vehiculo.component';
import { FormsModule } from '@angular/forms';
import { UpdateVehiculoComponent } from './update-vehiculo/update-vehiculo.component';
import { VehiculoDetallesComponent } from './vehiculo-detalles/vehiculo-detalles.component';
import { GuardarMantenimientoComponent } from './guardar-mantenimiento/guardar-mantenimiento.component';
import { GuardarRuedasComponent } from './guardar-ruedas/guardar-ruedas.component';
import { GuardarPiezasComponent } from './guardar-piezas/guardar-piezas.component';
import { UpdateMantenimientoComponent } from './update-mantenimiento/update-mantenimiento.component';
import { UpdatePiezasComponent } from './update-piezas/update-piezas.component';
import { UpdateRuedasComponent } from './update-ruedas/update-ruedas.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaVehiculosComponent,
    GuardarVehiculoComponent,
    UpdateVehiculoComponent,
    VehiculoDetallesComponent,
    GuardarMantenimientoComponent,
    GuardarRuedasComponent,
    GuardarPiezasComponent,
    UpdateMantenimientoComponent,
    UpdatePiezasComponent,
    UpdateRuedasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
