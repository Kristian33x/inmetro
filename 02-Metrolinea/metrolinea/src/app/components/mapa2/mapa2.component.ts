import { Component, OnInit } from '@angular/core';
import {} from 'googlemaps';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-mapa2',
  templateUrl: './mapa2.component.html',
  styleUrls: ['./mapa2.component.css']
})



export class Mapa2Component implements OnInit {

  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;
  constructor() { }

  lat;
  lng;


  async ngOnInit(): Promise<void> {
    await this.posicion();
 }

 async posicion() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (datos) => {
      // console.log( await datos.coords.latitude, 'asdasdasdasd3');
      // console.log( await datos.coords.longitude, 'asdasdasdasd4');
      this.lat = await datos.coords.latitude;
      this.lng = await datos.coords.longitude;
      console.log(this.lat, ' @@@@@@@ ', this.lng);
      const mapProperties = {
        center: new google.maps.LatLng(this.lat, this.lng),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(7.1315202 , -73.123147),
        icon: 'assets/bus-solid.svg',
        map: this.map
      });
    }, () => { console.log('No esta activado el gps'); });
} else {
  this.lat = 7.11392;
  this.lng = -73.1198;
}
  console.log(this.lat, ' @@@@@@@2 ', this.lng);
  // if (localStorage.getItem('marcadores')) {
  //     this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
  // }
 }



}
