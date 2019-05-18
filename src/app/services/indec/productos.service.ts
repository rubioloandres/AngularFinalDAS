import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../../interfaces/producto';
import { ErrorManager } from '../handleError.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ProductosService {

  constructor(
    private http: HttpClient,
    private errManager: ErrorManager
    ) { }
/*
  public getProductosINDEC(): Observable<Producto[]> {
    return this.http.get<Producto[]>(environment.webAPI + 'productos?identificador=1222');
  }

  public getProductosResponse(): Observable<Producto[]> {
    return this.http.get<Producto[]>(environment.webAPI + 'productos?identificador=1222')
                    .pipe(catchError(this.errManager.handleHTTPError));
  } */

  public getProductosResponse(): Observable<Producto[]> {
    return this.http.get<Producto[]>(environment.webAPI + 'productos')
    .pipe(catchError(err => {
      console.log('Error al obtener productos', err);
      return throwError(err);
    }));
  }

  public getProductosByCategoriaINDEC(idCat: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(environment.webAPI + 'productos?' + '&idcategoria=' + idCat);
  }


}
