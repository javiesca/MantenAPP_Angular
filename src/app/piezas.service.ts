import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Piezas } from './piezas';

@Injectable({
  providedIn: 'root'
})
export class PiezasService {


  //URL de la API Spring
  private baseURL = "https://manten-app-52e4cb231749.herokuapp.com/api/mantenimientos/piezas";

  constructor(private httpClient: HttpClient) { }

  //Metodo que nos retorna toda la lista de mantenimientos de motor
  getListaPiezas(idVehiculo : number):Observable<Piezas[]>  {
    return this.httpClient.get<Piezas[]>(`${this.baseURL}/${idVehiculo}`);
  }

  //Metodo que guarda un cambio de pieza
  savePieza(piezas :Piezas) : Observable<Object>{
    return this.httpClient.post<Piezas>(`${this.baseURL}`, piezas);
  }

  //Metodo que elimina una pieza
  deletePieza(idPieza : number) : Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${idPieza}`);
  }


}
