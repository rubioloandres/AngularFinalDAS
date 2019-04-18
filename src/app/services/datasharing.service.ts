import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CriterioBusquedaProducto } from '../interfaces/criterios';

@Injectable()
export class DataSharingService {

  private messageSource = new BehaviorSubject<string>('default message'); // TODO: cambiar default
  currentMessage = this.messageSource.asObservable();

  private codigosSource = new BehaviorSubject<string>('default codigos'); // TODO: cambiar default
  currentCodigos = this.codigosSource.asObservable();

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
