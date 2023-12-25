import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filtros } from './filtros';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {

  //URL de la API Spring
  private baseURL = "https://manten-app-52e4cb231749.herokuapp.com/api/mantenimientos/filtros";

  constructor(private httpClient: HttpClient) { }

  //Metodo que nos retorna toda la lista de mantenimientos de motor
  getListaMantenimentos(idVehiculo : number):Observable<Filtros[]>  {
    return this.httpClient.get<Filtros[]>(`${this.baseURL}/${idVehiculo}`);
  }

  //Metodo para guardar un cambio de filtros
  saveFiltros(filtros :Filtros) : Observable<Object>{
    return this.httpClient.post<Filtros>(`${this.baseURL}`, filtros);
  }

  //Metodo que elimina un cambio de filtros
  deleteFiltros(idFiltros : number) : Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${idFiltros}`);
  }

}
