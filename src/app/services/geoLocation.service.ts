import { Injectable  } from '@angular/core';
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

@Injectable()
export class GeoLocationService {
  success(pos: any) {
    const crd = pos.coords;
    console.log('Your current position is:');
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    console.log('More or less ' + crd.accuracy + ' meters.');
  }

  error(err: any) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(this.success, this.error, options);
  }
}
