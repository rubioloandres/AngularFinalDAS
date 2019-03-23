import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../catalogue/catalogue.component';

@Injectable()
export class ProductsDataSource {

    constructor(private _http: HttpClient) { }

    /*public getProductosINDEC( nombreCat: string ): Observable<string[]> {
        return this._http.get<string[]>(environment.webAPI + 'productos/' + nombreCat);
    }*/

    public getProductosINDEC( ): Observable<Producto[]> {
      return this._http.get<Producto[]>(environment.webAPI + 'productos?identificador=1222');
  }
}
