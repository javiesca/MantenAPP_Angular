import { Vehiculo } from "./vehiculo";

export class Ruedas {
  idRuedas: number;
  numeroRuedas: number;
  marca: string;
  fechaCambio!: string;
  kilometros: number;
  precio: number;
  vehiculo : Vehiculo;
}
