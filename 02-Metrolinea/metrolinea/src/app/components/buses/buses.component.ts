import { Component, OnInit } from '@angular/core';
import { RutasService } from '../../services/rutas.service';
import { Router } from '@angular/router';
import {Ruta} from '../../models/ruta';
import { RutaService } from '../../services/ruta.service';

@Component({
  selector: 'app-buses',
  templateUrl: './buses.component.html',
  styles: []
})
export class BusesComponent implements OnInit {

   rutas: Ruta[] = [];

  constructor(public rutaService: RutaService , public rutasServices: RutasService, private router: Router) {
  }

  ngOnInit() {
     this.rutas = this.rutasServices.getRutas2();
     this.getRutas();
  }


  // No es lo ideal pero aqui funciona.
  getRutas() {
    this.rutaService.getRuta()
    .subscribe(res => {
      // this.busService.buses = res as Bus[];
      this.rutas = res as Ruta[];
    });
  }

  // tslint:disable-next-line:one-line
  // verBus(idx: number){
  //   this.router.navigate(['/bus', idx]);
  // }

}

