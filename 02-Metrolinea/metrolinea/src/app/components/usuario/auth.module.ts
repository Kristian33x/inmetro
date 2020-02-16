import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Rutas

// Componentes
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// maps
import { AgmCoreModule } from '@agm/core';



@NgModule({
  entryComponents: [
  ],
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
})
export class AppModule { }
