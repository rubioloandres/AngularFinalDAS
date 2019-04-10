import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto';

@Injectable()
export class ProductsDataSource {

  constructor(private http: HttpClient) { }

  public getProductosINDEC(): Observable<Producto[]> {
    return this.http.get<Producto[]>(environment.webAPI + 'productos?identificador=1222');
  }

  public getProductosByCategoriaINDEC(idCat: number ): Observable<Producto[]> {
    return this.http.get<Producto[]>(environment.webAPI + 'productos?identificador=1222' + '&idcategoria=' + idCat);
  }
}
