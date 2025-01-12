import { Vehiculo } from "./vehiculo";

export class Seguro {
    idSeguro: number;
    nombreSeguro: string;
    precio: number;
    modoSeguro: string;
    fechaInicio: Date;
    fechaFin: Date;
    vehiculo: Vehiculo;
}