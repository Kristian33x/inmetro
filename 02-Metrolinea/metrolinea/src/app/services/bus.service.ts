import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bus } from '../models/bus';


@Injectable({
  providedIn: 'root'
})
export class BusService {

  selectedBus: Bus;
  bus: Bus[];
  private buses: Bus[];
  readonly URL_API = '/api/conductores';

  constructor(private http: HttpClient) {
    this.selectedBus = new Bus();
    console.log('Servicio conductor listo para usarse');
  }

  getBus() {
    return this.http.get(this.URL_API);
  }

  // tslint:disable-next-line:no-shadowed-variable
  postBus(bus: Bus) {
    return this.http.post(this.URL_API, bus);
  }

  putBus(bus: Bus) {
    return this.http.put(this.URL_API + `/${ bus._id }`, bus);
  }

  // tslint:disable-next-line:variable-name
  deleteBus(_id: string) {
    return this.http.delete(this.URL_API + `/${ _id }`);
  }

  // ************************************************************

  // devuelve un array de buses
  getBuses2(): Bus[] {
    this.getBuses();
    return this.buses;
  }

  // Actualiza la variable local buses con los buses de la base de datos
  getBuses() {
    this.getBus()
    .subscribe(res => {
      this.buses = res as Bus[];
    });
  }

  // Obtener un Bus por la placa
  getBusByPlaca(termino: string) {
    for (let bus of this.buses) {
          bus = bus;
          if (bus.placa === termino) {
              return bus;
            }
      }
  }

  // Obtener un Bus por el ID
  // tslint:disable-next-line:variable-name
  getBusById(_id: string) {
    for (let bus of this.buses) {
          bus = bus;
          if (bus._id === _id) {
              return bus;
            }
      }
  }

  // Se utiliza en el buscador, obtiene un array con los buses que tengan el termino en su placa
  buscarBuses( termino: string) {
  let busesArr: Bus[] = [];
  busesArr = busesArr;
  termino = termino.toLowerCase();
  for ( let bus of this.buses) {
    bus = bus;
    let placa: string = bus.placa.toLowerCase();
    placa = placa;
    if (placa.indexOf(termino) >= 0) {

      busesArr.push(bus);
    }
  }
  return busesArr;
  }

  // devuelve un array con los buses asociados a un nombre de ruta
  busesPorRuta(nombreRuta: string): Bus[] {
    this.getBuses();
    const busesAsociadosRuta: Bus[] = [];
    for (const bus of this.buses) {
      if (bus.RutaAsociada.nombre === nombreRuta) {
        busesAsociadosRuta.push(bus);
      }
    }
    return busesAsociadosRuta;
  }

}
