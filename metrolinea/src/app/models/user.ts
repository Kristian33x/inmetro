export class UserI {

    // tslint:disable-next-line:variable-name
    constructor(_id = '', nombre = '', email = '', contrasena = '', tipoUsuario = '', estado = false) {

        this._id = _id;
        this.nombre = nombre;
        this.email = email;
        this.contrasena = contrasena;
        this.tipoUsuario = tipoUsuario;
        this.estado = estado;

    }
    // tslint:disable-next-line:variable-name
    _id: string;
    nombre: string;
    email: string;
    contrasena: string;
    tipoUsuario: string;
    estado: boolean;
}
