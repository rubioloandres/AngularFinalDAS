import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CategoriesDataSource {

    constructor(private _http: HttpClient) { }

    public getCategoriasINDEC(): Observable<string[]> {
        return this._http.get<string[]>(environment.webAPI + 'categorias/');
    }
}
