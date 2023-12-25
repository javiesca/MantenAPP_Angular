import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ruedas } from './ruedas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RuedasService {


  //URL de la API Spring
  private baseURL = "https://manten-app-52e4cb231749.herokuapp.com/api/mantenimientos/ruedas";

  constructor(private httpClient: HttpClient) { }


  //Metodo que nos retorna toda la lista de mantenimientos de motor
  getListaCambiosRuedas(idVehiculo : number):Observable<Ruedas[]>  {
    return this.httpClient.get<Ruedas[]>(`${this.baseURL}/${idVehiculo}`);
  }

  //Metodo que guarda un cambio de ruedas
  saveCambioRuedas(ruedas: Ruedas):Observable<Object>{
    return this.httpClient.post<Ruedas>(`${this.baseURL}`, ruedas);
  }

  //Metodo que elimina un cambio de ruedas
  deleteRuedas(idRuedas: number):Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${idRuedas}`);
  }

}
