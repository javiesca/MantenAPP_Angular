import { Injectable } from '@angular/core';
import { environment } from '../utils/variables';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seguro } from '../interfaces/seguros';

@Injectable({
  providedIn: 'root'
})
export class SegurosService {

  //URL de la API
  private baseURL = environment.apiBaseURL + "mantenimientos/seguros";

  constructor(private httpClient : HttpClient) { }

  getListaSeguros(idVehiculo : number):
  Observable<Seguro[]>  {
    return this.httpClient.get<Seguro[]>(`${this.baseURL}/vehiculo/${idVehiculo}`);
  }

  saveSeguro(seguro: Seguro):Observable<Object>{
    return this.httpClient.post<Seguro>(`${this.baseURL}`, seguro);
  }

  deleteSeguro(idSeguro: number):Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${idSeguro}`);
  }

  updateSeguro(idSeguro: number, seguro : Seguro): Observable<Object>{
      return this.httpClient.put(`${this.baseURL}/${idSeguro}`, seguro);
    }

  getSeguro(idSeguro : number): Observable<Seguro>{
    return this.httpClient.get<Seguro>(`${this.baseURL}/${idSeguro}`);
  }

}
