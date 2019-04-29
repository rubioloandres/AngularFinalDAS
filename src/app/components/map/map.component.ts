import { Component, OnInit, AfterViewInit, Inject} from '@angular/core';
import { Coordenadas, MapData } from 'src/app/interfaces/ubicacion';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SucursalesComponent } from '../sucursales/sucursales.component';

declare var L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  ubicacion: Coordenadas[];
  constructor(
    public dialogRef: MatDialogRef<SucursalesComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: SucursalInfo) { }
    @Inject(MAT_DIALOG_DATA) public data: MapData
   ) { }

  loadUbicacion() {
    this.ubicacion = JSON.parse(localStorage.getItem('posicion'));
    console.log(this.ubicacion);
  }

  loadMap() {
    let arrCoord;
    console.log(this.data);
    if (this.data !== undefined) {
      console.log('no es undef');
      arrCoord = [this.data.latitud, this.data.longitud];
    } else {
    arrCoord = [this.ubicacion[0].latitud, this.ubicacion[0].longitud];
    }
    const map = L.map('map').setView(arrCoord, this.data.precision);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    // L.marker([this.data.latitud, this.data.longitud])
    const markerText = '<h2 style="color:DodgerBlue;">'
                     +   this.data.nombreUbicacion
                     + '</h2>'
                     + '<h4 style="color:grey;">'
                     +   this.data.direccion
                     + '</h4>';
    L.marker(arrCoord)
     .addTo(map).bindPopup(markerText)
     .openPopup();
  }

  ngOnInit() {
      this.loadUbicacion();
      this.loadMap();
  }
}
