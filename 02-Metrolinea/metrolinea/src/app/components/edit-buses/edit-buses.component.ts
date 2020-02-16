import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ruta } from 'src/app/models/ruta';
import { RutaService } from '../../services/ruta.service';
import { RutasService } from '../../services/rutas.service';
import { BusService } from '../../services/bus.service';
import { Bus } from 'src/app/models/bus';
import { AuthService } from '../../services/auth.service';
import { UserI } from 'src/app/models/user';
import { MapaEditarComponent } from '../mapa/mapa-editar.component';
import { MatDialog } from '@angular/material/dialog';

declare var M: any;

@Component({
  selector: 'app-edit-buses',
  templateUrl: './edit-buses.component.html',
  styleUrls: ['./edit-buses.component.css'],
  providers: [RutaService, BusService, AuthService]
})
export class EditBusesComponent implements OnInit {

  selectedRuta1 = new Ruta();
  selectedRutas1: Ruta[] = [];
  selectedRutas2: Ruta[] = [];

  selectedBus1 = new Bus();
  selectedBuses1: Bus[] = [];

  selectedConductor1 = new UserI();
  selectedConductores1: UserI[] = [];
  conductoresSinBus: UserI[] = [];


  constructor(public rutaService: RutaService, public rutasService: RutasService,
              public busesService: BusService, public authService: AuthService,
              public dialog: MatDialog) {}

// this.snackBar.open(' Marcador actualizado ', 'Cerrar', {duration: 3000}); mirar que hace esto
  ngOnInit() {
    this.getRutas();
    this.rutasService.getRutas();

    this.getBuses();
    this.busesService.getBuses();

    this.getConductores();
    this.authService.getUsers();
  }

  getRutasByTipoBus(tipoBus: string) {
    this.selectedRutas2 = this.rutasService.getRutasByTipoBus(tipoBus);
  }

 buscarRuta(buscarTexto: string) {
     this.selectedRutas1 = this.rutasService.buscarRutas(buscarTexto);
   }

  addRuta(form: NgForm) {

    form.value.imagenBus = `assets/img/${form.value.nombre}.png `;

    // console.log(form.value);

    if (form.value._id) {
        // console.log('Paso 1', form.value);
        this.rutaService.putRuta(form.value)
        .subscribe(res => {
          this.actualizarRutaEnBuses(form.value);
          // this.resetForm(form);
          M.toast({html: 'Bus actualizado satisfactoriamente'});
          this.getRutas();
      });
    } else {
        // console.log('Paso 1.1', form.value);
        form.value.NumBusesAsociados = 0;
        this.rutaService.postRuta(form.value)
        .subscribe(res => {
          // console.log(form.value, 'XXXXXX');
          // console.log('Paso 2.1');
          // this.resetForm(form);
          M.toast({html: 'Guardado satisfactoriamente'});
          this.getRutas();
  });
  }
}

addRuta2(bus: Ruta) {

  // this.actualizarBusEnConductores(bus);
  if (bus._id) {

    this.rutaService.putRuta(bus)
    .subscribe(res => {
      this.actualizarRutaEnBuses(bus);
      M.toast({html: 'bus2 actualizado satisfactoriamente'});
      this.getRutas();
    });
  }
}

  getRutas() {
    this.rutasService.getRutas();
    this.rutaService.getRuta()
    .subscribe(res => {
      this.rutaService.rutas = res as Ruta[];
      this.selectedRutas1 = res as Ruta[];
     // console.log(res, 'yyyyyyyyyyy');
    });
  }

  editRuta(bus: Ruta) {
    this.getRutas();
    this.rutaService.selectedRuta = bus;
    this.selectedRuta1 = bus;
  }

  // tslint:disable-next-line:variable-name
  deleteRuta(_id: string) {
    // No permitir eliminar un bus si este tiene conductores asociados
    this.selectedRuta1 = this.rutasService.getRutaById(_id);
    if (this.selectedRuta1.NumBusesAsociados === 0 || this.selectedRuta1.NumBusesAsociados === null) {

    this.rutaService.deleteRuta(_id)
    .subscribe(res => {
      this.getRutas();
      M.toast({html: 'Eliminado satisfactoriamente'});
    });
    this.selectedRuta1 = new Ruta();
  } else { console.log('El bus tiene conductores asociados'); }
  }

  resetForm(form?: NgForm) {

    if (form) {
      form.reset();
      this.rutaService.selectedRuta = new Ruta();
      // console.log(this.selectedBus1, 'RRRRR');
    }
    this.getRutas();
  }

  resetForm2(form?: NgForm) {

    if (form) {
      form.reset();
      this.selectedRuta1 = new Ruta();
    }
  }


 // ********************************************************************************************************************************
 // ********************************************************************************************************************************
 // ********************************************************************************************************************************
 // ********************************************************************************************************************************

  // Es utilizado en el buscador de buses por nombre
  buscarBus(buscarTexto: string) {
     this.selectedBuses1 = this.busesService.buscarBuses(buscarTexto);
   }

  // Crea un nuevo bus o edita uno existente en base de datos
  addBus(form: NgForm) {

    // el formulario siempre envia null a estos parametros, por ende esta es una solucion a ese problema
    form.value.latitud = 0;
    form.value.longitud = 0;
    form.value.sentido = 0;

    if (form.value._id) {
      // form.value.posicion = {
      //   lat: 1 , lng: 2, nombre: form.value.nombre, ruta: form.value.bio
      // };
      this.busesService.putBus(form.value)
      .subscribe(res => {
        // this.resetForm1(form);
        M.toast({html: 'Bus actualizado satisfactoriamente'});
        this.getBuses();
      });
    } else {
      this.busesService.postBus(form.value)
      .subscribe(res => {
        // this.resetForm1(form);
        M.toast({html: 'Guardado satisfactoriamente'});
        this.getBuses();
    });
  }
}

  // Obtiene los buses de la base de datos y actualiza las variables busesService.bus y selectedBuses1 con estos
  getBuses() {
    this.busesService.getBuses();
    this.busesService.getBus()
    .subscribe(res => {
      this.busesService.bus = res as Bus[];
      this.selectedBuses1 = res as Bus[];
      // console.log(this.selectedConductores1, 'yyyyyyyyyyy');
    });
  }

  // no edita buses, recive el bus que va a ser editado o eliminado
  editBus(bus: Bus) {
    this.getBuses();
    this.busesService.selectedBus = bus;
    this.selectedBus1 = bus;
    // console.log(conductor, 'XXXXXXXXXXX');
  }

  // tslint:disable-next-line:variable-name
  deleteBus(_id: string) {
    // Actualiza el numero de conductores asociados a la ruta del conductor a eliminar
    this.selectedBus1 = this.busesService.getBusById(_id);
    this.selectedBus1.RutaAsociada.NumBusesAsociados -= 1;
    this.addRuta2(this.selectedBus1.RutaAsociada);
    // Elimina el conductor
    this.busesService.deleteBus(_id)
    .subscribe(res => {
      this.getBuses();
      M.toast({html: 'Bus Eliminado satisfactoriamente'});
    });
    this.selectedBus1 = new Bus();
  }

  resetForm1(form?: NgForm) {

    if (form) {
      form.reset();
      this.busesService.selectedBus = new Bus();
      this.selectedBus1 = new Bus();
    }
    this.getBuses();
  }

  // Permite asociar una Ruta a un bus, ademas actualiza el numero de buses asociados a una ruta
  asignarRutaBus(form: NgForm) {
    // esto es un form que se convierte en Ruta y es la nueva ruta para el bus y selectedBus1.rutaAsociada es la ruta actual
    this.selectedRuta1 = form.value.ruta;
    if (form.value.ruta === '' || form.value.ruta === null) { this.selectedRuta1 = new Ruta(); }

    // this.selectedBus1.arrayBuses = '';
    if (this.selectedBus1.RutaAsociada._id === this.selectedRuta1._id) {
      console.log('No hacer nada porque no se esta cambiando el bus');
      // this.selectedBus1.NumBusesAsociados = 0;
      // this.addBus2(this.selectedBus1);
    } else {
      if (form.value.ruta !== '' && form.value.ruta !== null) {
        this.selectedRuta1.NumBusesAsociados += 1;
        this.addRuta2(this.selectedRuta1);
      }
      // this.actualizarBusEnConductores(this.selectedBus1, 'x1');

      this.selectedBus1.RutaAsociada.NumBusesAsociados += -1;
      this.addRuta2(this.selectedBus1.RutaAsociada);
      // this.actualizarBusEnConductores(this.selectedConductor1.RutaAsociada, 'x2');
      // console.log(this.selectedConductor1.RutaAsociada, '11111xxxx');
      // this.getBuses();

      // console.log(this.selectedBus1, '22222xxxxx');
      this.selectedBus1.RutaAsociada = this.selectedRuta1;
      // console.log(this.selectedBus1 );
      this.addBus2(this.selectedBus1);
            }
  }

  // Permite asociar un Conductor a un bus
  asignarConductorBus(form: NgForm) {
    // esto es un form que se convierte en UserI y es el nuevo Conductor para el bus y selectedBus1.ConductorAsociado es el Conductor actual
    this.selectedConductor1 = form.value.conductor;
    if (form.value.conductor === '' || form.value.conductor === null) { this.selectedConductor1 = new UserI(); }

    if (this.selectedBus1.ConductorAsociado._id === this.selectedConductor1._id) {
      console.log('No hacer nada porque no se esta cambiando el Conductor');
    } else {
      this.selectedBus1.ConductorAsociado = this.selectedConductor1;
      this.addBus2(this.selectedBus1);
            }
  }

  addBus2(bus: Bus) {
    this.getBuses();
    if (bus._id) {
      this.busesService.putBus(bus)
        .subscribe(res => {
          this.getBuses();
        });
    }
  }


  actualizarRutaEnBuses(ruta: Ruta) {
    this.getBuses();
    // tslint:disable-next-line:prefer-const
    for (let bus1 of this.selectedBuses1) {
        if (bus1.RutaAsociada._id === ruta._id) {
            if (this.selectedBus1._id !== bus1._id) {
                // console.log(conductor.placa, ' tiene ', conductor.RutaAsociada.nombre);
                bus1.RutaAsociada = ruta;
                // console.log(conductor.placa, ' fue actualizado con ', conductor.RutaAsociada.nombre);
                this.addBus2(bus1);
            }
        }
    }

    // for (let conductor of this.selectedConductores1) {
    //   for (let bus1 of this.selectedBuses1) {
    //       if (conductor.RutaAsociada._id === bus1._id) {
    //         conductor.RutaAsociada = bus1;
    //         this.addConductor2(conductor);
    //       }
    //   }
    // }
  }

  // Al hacer un cambio en un conductor este metodo actualiza esos cambios en el bus asociado al conductor
  actualizarConductorEnBuses(conductor: UserI) {
    this.getBuses();
    for (const bus1 of this.selectedBuses1) {
        if (bus1.ConductorAsociado._id === conductor._id) {
                bus1.ConductorAsociado = conductor;
                this.addBus2(bus1);
        }
    }
  }

  // ********************************************************************************************************************************
  // ********************************************************************************************************************************
  // ********************************************************************************************************************************
  // ********************************************************************************************************************************


  // Es utilizado en el buscador de buses por nombre
  buscarConductor(buscarTexto: string) {
    this.selectedConductores1 = this.authService.buscarConductores(buscarTexto);
  }

  // Edita un Conductor existente en base de datos
  // por precaucion de debe arreglar en el html que solo permita editar un usuario mientras el estado sea false*****
  // (al parecer arreglado .. er unproblema de restForm innecesario)
  addConductor(form: NgForm) {
    // form.value.estado = false;
    if (form.value._id) {
      this.authService.putUser(form.value)
      .subscribe(res => {
      this.actualizarConductorEnBuses(form.value);
      // this.resetForm3(form);
      M.toast({html: 'Conductor actualizado satisfactoriamente'});
      this.getConductores();
     });
   }
  }

 // Obtiene los Conductores de la base de datos y actualiza las variables selectedConductores1 con estos
  getConductores() {
    this.authService.getUsers();
    this.authService.getUser()
    .subscribe(res => {
      this.selectedConductores1 = this.authService.getUsersConductores( res as UserI[]);
      this.authService.userConductores = this.selectedConductores1;
      this.getConductoresSinBus();
    });
  }

  // Obtiene los conductores que aun no han sido asociados a un bus
  getConductoresSinBus() {
    this.conductoresSinBus = [];
    let tieneBus: boolean;
    for (const conductor of this.selectedConductores1) {
      tieneBus = false;
      for (const bus of this.selectedBuses1) {
        if (conductor.email === bus.ConductorAsociado.email) {
          tieneBus = true;
        }
      }
      if (tieneBus === false ) { this.conductoresSinBus.push(conductor); }
    }
  }

 // no edita conductores, recibe el conductor que va a ser editado o eliminado
  editConductor(conductor: UserI) {
    this.getConductores();
    // this.authService.selectedUser = conductor;
    this.selectedConductor1 = conductor;
  }

 // tslint:disable-next-line:variable-name
  deleteConductor(_id: string) {

    // this.selectedConductor1 = this.authService.getUserIConductorById(_id);
    // Elimina un conductor
    let sePuedeEliminar = false;
    for (const conductor of this.conductoresSinBus) {
      if (conductor._id === _id) { sePuedeEliminar = true; }
    }
    if (sePuedeEliminar) {
      this.authService.deleteUser(_id)
      .subscribe(res => {
        this.getConductores();
        M.toast({html: 'Conductor Eliminado satisfactoriamente'});
      });
      this.selectedConductor1 = new UserI();
    } else { console.log('No se puede eliminar, primero debe desvicularlo del bus'); }
  }

  resetForm3(form?: NgForm) {

    if (form) {
      form.reset();
      this.selectedConductor1 = new UserI();
    }
    this.getConductores();
  }

  // edita un conductor pero recibiendo como parametro ese conductor y no un NgForm
  addConductor2(conductor: UserI) {
    this.getConductores();
    if (conductor._id) {
      this.authService.putUser(conductor)
        .subscribe(res => {
         this.actualizarConductorEnBuses(conductor);
         this.getConductores();
       });
    }
  }


  CuadroDialogo1(): void {
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '450px',
      data: {placa: this.selectedBus1.placa, ruta: this.selectedBus1.RutaAsociada}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // aqui podemos actuliazar la posicion del bus cada vez que sea cerrado el dialogo
      // this.snackBar.open(' Marcador actualizado ', 'Cerrar', {duration: 3000});
    });
  }


}
