import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../Class/marcador.class';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

 marcadores: Marcador[] = [];
 lat = 7.11392;
 lng = -73.1198;
 lat1;
 lng1;

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {

    // const nuevoMarcador = new Marcador(this.lat, this.lng);
    // this.marcadores.push(nuevoMarcador);
  //   if (navigator.geolocation) {
  //     navigator.geolocation.watchPosition( async ( datos ) => {
  //       // await console.log(datos.coords.latitude, 'asdasdasdasd3');
  //       // await console.log(datos.coords.longitude, 'asdasdasdasd4');
  //       this.lat1 = datos.coords.latitude;
  //       this.lng1 = datos.coords.longitude;
  //       console.log(this.lat1, ' ZZZZZZ ', this.lng1);

  //     },
  //      () => { console.log('No esta activado el gps'); });
  // } else {
  //   this.lat1 = 7.11392;
  //   this.lng1 = -73.1198;
  // }
    if (localStorage.getItem('marcadores')) {
        this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
  }

  ngOnInit() {
    console.log(this.lat, 'DDDDD');
  }

  moverMapa(evento) {
    console.log('it changed');
    this.lat = this.lat1;
    this.lng = this.lng1;
  }

  agregarMarcador(evento) {

    const coords: {lat: number, lng: number} = evento.coords;
    console.log(coords.lat, ' YYYYY ', coords.lng);
    // const nuevoMarcador = new Marcador(coords.lat, coords.lng);
    // this.marcadores.push(nuevoMarcador);
    this.guardarStorage();
  }

  guardarStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
    this.snackBar.open(' Marcador agregado ', 'Cerrar', {duration: 3000});
  }

  editarMarcador(marcador: Marcador): void {
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
    //  data: {nombre: marcador.nombre, ruta: marcador.ruta}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if ( !result ) {
        return;
      }
     // marcador.nombre = result.nombre;
      marcador.ruta = result.ruta;

      this.guardarStorage();
      this.snackBar.open(' Marcador actualizado ', 'Cerrar', {duration: 3000});
    });
  }


  borrarMarcador(i: number) {
    this.marcadores.splice( i , 1 );
    this.guardarStorage();
    this.snackBar.open(' Marcador borrado ', 'Cerrar', {duration: 3000});
  }
}
