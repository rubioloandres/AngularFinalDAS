import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductsDataSource {

    constructor(private _http: HttpClient) { }

    public getProductosByCategoriaINDEC( nombreCat: string ): Observable<string[]> {
        return this._http.get<string[]>(environment.webAPI + 'productos/' + nombreCat);
    }
}
