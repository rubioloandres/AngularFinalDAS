import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CriterioBusquedaProducto } from '../interfaces/criterios';
import { Coordenadas } from '../interfaces/ubicacion';
import { Producto } from '../interfaces/producto';

@Injectable()
export class DataSharingService {

  private messageSource = new BehaviorSubject<string>('default message');
  currentMessage = this.messageSource.asObservable();

  private codigosSource = new BehaviorSubject<string>('default codigos');
  currentCodigos = this.codigosSource.asObservable();

  private platoSource = new BehaviorSubject<number>(0);
  currentPlato = this.platoSource.asObservable();

  private productoSource = new BehaviorSubject<Producto>(
    {
      codigoDeBarras: 'string',
      idCategoria: 0,
      nombreCategoria: 'string',
      nombreProducto: 'string',
      nombreMarca: 'string',
      imagenProducto: 'string',
      precio: 'string',
    }
  );
  currentProducto = this.productoSource.asObservable();

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

  changePlato(idPlato: number) {
    this.platoSource.next(idPlato);
  }

  changeProducto(producto: Producto) {
    this.productoSource.next(producto);
  }

}
