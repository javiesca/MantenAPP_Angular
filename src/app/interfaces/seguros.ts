import { Vehiculo } from "./vehiculo";

export class Seguro {
    idSeguro: number;
    nombreSeguro: string;
    precio: number;
    modoSeguro: string;
    fechaInicio!: string;
    fechaFin!: string;
    notas: string;
    vehiculo: Vehiculo;
}