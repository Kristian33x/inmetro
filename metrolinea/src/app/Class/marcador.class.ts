import { Bus } from 'src/app/models/bus';
import { Ruta } from '../models/ruta';


export class Marcador {
    public latitud: number;
    public longitud: number;
    public sentido: number;

    public placa: string;
    public ruta: Ruta;

    constructor(bus: Bus) {
        this.placa = bus.placa;
        this.ruta = bus.RutaAsociada;
        this.latitud = bus.latitud;
        this.longitud = bus.longitud;
        this.sentido = bus.sentido;
    }
}
