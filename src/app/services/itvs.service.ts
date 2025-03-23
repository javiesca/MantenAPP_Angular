import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../utils/variables';
import { Observable } from 'rxjs';
import { ITV } from '../interfaces/itv';

@Injectable({
  providedIn: 'root'
})

export class ITVService {

  //URL de la API Spring
  private baseURL = environment.apiBaseURL + "mantenimientos/itvs";

  constructor(private httpClient: HttpClient) {}

  getITVs(idVehiculo: number): Observable<ITV[]> {
    return this.httpClient.get<ITV[]>(`${this.baseURL}/vehiculo/${idVehiculo}`);
  }

  deleteITV(idITV: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${idITV}`);
  }

  getITV(idITV: number): Observable<ITV> {
    return this.httpClient.get<ITV>(`${this.baseURL}/${idITV}`);
  }


  saveITV(itv: ITV): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, itv);
  }

  updateITV(idITV: number, itv: ITV): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${idITV}`, itv);
  }
}
