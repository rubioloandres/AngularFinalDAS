import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProvincesDataSource {

    constructor(private http: HttpClient) { }

    public getProvinciasINDEC(): Observable<string[]> {
      return this.http.get<string[]>(environment.webAPI + 'provincias?identificador=1222');
  }
}
