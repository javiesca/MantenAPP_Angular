import { Image } from "./Image";

export class Vehiculo {
  idVehiculo:number;
  marca:String;
  modelo:String;
  fechaCompra!:String;
  image?:Image;
  matricula:String;
}
