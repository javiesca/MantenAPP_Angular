import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Piezas } from '../interfaces/piezas';
import { environment } from '../utils/variables';

@Injectable({
  providedIn: 'root'
})
export class PiezasService {


  //URL de la API Spring
  private baseURL = environment.apiBaseURL + "mantenimientos/piezas";

  constructor(private httpClient: HttpClient) { }

  //Metodo que nos retorna toda la lista de mantenimientos de motor
  getListaPiezas(idVehiculo : number):Observable<Piezas[]>  {
    return this.httpClient.get<Piezas[]>(`${this.baseURL}/vehiculo/${idVehiculo}`);
  }

  //Metodo que nos retorna una pieza en concreto
  getPieza(idPiezas : number): Observable<Piezas>{
    return this.httpClient.get<Piezas>(`${this.baseURL}/${idPiezas}`);
  }

  //Metodo que guarda un cambio de pieza
  savePieza(piezas :Piezas) : Observable<Object>{
    return this.httpClient.post<Piezas>(`${this.baseURL}`, piezas);
  }

  //Metodo que elimina una pieza
  deletePieza(idPieza : number) : Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${idPieza}`);
  }

  //Metodo para actualizar un mantenimiento
  updatePiezas(idPieza: number, pieza: Piezas): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${idPieza}`, pieza);
  }

}
