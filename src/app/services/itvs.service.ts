import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../utils/variables';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ItvsService {

  //URL de la API Spring
  private baseURL = environment.apiBaseURL + "mantenimientos/itvs";

  constructor(private httpClient: HttpClient) {}

  getItvs(idVehiculo: number): Observable<Object> {
    return this.httpClient.get(`${this.baseURL}/vehiculo/${idVehiculo}`);
  }

  deleteItv(idItv: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${idItv}`);
  }

  getItv(idItv: number): Observable<Object> {
    return this.httpClient.get(`${this.baseURL}/${idItv}`);
  }


  saveItv(itv: Object): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, itv);
  }

  updateItv(idItv: number, itv: Object): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${idItv}`, itv);
  }
}
