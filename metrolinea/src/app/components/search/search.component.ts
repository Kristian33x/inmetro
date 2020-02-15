import { Component, OnInit } from '@angular/core';
import { RutasService } from '../../services/rutas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  rutasSearch: any[] = [];
  termino: string ;

  constructor(private activatedRoute: ActivatedRoute,
              private rutasServices: RutasService,
              private router: Router) {}

  ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
          this.rutasSearch = this.rutasServices.buscarRutas( params.termino);
          this.termino = params.termino;
        } );
        }

        irRutas() {
          this.router.navigate(['/buses']);
        }
}
