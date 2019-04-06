import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Sucursal } from '../interfaces/sucursal';

@Injectable()
export class SucursalesDataSource {

    constructor(private http: HttpClient) { }

    public getPreciosSucursalesINDEC(): Observable<Sucursal[]> {
      return this.http.get<Sucursal[]>(environment.webAPI + 'precios?identificador=1222');
  }
}
