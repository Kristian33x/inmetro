import { Ruta } from 'src/app/models/ruta';
import { UserI2 } from './user2';
// esta clase es llamada conductor pero hace referencia a Bus.. que por errores a la hora del diseno se
// nombr[o conductor.. se debe cambiar a bus al final.
export class Bus {

    // tslint:disable-next-line:variable-name
    constructor(_id = '', placa  = '', tipoBus = '', ConductorAsociado = new UserI2(), RutaAsociada = new Ruta(),
                longitud = 0, latitud = 0, sentido = 0 ) {
        this._id = _id;
        // this.nombre = nombre;
        // this.email = email;
        // this.contrasena = contrasena;
        this.placa = placa;
        this.tipoBus = tipoBus;
        this.RutaAsociada = RutaAsociada;
        this.ConductorAsociado = ConductorAsociado;
        this.longitud = longitud;
        this.latitud = latitud;
        this.sentido = sentido;
    }

    // tslint:disable-next-line:variable-name
    _id: string;
    placa: string;
    tipoBus: string;
    RutaAsociada: Ruta;
    ConductorAsociado: UserI2;
    longitud: number;
    latitud: number;
    sentido: number;
}
