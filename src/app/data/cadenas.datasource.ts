import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cadena } from '../interfaces/cadena';

@Injectable()
export class CadenasDataSource {

    constructor(private http: HttpClient) { }

    public getCadenasINDEC(): Observable<Cadena[]> {
      return this.http.get<Cadena[]>(environment.webAPI + 'cadenas?identificador=Angular');
    }
}
