import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Sucursal } from '../interfaces/sucursal';

@Injectable()
export class SucursalesDataSource {

  constructor(private http: HttpClient) { }

  public getPreciosSucursalesINDEC(codEntidadFed: string, localidad: string, codigos: string): Observable<Sucursal[]> {
      const urlSearchParams = new URLSearchParams();
      urlSearchParams.append('identificador', 'Angular');
      urlSearchParams.append('codEntidadFed', codEntidadFed);
      urlSearchParams.append('localidad', localidad);
      urlSearchParams.append('codigos', codigos);
      return this.http.post<Sucursal[]>(environment.webAPI + 'precios?', urlSearchParams);
  }

  public getInfoSucursalINDEC(idSucursal: number, idCadena: number): Observable<Sucursal> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('identificador', 'Angular');
    urlSearchParams.append('idSucursal', idSucursal.toString());
    urlSearchParams.append('idCadena', idCadena.toString());
    return this.http.post<Sucursal>(environment.webAPI + 'info?', urlSearchParams);
  }
}
