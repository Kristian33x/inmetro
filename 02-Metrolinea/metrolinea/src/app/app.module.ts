import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Rutas
import {APP_ROUTING} from './app.routes';

// Servicios
import { RutasService } from './services/rutas.service';
import { AuthService } from './services/auth.service';

// Componentes
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

// maps
import { AgmCoreModule } from '@agm/core';
import { MapaComponent } from './components/mapa/mapa.component';
import { MapaEditarComponent } from './components/mapa/mapa-editar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Mapa2Component } from './components/mapa2/mapa2.component';
import { EditBusesComponent } from './components/edit-buses/edit-buses.component';
import { BusComponent } from './components/bus/bus.component';
import { BusesComponent } from './components/buses/buses.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { TarjetaBusComponent } from './components/tarjeta-bus/tarjeta-bus.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { RegisterComponent } from './components/usuario/register/register.component';
import { ConductorComponent } from './components/conductor/conductor.component';
import { LoginComponent } from './components/usuario/login/login.component';



@NgModule({
  entryComponents: [
    MapaEditarComponent
  ],
  declarations: [
    AppComponent,
    MapaComponent,
    MapaEditarComponent,
    Mapa2Component,
    EditBusesComponent,
    BusComponent,
    BusesComponent,
    HomeComponent,
    SearchComponent,
    TarjetaBusComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ConductorComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDVC3W4TABNrGYhCq8fRR81Et4uFkoTh08'
    })
  ],
  providers: [
    RutasService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
