import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../utils/variables';
import { Observable } from 'rxjs';
import { Notas } from '../interfaces/notas';

@Injectable({
  providedIn: 'root'
})

export class NotasService {

  //URL de la API Spring
  private baseURL = environment.apiBaseURL + "mantenimientos/notas";

  constructor(private httpClient : HttpClient) {}

  getNotas(idVehiculo : number):Observable<Notas[]>{
    return this.httpClient.get<Notas[]>(`${this.baseURL}/vehiculo/${idVehiculo}`);
  }

  deleteNota(idNota : number):Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${idNota}`);
  }

  getNota(idNota : number):Observable<Notas>{
    return this.httpClient.get<Notas>(`${this.baseURL}/${idNota}`);
  }

  saveNota(nota : Notas):Observable<Object>{
    return this.httpClient.post<Notas>(`${this.baseURL}`, nota);
  }

   updateNota(idNota: number, nota: Notas): Observable<Object>{
      return this.httpClient.put(`${this.baseURL}/${idNota}`, nota);
    }

}
