import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filtros } from './filtros';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {

  //URL de la API Spring
  private baseURL = "http://localhost:8080/api/mantenimientos/filtros";

  constructor(private httpClient: HttpClient) { }

  //Metodo que nos retorna toda la lista de mantenimientos de motor
  getListaMantenimentos(idVehiculo : number):Observable<Filtros[]>  {
    return this.httpClient.get<Filtros[]>(`${this.baseURL}/${idVehiculo}`);
  }

}
