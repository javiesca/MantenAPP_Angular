import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Piezas } from './piezas';

@Injectable({
  providedIn: 'root'
})
export class PiezasService {


  //URL de la API Spring
  private baseURL = "http://localhost:8080/api/mantenimientos/piezas";

  constructor(private httpClient: HttpClient) { }

  //Metodo que nos retorna toda la lista de mantenimientos de motor
  getListaPiezas(idVehiculo : number):Observable<Piezas[]>  {
    return this.httpClient.get<Piezas[]>(`${this.baseURL}/${idVehiculo}`);
  }

}
