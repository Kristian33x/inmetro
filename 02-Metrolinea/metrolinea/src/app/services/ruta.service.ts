import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ruta } from '../models/ruta';


@Injectable({
  providedIn: 'root'
})
export class RutaService {

  selectedRuta: Ruta;
  rutas: Ruta[];
  readonly URL_API = '/api/buses';

  constructor(private http: HttpClient) {
    this.selectedRuta = new Ruta();
  }

  getRuta() {
    return this.http.get(this.URL_API);
  }

  // tslint:disable-next-line:no-shadowed-variable
  postRuta(Ruta: Ruta) {
    return this.http.post(this.URL_API, Ruta);
  }

  putRuta(Ruta1: Ruta) {
    return this.http.put(this.URL_API + `/${ Ruta1._id }`, Ruta1);
  }

  // tslint:disable-next-line:variable-name
  deleteRuta(_id: string) {
    return this.http.delete(this.URL_API + `/${ _id }`);
  }
}
