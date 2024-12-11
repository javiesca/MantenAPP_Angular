import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehiculo } from './vehiculo';
import {environment } from './variables';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  //URL de la API Spring
  private baseURL = environment.apiBaseURL + "vehiculos";


  constructor(private httpClient: HttpClient) { }

  //Metodo que nos retorna toda la lista de vehiculos
  getListaVehiculos():Observable<Vehiculo[]>  {
    return this.httpClient.get<Vehiculo[]>(`${this.baseURL}`);
  }

  //Metodo para actualizar un vehiculo
  updateVehiculo(vehiculo : Vehiculo): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}`, vehiculo);
  }

  //Metodo para eliminar un vehiculo
  deleteVehiculo(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  //Metodo para obtener un vehiculo por id
  getVehiculoById(id: number): Observable<Vehiculo>{
    return this.httpClient.get<Vehiculo>(`${this.baseURL}/${id}`);
  }

//Metodo para guardar un vehiculo
  saveVehiculo(vehiculo: Vehiculo, imagen: File | null): Observable<Object> {
    const formData = new FormData();
    formData.append('vehiculo',  new Blob([JSON.stringify(vehiculo)], {type: 'application/json'}));
    if (imagen) {
      formData.append('imagen', imagen);  
    }
    return this.httpClient.post(`${this.baseURL}`, formData);
  }

  updateVehiculoImage(idVehiculo: number, imagen: File | null): Observable<Object> {
    const formData = new FormData();
    if (imagen) {
      formData.append('imagen', imagen);  
    }
    return this.httpClient.put(`${this.baseURL}/${idVehiculo}/image`, formData);
  }

}
