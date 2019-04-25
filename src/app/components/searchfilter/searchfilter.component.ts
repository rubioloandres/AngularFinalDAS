import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/interfaces/categoria';
import { DataSharingService } from 'src/app/services/datasharing.service';
import { Producto } from 'src/app/interfaces/producto';
import { Provincia } from 'src/app/interfaces/provincia';
import { Localidad } from 'src/app/interfaces/localidad';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Ubicacion } from 'src/app/interfaces/ubicacion';
import { CriterioBusquedaProducto } from 'src/app/interfaces/criterios';

@Component({
  selector: 'app-searchfilter',
  templateUrl: './searchfilter.component.html',
  styleUrls: ['./searchfilter.component.css']
})
export class SearchfilterComponent implements OnInit {

  message: string;
  criterioBusqueda: CriterioBusquedaProducto;
  listaMarcas: string [] = new Array ();

  listaCategorias: Categoria[] = new Array();
  formCategoria = new FormControl();
  filteredCategorias: Observable<Categoria[]>;

  listaProvincias: Provincia [] = new Array();
  formProvincia = new FormControl( );
  filteredProvincias: Observable<Provincia[]>;

  listaLocalidades: Localidad [] = new Array();
  formLocalidad = new FormControl();
  filteredLocalidades: Observable<Localidad[]>;

  displayFnP(prov?: Provincia): string | undefined {
    return prov ? prov.nombreProvincia : undefined;
  }

  displayFnL(loc?: Localidad): string | undefined {
    return loc ? loc.nombreLocalidad : undefined;
  }

  displayFnC(cat?: Categoria): string | undefined {
    return cat ? cat.nombre : undefined;
  }

  private _filterP(nombre: string): Provincia[] {
    const filterValue = nombre.toLowerCase();
    return this.listaProvincias.filter(prov =>
      prov.nombreProvincia.toLowerCase().normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '').indexOf(filterValue) === 0);
  }

  private _filterL(nombre: string): Localidad[] {
    const filterValue = nombre.toLowerCase();
    return this.listaLocalidades.filter(loc =>
      loc.nombreLocalidad.toLowerCase().normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '').indexOf(filterValue) === 0);
  }

  private _filterC(nombre: string): Categoria[] {
    const filterValue = nombre.toLowerCase();
    return this.listaCategorias.filter(cat =>
      cat.nombre.toLowerCase().normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '').indexOf(filterValue) === 0);
  }

  filtrarProvincias() {
    this.filteredProvincias = this.formProvincia.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterP(name) : this.listaProvincias.slice())
    );
  }

  filtrarLocalidades() {
    this.filteredLocalidades = this.formLocalidad.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterL(name) : this.listaLocalidades.slice())
    );
  }

  filtrarCategorias() {
    this.filteredCategorias = this.formCategoria.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterC(name) : this.listaCategorias.slice())
    );
  }

  loadCategories() { // TODO: cambiar nombre a  "cargarCategorias"
    const lcat = localStorage.getItem('categorias');
    if (lcat !== null) {
      this.listaCategorias = JSON.parse(lcat);
    } else {
      this.listaCategorias = [];
    }
  }

  loadProvinces() { // TODO: cambiar nombre a  "cargarProvincias"
    // localStorage.setItem('provincias', JSON.stringify(this.listaProvincias));
    this.listaProvincias = JSON.parse(localStorage.getItem('provincias'));
  }

  loadMarcas() { // TODO: cambiar nombre a  "cargarMarcas"
    this.data.currentCriterio.subscribe(criterio => {
      this.criterioBusqueda = criterio;
      this.listaMarcas = [];
      const lprod: Producto [] = JSON.parse(localStorage.getItem('productos'));
      if (lprod !== null) { // HACK:
        lprod.forEach(prod => {
          if (prod.nombreCategoria === this.criterioBusqueda.categoria && (! (this.listaMarcas.includes(prod.nombreMarca) ) )) {
            this.listaMarcas.push(prod.nombreMarca);
          }
        });
      }
    });
  }

  newCriterio(cat: string, mar: string) {
    const crit: CriterioBusquedaProducto = {
      idComercial: undefined,
      nombre: undefined,
      categoria: cat,
      marca: mar
    };
    this.data.changeCriterioBusquedaProducto(crit);
  }

  newMessage(categoria: string) {
    this.data.changeMessage(categoria);
  }

  getLocalidadesByProvincia(codigoEntidadFederal: string) {

    const lloc: Localidad[] = JSON.parse(localStorage.getItem('localidades'));
    this.listaLocalidades = lloc.filter(loc => loc.codigoEntidadFederal === codigoEntidadFederal);
  }

  saveUbicacion(localidad: Localidad, provincia: Provincia) { // TODO: cambiar nombre a  "guardarUbicacion"
    const ubicacion: Ubicacion = {codigoEntidadFederal:provincia.codigoEntidadFederal
                                 , localidad: localidad.nombreLocalidad};

    localStorage.setItem('ubicacion', JSON.stringify(ubicacion));

  }
  constructor(
    private data: DataSharingService
  ) { }

  ngOnInit() {
    this.loadCategories();
    this.loadProvinces();
    this.filtrarProvincias();
    this.filtrarLocalidades();
    this.filtrarCategorias();
    this.loadMarcas();
  }

}
