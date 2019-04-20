import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Provincia } from '../../interfaces/provincia';

@Injectable()
export class ProvinciasService {

    constructor(private http: HttpClient) { }

    public getProvinciasINDEC(): Observable<Provincia[]> {
      return this.http.get<Provincia[]>(environment.webAPI + 'provincias?identificador=Angular');
  }
}
