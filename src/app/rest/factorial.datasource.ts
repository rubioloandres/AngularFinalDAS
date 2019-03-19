import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FactorialDatasource {

    constructor(private _http: HttpClient) { }

    public getFactorial(nro: number): Observable<number[]> {
        return this._http.get<number[]>(environment.webAPI + 'factorial/' + nro);
    }
}

