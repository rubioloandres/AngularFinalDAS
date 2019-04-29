import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CriterioBusquedaProducto } from '../interfaces/criterios';
import { Coordenadas } from '../interfaces/ubicacion';


@Injectable()
export class DataSharingService {

  private messageSource = new BehaviorSubject<string>('default message');
  currentMessage = this.messageSource.asObservable();

  private codigosSource = new BehaviorSubject<string>('default codigos');
  currentCodigos = this.codigosSource.asObservable();

  private coordenadasSource = new BehaviorSubject<Coordenadas>
  ({latitud: 0, longitud: 0, precision: 0});
  currentCoordenadas = this.coordenadasSource.asObservable();

  private criterioSource = new BehaviorSubject<CriterioBusquedaProducto>
  // TODO: cambiar default
  ({idComercial: 0, marca: 'fafafa', categoria: 'fafafa', nombre: 'fafafa'});
  currentCriterio = this.criterioSource.asObservable();

  constructor() { }

  changeMessage(message: string) { // TODO: eliminar
    this.messageSource.next(message);
  }

  changeCriterioBusquedaProducto(crit: CriterioBusquedaProducto) {
    this.criterioSource.next(crit);
  }

  changeCodigos(codigos: string) { // TODO: cambiar nombre
    this.codigosSource.next(codigos);
  }

}
