import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Categoria } from 'src/app/interfaces/categoria';
import { DataSharingService } from 'src/app/services/datasharing.service';
import { GeoLocationService } from 'src/app/services/geoLocation.service';
import { Provincia } from 'src/app/interfaces/provincia';
import { Producto } from 'src/app/interfaces/producto';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Coordenadas, Ubicacion } from 'src/app/interfaces/ubicacion';
import { Idioma } from 'src/app/interfaces/idioma';
import { Cadena } from 'src/app/interfaces/cadena';
import { CriterioBusquedaProducto } from 'src/app/interfaces/criterios';
import { MatDialog } from '@angular/material';
import { DialogLocationComponent } from '../location/location.component';

/**
 * @title NavBarMenu
 */

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavBarComponent implements OnInit, AfterViewInit {

  listaCadenas: Cadena [] = new Array();
  listaProvincias: Provincia [] = new Array();
  listaCategorias: string [] = new Array();
  listaIdiomas: Idioma [] = [
    {nombre: 'ES', imagen: './../../../assets/img/lang_esp_icon.png'},
    {nombre: 'EN', imagen: './../../../assets/img/lang_eng_icon.png'}
  ];
  idiomaActual: Idioma;
  searchInput = '';
  criterioBusqueda: CriterioBusquedaProducto;

  listaubicaciones: Coordenadas [] = new Array();
  ubicacion: Ubicacion;

  listaProductos: Producto [] = new Array();
  formBusProd = new FormControl( this.searchInput );
  filteredProds: Observable<Producto[]>;

  private _filterProds(value: string): Producto[] {
    if (value.length > 1) {
      const filterValue = value.toLowerCase();
      return this.listaProductos.filter(prod => prod.nombreProducto.toLowerCase().indexOf(filterValue) === 0);
    }
  }

  filtrarProductos() {
    this.filteredProds = this.formBusProd.valueChanges
      .pipe(
        startWith(''),
        map(prod => prod ? this._filterProds(prod) : this.listaProductos.slice())
      );
  }

  loadCadenas() {
    if (localStorage.getItem('cadenas') !== null) {
      const lcad = localStorage.getItem('cadenas');
      if (lcad.length > 0) {
        this.listaCadenas = JSON.parse(localStorage.getItem('cadenas'));
      }
    } else {
      this.listaCadenas = [];
    }
  }

  loadProducts() {
    const lprod = localStorage.getItem('productos');
    if (lprod.length > 0) {
      if (localStorage.getItem('productos') !== null) {
        this.listaProductos = JSON.parse(localStorage.getItem('productos'));
      } else {
        this.listaProductos = [];
      }
    }
  }

  loadCategories() {
    const lcat = localStorage.getItem('categorias');
    if (lcat.length > 0) {
      const lcat: Categoria [] = JSON.parse(localStorage.getItem('categorias'));
      if (lcat !== null) {
        lcat.forEach(cat => {
          this.listaCategorias.push(cat.nombreCategoria);
        });
      } else {
        this.listaCategorias = [];
      }
    }
  }

  loadProvinces() {
    const lp = localStorage.getItem('provincias');
    if (lp.length > 0) {
      const lprov: Provincia [] = JSON.parse(lp);
      if (lprov !== null) {
        this.listaProvincias = lprov;
      } else {
        this.listaProvincias = [];
      }
    }
  }

  newCriterio(cat: string) {
    const crit: CriterioBusquedaProducto = {
      idComercial: undefined,
      marca: undefined,
      categoria: cat,
      nombre: undefined
    };
    this.data.changeCriterioBusquedaProducto(crit);
  }

  getProvincia( codEntFed: string ) {
    return this.listaProvincias.find(prov => prov.codigoEntidadFederal === codEntFed);
  }

  getAutomaticLocation() {
    this.loc.getCurrentLocation();
  }

  searchProducts() {
    const crit: CriterioBusquedaProducto = {
      idComercial: undefined,
      marca: undefined,
      categoria: undefined,
      nombre: this.searchInput
    };
    this.data.changeCriterioBusquedaProducto(crit);
    this.searchInput = '';
  }

  loadUbicacion() {
    if (localStorage.getItem('ubicacion') !== null) {
      this.ubicacion =  JSON.parse(localStorage.getItem('ubicacion'));
    }
  }

  registrarUbicacion() {
    const dialogRef = this.dialog.open(DialogLocationComponent, {
      width: '500px'
    });
    this.loadUbicacion();
  }

  loadIdioma() {
    this.listaIdiomas.forEach(idioma => {
      if (idioma.nombre === 'ES') {
        this.idiomaActual = idioma;
      }
    });
  }

  setIdiomaActual(nombreIdioma: string) {
    this.listaIdiomas.forEach(idioma => {
      if (idioma.nombre === nombreIdioma) {
        this.idiomaActual = idioma;
      }
    });
  }

  constructor(
    private data: DataSharingService,
    private loc: GeoLocationService,
    public dialog: MatDialog
   ) {
    this.loadProducts();
    this.filtrarProductos();
   }

  ngOnInit() {
    this.loadCadenas();
    this.loadIdioma();
    this.loadUbicacion();
    this.loadProvinces();
    this.loadCategories();
    this.data.currentCriterio.subscribe(criterio => this.criterioBusqueda = criterio);
  }

  ngAfterViewInit() {
    this.loadUbicacion();
  }

}
