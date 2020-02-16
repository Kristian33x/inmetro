
import { Injectable } from '@angular/core';
import { Ruta } from '../models/ruta';
import { RutaService } from './ruta.service';

@Injectable()
export class RutasService {

  private rutas: Ruta[];

    // private buses: Bus[] = [
    //     {
    //       _id: '1',
    //       nombre: 'P10',
    //       bio:  'Lorem ipsum dolor sit, ametmus quas alias.',
    //       img: 'assets/img/P10.png',
    //       aparicion: '2012-01-01',
    //       casa: 'assets/img/padron.png'
    //     },
    //     {
    //       _id: '1',
    //       nombre: 'AB2',
    //       bio: 'Lorem ipsum dolorum inventore debitis libero, non id voluptas accusantium consequuntur nesciunt',
    //       img: 'assets/img/AB2.png',
    //       aparicion: '2012-01-01',
    //       casa: 'assets/img/alimentador.png'
    //     },
    //     {
    //       _id: '1',
    //       nombre: 'P13',
    //       bio: 'Lorem ipsum, non id voluptas accusantium consequuntur nesciunt incidunt possimus blanditiis',
    //       img: 'assets/img/P13.png',
    //       aparicion: '2010-01-01',
    //       casa: 'assets/img/padron.png'
    //     },
    //     {
    //       _id: '1',
    //       nombre: 'T1',
    //       bio: 'Lorem ipsum dolor, earum inventoidunt possimus blanditiis molestias accusamus',
    //       img: 'assets/img/T1.png',
    //       aparicion: '2013-01-01',
    //       casa: 'assets/img/articulado.png'
    //     },
    //     {
    //       _id: '1',
    //       nombre: 'AB1',
    //       bio: 'Lo earum inventore debitis libero, non id voluptas accusantium consequuntur nesciunt incidu',
    //       img: 'assets/img/AB1.png',
    //       aparicion: '2013-01-01',
    //       casa: 'assets/img/alimentador.png'
    //     },
    //     {
    //       _id: '1',
    //       nombre: 'P8',
    //       bio: 'Lorem um invi adipisicing elit. Recusandae veniam excepturi quidem quasi, earum inventore de',
    //       img: 'assets/img/P8.png',
    //       aparicion: '2015-01-01',
    //       casa: 'assets/img/articulado.png'
    //     },
    //     {
    //       _id: '1',
    //       nombre: 'T3',
    //       bio: 'Loren id voluptas accusantium consequuntur nesciunt incidunt possimus blanditiis molestias accusamus quas alias.',
    //       img: 'assets/img/T3.png',
    //       aparicion: '2015-01-01',
    //       casa: 'assets/img/padron.png'
    //     }
    //   ];

  constructor(public rutaService: RutaService) {
      console.log('Servicio listo para usarse');
  }

  // Actualiza la variable 'buses' y retorna este array
  getRutas2(): Ruta[] {
      this.getRutas();
      return this.rutas;
  }

  // Obtener buses de la base de datos y guardarlos en la variable 'buses'
  // tambien podria decirse que este metodo actualiza la variable 'buses'
  getRutas() {
    this.rutaService.getRuta()
    .subscribe(res => {
      // this.busService.buses = res as Bus[];
      this.rutas = res as Ruta[];
    });
  }

  // Obtiene las rutas dependiendo del tipo de bus que tengan (padron, articulado o alimentador)
  getRutasByTipoBus(tipoRuta: string): Ruta[] {
    const rutasPorTipo: Ruta[] = [];
    if (this.rutas !== null) {
    for (const ruta of this.rutas) {
      if (ruta.imagenTipoBus === tipoRuta) {
        rutasPorTipo.push(ruta);
      }
    }
  }
    return rutasPorTipo;
  }

  // Obtener un bus por nombre
  getRuta(termino: string) {
    for (let ruta of this.rutas) {
      ruta = ruta;
      if (ruta.nombre === termino) {
        return ruta;
      }
    }
  }

  // tslint:disable-next-line:variable-name
  getRutaById(_id: string) {
    for (let ruta of this.rutas) {
      ruta = ruta;
      if (ruta._id === _id) {
        return ruta;
      }
    }
  }

  // Obtener lista de buses por nombre.. se usa en filtrar
  buscarRutas( termino: string) {
    let RutasArr: Ruta[] = [];
    RutasArr = RutasArr;
    termino = termino.toLowerCase();
    for ( let bus of this.rutas) {
      bus = bus;
      let nombre: string = bus.nombre.toLowerCase();
      nombre = nombre;
      if (nombre.indexOf(termino) >= 0) {

        RutasArr.push(bus);
        // console.log(busesArr);
      }
    }
    return RutasArr;
  }

}

//     export interface Bus {
//           nombre: string;
//           bio: string;
//           img: string;
//           aparicion: string;
//           casa: string;
// }
