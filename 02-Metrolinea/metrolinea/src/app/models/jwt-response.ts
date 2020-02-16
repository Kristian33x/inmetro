export interface JwtResponseI {

    dataUser: {
        id: number;
        nombre: string,
        email: string,
        tipoUsuario: string,
        estado: boolean,
        accessToken: string,
        expiresIn: string,
    };
}
