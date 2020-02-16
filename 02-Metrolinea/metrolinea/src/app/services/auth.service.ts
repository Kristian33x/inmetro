import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserI } from '../models/user';
import { JwtResponseI } from '../models/jwt-response';
import {tap } from 'rxjs/operators';
import {Observable, BehaviorSubject} from 'rxjs';
import { BusService } from './bus.service';

@Injectable()
export class AuthService {
  // AUTH_SERVER = 'http://localhost:3000/user';
  // AUTH_SERVER2 = 'http://localhost:3000';
  AUTH_SERVER = '/user';
  AUTH_SERVER2 = '';
  authSubject = new BehaviorSubject(false);
  private token = '';
  id: any;

  selectedUser: UserI;
  userConductores: UserI[];
  Users: UserI[];


  constructor(private httpClient: HttpClient, private busService: BusService) {
    this.getUsers();
    this.busService.getBuses();
    this.selectedUser = new UserI();
  }

  // Obtiene todos los usuarios
  getUser() {
    return this.httpClient.get(this.AUTH_SERVER);
  }

  putUser(user: UserI) {
    return this.httpClient.put(this.AUTH_SERVER + `/${ user._id }`, user);
  }

  putEstadoUser(user: UserI) {
    return this.httpClient.put(this.AUTH_SERVER + `/estado/${ user._id }`, {estado: user.estado});
  }

  // tslint:disable-next-line:variable-name
  deleteUser(_id: string) {
    return this.httpClient.delete(this.AUTH_SERVER + `/${ _id }`);
  }

  // Crea usuarios
  register(user: UserI): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER2}/register`,
    user).pipe(tap(
      (res: JwtResponseI) => {
        if (res) {
          // Nada
        }
      }
    ));
  }

  // ********************************************************************************************
  // ********************************************************************************************
  // ********************************************************************************************
  // ********************************************************************************************

  // Obtener Users de la base de datos y guardarlos en la variable 'userConductores'
  // tambien podria decirse que este metodo actualiza la variable 'userConductores'
  getUsers() {
    this.getUser()
    .subscribe(res => {
      this.Users = res as UserI[];
      this.userConductores = this.getUsersConductores(res as UserI[]);
      // console.log(this.userConductores, 'getUsers');
      this.getSelectedUserByEmail();
    });
  }

  // devuelve un array de UserI de tipo Conductor
  getUsersConductores(users: UserI[]): UserI[] {
    const conductores: UserI[] = [];
    // console.log(users, 'XXX');
    for (let user of users) {
        user = user;
        if (user.tipoUsuario === 'Conductor') {
          conductores.push(user);
        }
    }
    // console.log(conductores, 'SSSS');
    this.userConductores = conductores;
    return this.userConductores;
  }

  // Obtener un UserI de tipo Conductor por el ID
  // tslint:disable-next-line:variable-name
  getUserIConductorById(_id: string) {
    for (let userConductor of this.userConductores) {
          userConductor = userConductor;
          if (userConductor._id === _id) {
              return userConductor;
          }
    }
  }

  // Se utiliza en el buscador, obtiene un array con los Conductores que tengan el termino en su nombre
  buscarConductores( termino: string) {
    let ConductorArr: UserI[] = [];
    ConductorArr = ConductorArr;
    termino = termino.toLowerCase();
    for ( let userConductor of this.userConductores) {
      userConductor = userConductor;
      let nombre: string = userConductor.nombre.toLowerCase();
      nombre = nombre;
      if (nombre.indexOf(termino) >= 0) {
        ConductorArr.push(userConductor);
      }
    }
    return ConductorArr;
  }

  // ********************************************************************************************
  // ********************************************************************************************
  // ********************************************************************************************
  // ********************************************************************************************


  login(user: UserI): Observable<JwtResponseI> {

    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER2}/login`,
    user).pipe(tap(
      (res: JwtResponseI) => {
        if (res) {
          user = this.getUserConductorbyEmail(user.email);
          user.estado = true; // Conectado
          this.selectedUser = user;
          this.actualizarConductorEnBuses(this.selectedUser);
          this.putEstadoUser(this.selectedUser).subscribe( res2 => {
            // console.log(res2, 'Usuario Activo');
          });
          // Guardar Token
          this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn, this.selectedUser.email);
        }
      }
    ));
    }

  // asigna el id para luego ser borrado en logout, es usado en conductorComponent.ts
  borrarWatchPosition(id: any) {
    this.id = id;
  }

  // Cierra la sesion de un usuario anteriormente logueado y cambia su estado a false
  logout(): void {
    this.getSelectedUserByEmail();
    this.selectedUser.estado = false; // Desconectado
    this.putEstadoUser(this.selectedUser).subscribe( res => {
      // console.log(res, 'Usuario Desconectado');
    });
    navigator.geolocation.clearWatch(this.id);
    this.actualizarConductorEnBuses(this.selectedUser, 0);
    this.selectedUser = new UserI();
    this.token = '';
    localStorage.removeItem('EMAIL');
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('EXPIRES_IN');
  }

  // Actualiza el estado del conductorAsociado a un bus a la hora de hacer login y logout
  actualizarConductorEnBuses(conductor: UserI, logout?: number) {
    // this.busService.getBuses();
    for (const bus1 of this.busService.getBuses2()) {
      if (bus1.ConductorAsociado._id === conductor._id) {
            bus1.ConductorAsociado = conductor;
            if (logout === 0) {
              bus1.latitud = 0;
              bus1.longitud = 0;
              bus1.sentido = 0;
            }
            this.busService.putBus(bus1)
            .subscribe(res => {
              this.busService.getBuses();
            });
      }
    }
  }

  // Al loguearse un usuario se crean diferentes datos en el localStorage para controlar el cierre de sesion automatico (aun no funciona)
  private saveToken( token: string, expiresIn: string, email: string): void {
    localStorage.setItem('EMAIL', email);
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('EXPIRES_IN', expiresIn);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('ACCESS_TOKEN');
    }
    return this.token;
  }

  // Se utiliza para saber que usuario es el que esta logueado, se utiliza porque al refrescar la pagina se pierde este usuario
  private getSelectedUserByEmail() {
    if (localStorage.getItem('EMAIL')) {
      this.selectedUser = this.getUserConductorbyEmail(localStorage.getItem('EMAIL'));
    }
  }

  // Devuelve el usuario logueado
  getUserLogueado(): UserI {
    // this.getSelectedUserByEmail();
    return this.selectedUser;
  }

  // Obterner un usuario por el email (Tambien es usado para administradores)
  private getUserConductorbyEmail(termino: string) {
    for (let userConductor of this.Users) {
      userConductor = userConductor;
      if (userConductor.email === termino) {
        return userConductor;
      }
    }
  }

  // Con este metodo sabemos si el usuario logueado se encuentra activo
  estaAutenticadoUnAdministrador(): boolean {
    // this.getToken();
    // if (localStorage.getItem('ACCESS_TOKEN')) {
    //   return this.token.length > 2;
    // } else { return false; }
    let esAdmin = false;
    if (localStorage.getItem('EMAIL')) {
    // this.getSelectedUserByEmail();
    if (this.getUserConductorbyEmail(this.selectedUser.email)) {
      for (const conductor of this.userConductores) {
        if (conductor.email === this.selectedUser.email) {
          return false; // Es Conductor
        } else  { esAdmin = true; } // Es Administrador
      }
    }
  }
    return esAdmin;
  }

  estaAutenticadoUnConductor(): boolean {

    let esCondu = false;
    if (localStorage.getItem('EMAIL')) {
    // this.getSelectedUserByEmail();
    for (const conductor of this.userConductores) {
      if (conductor.email === this.selectedUser.email) {
        return true; // Es Conductor
      } else  {esCondu = false; } // Es Administrador o no existe
    }
  }
    return esCondu;
  }

  // Oculta las diferentes funciones dependiendo del tipo de usuario logueado o invitado
  administrador() {
    if ( this.estaAutenticadoUnAdministrador() ) {
      document.getElementById('ocultar1').style.display = 'inline';
      document.getElementById('ocultar2').style.display = 'inline';
      document.getElementById('ocultar3').style.display = 'inline';
      document.getElementById('ocultar4').style.display = 'none';
      document.getElementById('ocultar5').style.display = 'none';
      document.getElementById('ocultar6').style.display = 'inline';
    } else {
            document.getElementById('ocultar1').style.display = 'none';
            document.getElementById('ocultar2').style.display = 'none';
            document.getElementById('ocultar3').style.display = 'none';
            document.getElementById('ocultar5').style.display = 'none';
            document.getElementById('ocultar6').style.display = 'none';
            document.getElementById('ocultar4').style.display = 'inline';
            }
    this.conductor();
  }

  conductor() {
    if (this.estaAutenticadoUnConductor()) {
      document.getElementById('ocultar3').style.display = 'inline';
      document.getElementById('ocultar4').style.display = 'none';
      document.getElementById('ocultar5').style.display = 'inline';
      document.getElementById('ocultar6').style.display = 'inline';
    } else {
            document.getElementById('ocultar5').style.display = 'none';
            }
  }

}
