import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehiculo } from './vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  //URL de la API Spring
  private baseURL = "http://localhost:8080/api/vehiculos";


  constructor(private httpClient: HttpClient) { }

  //Metodo que nos retorna toda la lista de vehiculos
  getListaVehiculos():Observable<Vehiculo[]>  {
    return this.httpClient.get<Vehiculo[]>(`${this.baseURL}`);
  }

  //Metodo para actualizar un vehiculo
  updateVehiculo(id: number, vehiculo: Vehiculo): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, vehiculo);
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
  saveVehiculo(vehiculo : Vehiculo) : Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, vehiculo);
  }

}
