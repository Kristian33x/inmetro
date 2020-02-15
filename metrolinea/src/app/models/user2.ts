export class UserI2 {

    // tslint:disable-next-line:variable-name
    constructor(_id = '', nombre = '', email = '', tipoUsuario = '', estado = false) {

        this._id = _id;
        this.nombre = nombre;
        this.email = email;
        this.tipoUsuario = tipoUsuario;
        this.estado = estado;

    }
    // tslint:disable-next-line:variable-name
    _id: string;
    nombre: string;
    email: string;
    tipoUsuario: string;
    estado: boolean;
}
