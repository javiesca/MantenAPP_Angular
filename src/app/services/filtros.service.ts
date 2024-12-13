import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Filtros } from '../interfaces/filtros';
import { environment } from '../utils/variables';


@Injectable({
  providedIn: 'root'
})
export class FiltrosService {

  //URL de la API Spring
  private baseURL = environment.apiBaseURL + "mantenimientos/filtros";

  constructor(private httpClient: HttpClient) { }

  //Metodo que nos retorna toda la lista de mantenimientos de motor
  getListaMantenimentos(idVehiculo : number):Observable<Filtros[]>  {
    return this.httpClient.get<Filtros[]>(`${this.baseURL}/vehiculo/${idVehiculo}`);
  }

  //Metodo que nos retorna un mantenimiento en concreto
  getMantenimiento(idFiltros : number) : Observable<Filtros>{
    return this.httpClient.get<Filtros>(`${this.baseURL}/${idFiltros}`);
  }

  //Metodo para guardar un cambio de filtros
  saveFiltros(filtros :Filtros) : Observable<Object>{
    return this.httpClient.post<Filtros>(`${this.baseURL}`, filtros);
  }

  //Metodo que elimina un cambio de filtros
  deleteFiltros(idFiltros : number) : Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${idFiltros}`);
  }

  //Metodo para actualizar un mantenimiento
  updateMantenimiento(idFiltros: number, filtros: Filtros): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${idFiltros}`, filtros);
  }
}
