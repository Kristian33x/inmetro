import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjeta-bus',
  templateUrl: './tarjeta-bus.component.html'
})
export class TarjetaBusComponent implements OnInit {

  @Input() ruta: any = { };
  @Input() termino: string;

  constructor( private router: Router) { }

  ngOnInit() {
  }

  verRuta() {
    this.router.navigate(['/bus', this.termino]);
  }

}
