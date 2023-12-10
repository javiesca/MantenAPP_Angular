import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ruedas } from './ruedas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RuedasService {


  //URL de la API Spring
  private baseURL = "http://localhost:8080/api/mantenimientos/ruedas";

  constructor(private httpClient: HttpClient) { }

  //Metodo que nos retorna toda la lista de mantenimientos de motor
  getListaCambiosRuedas(idVehiculo : number):Observable<Ruedas[]>  {
    return this.httpClient.get<Ruedas[]>(`${this.baseURL}/${idVehiculo}`);
  }

}
