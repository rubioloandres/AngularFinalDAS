import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cadena, CadenaSucursal } from '../interfaces/cadena';

@Injectable()
export class CadenasDataSource {

    constructor(private http: HttpClient) { }

    public getCadenasINDEC(): Observable<Cadena[]> {
      return this.http.get<Cadena[]>(environment.webAPI + 'cadenas?identificador=Angular');
    }

    public getPreciosINDEC(codEntidadFed: string, loc: string, cods: string): Observable<CadenaSucursal[]> {
      /*const urlSearchParams = new URLSearchParams();
      urlSearchParams.append('identificador', 'Angular');
      urlSearchParams.append('codigoentidadfederal', codEntidadFed);
      urlSearchParams.append('localidad', loc);
      urlSearchParams.append('codigos', cods);
      console.log(urlSearchParams.get('identificador'));*/
      const options = 'identificador=Angular&codigoentidadfederal=' + codEntidadFed + '&localidad=' + loc + '&codigos=' + cods;
      return this.http.post<CadenaSucursal[]>(environment.webAPI + 'precios?' + options, 'none');
    }
}
