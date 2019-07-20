import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CriterioBusquedaProducto, CatalogoActualizado} from '../interfaces/criterios';
import { Coordenadas, Ubicacion } from '../interfaces/ubicacion';
import { Producto } from '../interfaces/producto';

@Injectable()
export class DataSharingService {

//---Canal de Codigos de Barra------ // TODO: VER-------------------------------------------------
  private productosSource = new BehaviorSubject<Producto[]>([]);
  productosParacomparar = this.productosSource.asObservable();
  compararPrecios(productos: Producto[]) { 
    this.productosSource.next(productos);
  }

//---Canal del plato ------// TODO: VER------------------------------------------------------------
  private platoSource = new BehaviorSubject<number>(0);
  currentPlato = this.platoSource.asObservable();
  changePlato(idPlato: number) {
    this.platoSource.next(idPlato);
  }

//---Canal de Ubicacion------// TODO: VER---------------------------------------------------------
  private ubicacionSource = new BehaviorSubject<Ubicacion>(
    {
      localidad: 'Capital',
      provincia: 'Córdoba',
      codigoEntidadFederal:'AR-X'
    }
  );
  currentUbicacion = this.ubicacionSource.asObservable();
  changeUbicacion(ubicacion: Ubicacion) {
    this.ubicacionSource.next(ubicacion);
  }
  
 
//---Canal de Criterios de Busqueda------// TODO: VER-------------------------------------------
  private criterioSource = new BehaviorSubject<CriterioBusquedaProducto>
  (
    {componente:'SearchbarComponent'}//Un criterio de busqueda vacio significa que retorna todos los productos
  ); 
  currentCriterio = this.criterioSource.asObservable();
  changeCriterioBusquedaProducto(critops: CriterioBusquedaProducto) {
    this.criterioSource.next(critops);
  }
  
//---Canal del Catalogo------// TODO: VER--------------------------------------------------------
  private productosDelCatalogoSource = new BehaviorSubject<CatalogoActualizado>
  (
    //El Argumento por defecto es la lista vacia y el componente es el SearchBarComponent
    {componente:'SearchbarComponent',productos:[]}
  ); 
  productosDelCatalogo = this.productosDelCatalogoSource.asObservable();
  catalogoActualizado(event: CatalogoActualizado) {
    this.productosDelCatalogoSource.next(event);
  }
  //--------------------------------------------------------------------------------------------
  constructor() { }
}


/*
 private coordenadasSource = new BehaviorSubject<Coordenadas>
  ({latitud: 0, longitud: 0, precision: 0});
  currentCoordenadas = this.coordenadasSource.asObservable();





*/