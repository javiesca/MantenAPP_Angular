import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ruedas } from '../interfaces/ruedas';
import { Observable } from 'rxjs';
import {environment } from '../utils/variables';

@Injectable({
  providedIn: 'root'
})
export class RuedasService {


  //URL de la API Spring
  private baseURL = environment.apiBaseURL + "mantenimientos/ruedas";

  constructor(private httpClient: HttpClient) { }


  //Metodo que nos retorna toda la lista de mantenimientos de motor
  getListaCambiosRuedas(idVehiculo : number):Observable<Ruedas[]>  {
    return this.httpClient.get<Ruedas[]>(`${this.baseURL}/vehiculo/${idVehiculo}`);
  }

  //Metodo que guarda un cambio de ruedas
  saveCambioRuedas(ruedas: Ruedas):Observable<Object>{
    return this.httpClient.post<Ruedas>(`${this.baseURL}`, ruedas);
  }

  //Metodo que elimina un cambio de ruedas
  deleteRuedas(idRuedas: number):Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${idRuedas}`);
  }

  //Obtener un cambio de rueda en concreto
  getRuedas(idRuedas: number):Observable<Ruedas>{
    return this.httpClient.get<Ruedas>(`${this.baseURL}/${idRuedas}`);
  }

  //Metodo para actualizar un cambio de ruedas
  updateRuedas(idRuedas: number, rueda : Ruedas): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${idRuedas}`, rueda);
  }

}
