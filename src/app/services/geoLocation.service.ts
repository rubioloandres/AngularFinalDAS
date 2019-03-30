import { Injectable  } from '@angular/core';
import { Coordenadas } from '../interfaces/ubicacion';
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

@Injectable()
export class GeoLocationService {

  ubicacion: Coordenadas [] = new Array();
  success(pos: any) {
    const crd = pos.coords;
    console.log('Your current position is:');
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    console.log('More or less ' + crd.accuracy + ' meters.');
/*
    this.ubicacion = crd.latitude;

    localStorage.setItem('posicion', JSON.stringify(this.ubicacion));*/
  }

  error(err: any) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(this.success, this.error, options);
  }
}
