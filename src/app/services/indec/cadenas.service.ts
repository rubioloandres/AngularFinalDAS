import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cadena, CadenaSucursal } from '../../interfaces/cadena';
import { Respuesta } from '../../interfaces/comparador';
import { catchError } from 'rxjs/operators';
import { ErrorManager } from '../handleError.service';

@Injectable()
export class CadenasService {

    constructor(
      private http: HttpClient,
      private errManager: ErrorManager
      ) { }

    public getCadenasINDEC(): Observable<Cadena[]> {
      return this.http.get<Cadena[]>(environment.webAPI + 'cadenas?')
                      .pipe(catchError(err => {
                        console.log('Error al obtener cadenas', err);
                        return throwError(err);
                      }));
    }

    public getPreciosINDEC(codEntidadFed: string, loc: string, cods: string): Observable<CadenaSucursal[]> {
      const options = 'codigoentidadfederal=' + codEntidadFed + '&localidad=' + loc + '&codigos=' + cods;
      return this.http.post<CadenaSucursal[]>(environment.webAPI + 'precios?' + options, 'none');
    }

    public getComparacionINDEC(codEntidadFed: string, loc: string, cods: string): Observable<Respuesta> {
      const options = 'codigoentidadfederal=' + codEntidadFed + '&localidad=' + loc + '&codigos=' + cods;
      return this.http.post<Respuesta>(environment.webAPI + 'comparador?' + options, 'none');
                     // .pipe(catchError(this.errManager.handleHTTPError));
    }
}
