import { Injectable  } from '@angular/core';
import { Coordenadas } from '../interfaces/ubicacion';
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

let lat = 0;
let lng = 0;
let pre = 0;

@Injectable()
export class GeoLocationService {

  ubicacion: Coordenadas [] = new Array();
  success(pos: any) {
    const crd = pos.coords;
    lat = crd.latitude;
    lng = crd.longitude;
    pre = crd.accuracy;
    this.ubicacion = [{latitud: lat, longitud: lng, precision: pre }];
    return this.ubicacion;
  }

  error(err: any) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(pos => {
      localStorage.setItem('posicion', JSON.stringify(this.success(pos)));
    }, this.error, options);
  }
}
