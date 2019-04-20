import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cadena, CadenaSucursal } from '../../interfaces/cadena';
import { Respuesta } from '../../interfaces/comparador';

@Injectable()
export class CadenasService {

    constructor(private http: HttpClient) { }

    public getCadenasINDEC(): Observable<Cadena[]> {
      return this.http.get<Cadena[]>(environment.webAPI + 'cadenas?identificador=Angular');
    }

    public getPreciosINDEC(codEntidadFed: string, loc: string, cods: string): Observable<CadenaSucursal[]> {
      const options = 'identificador=Angular&codigoentidadfederal=' + codEntidadFed + '&localidad=' + loc + '&codigos=' + cods;
      return this.http.post<CadenaSucursal[]>(environment.webAPI + 'precios?' + options, 'none');
    }

    public getComparacionINDEC(codEntidadFed: string, loc: string, cods: string): Observable<Respuesta> {
      const options = 'identificador=Angular&codigoentidadfederal=' + codEntidadFed + '&localidad=' + loc + '&codigos=' + cods;
      return this.http.post<Respuesta>(environment.webAPI + 'precios?' + options, 'none');
    }
}
