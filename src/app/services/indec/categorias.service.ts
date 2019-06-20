import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Categoria } from '../../interfaces/categoria';
import { ErrorManager } from '../handleError.service';

@Injectable()
export class CategoriasService {

  constructor(
    private http: HttpClient,
    private errManager: ErrorManager
    ) { }
/*
  getCategoriaResponse(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>( environment.webAPI + 'categorias?identificador=Angular')
                    .pipe( catchError (this.errManager.handleHTTPError) );

  }*/

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>( environment.webAPI + 'categorias?')
                    .pipe(catchError(err => {
                      console.log('Error al obtener categorias', err);
                      return throwError(err);
                    }));
  }
}
