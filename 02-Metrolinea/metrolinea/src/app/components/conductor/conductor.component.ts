import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BusService } from 'src/app/services/bus.service';
import { Bus } from 'src/app/models/bus';

declare var M: any;

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.css']
})
export class ConductorComponent implements OnInit {

  busAsociadoConductor = new Bus();
  id: any;
  constructor(public auth: AuthService, public busService: BusService) {}

  ngOnInit() {
    document.getElementById('noMostrarPosicion').style.display = 'none';
    document.getElementById('mostrarPosicion').style.display = 'inline';
    this.busService.getBus().
    subscribe(res => {
      this.busService.getBuses();

      this.auth.getUser()
      .subscribe(res1 => {
        this.auth.getUsers();
        this.encontrarBusConductor( res as Bus[]);
      });
  });
  }

  // Busca el bus Asignado al conductor y lo muestra en conductor.html
  encontrarBusConductor(buses: Bus[]) {
    for (const bus of buses) {
      if (this.auth.getUserLogueado().email === bus.ConductorAsociado.email) {
        this.busAsociadoConductor = bus;
      }
    }
    // console.log(this.busAsociadoConductor);
  }

  // Actualiza el id en authService para que pueda ser eliminado el watchPosition al hacer logout
  eliminarPosicion() {
    this.auth.id = this.id;
    this.auth.borrarWatchPosition(this.id);
  }

// borra el warchPosition mediante un boton y deja de mostrar y actualizar la posicion
  noMostrarPosicion() {
    document.getElementById('noMostrarPosicion').style.display = 'none';
    document.getElementById('mostrarPosicion').style.display = 'inline';
    navigator.geolocation.clearWatch(this.id);
    this.reiniciarPosicion();
  }

  reiniciarPosicion() {
    this.busAsociadoConductor.latitud = 0;
    this.busAsociadoConductor.longitud = 0;
    this.busAsociadoConductor.sentido = 0;
    this.actualizarPosicionEnBaseDeDatos();
  }

  // muestra y actualiza la posicion del conductor en la base de datos
  mostrarPosicion() {
    document.getElementById('noMostrarPosicion').style.display = 'inline';
    document.getElementById('mostrarPosicion').style.display = 'none';

    if (this.auth.getUserLogueado().tipoUsuario === 'Conductor') {
      if (navigator.geolocation) {
        this.id = navigator.geolocation.watchPosition(datos => {
          this.eliminarPosicion();
          if (this.busAsociadoConductor.latitud !==  datos.coords.latitude || this.busAsociadoConductor.longitud !==  datos.coords.longitude
           || this.busAsociadoConductor.sentido !== datos.coords.heading) {

          this.busAsociadoConductor.latitud =  datos.coords.latitude;
          this.busAsociadoConductor.longitud =  datos.coords.longitude;
          this.busAsociadoConductor.sentido = datos.coords.heading;

          this.actualizarPosicionEnBaseDeDatos();
           }
      }, () => { console.log('No esta activado el gps'); M.toast({html: 'No esta activado el gps'});  });
      } else {
              this.reiniciarPosicion();
             }
    }

  }

  // Actualiza la posicion en base de datos
  actualizarPosicionEnBaseDeDatos() {
    this.busService.putBus(this.busAsociadoConductor).subscribe(res => {
      M.toast({html: 'Posicion actualizada satisfactoriamente'});
      this.busService.getBuses();
    });
  }

}
