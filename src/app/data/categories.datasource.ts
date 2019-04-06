import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../interfaces/categoria';

@Injectable()
export class CategoriesDataSource {

    constructor(private http: HttpClient) { }

    public getCategoriasINDEC(): Observable<Categoria[]> {
      return this.http.get<Categoria[]>(environment.webAPI + 'categorias?identificador=1222');
    }
}
