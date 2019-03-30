import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Localidad } from '../interfaces/localidad';

@Injectable()
export class LocalidadesDataSource {

    constructor(private _http: HttpClient) { }

    public getLocalidadesINDEC(): Observable<Localidad[]> {
      return this._http.get<Localidad[]>(environment.webAPI + 'localidades?identificador=1222');
    }
}
