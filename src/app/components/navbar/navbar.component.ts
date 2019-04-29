import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/interfaces/categoria';
import { DataSharingService } from 'src/app/services/datasharing.service';
import { GeoLocationService } from 'src/app/services/geoLocation.service';
import { Provincia } from 'src/app/interfaces/provincia';
import { Producto } from 'src/app/interfaces/producto';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Coordenadas } from 'src/app/interfaces/ubicacion';
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
export class NavBarComponent implements OnInit {

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

  listaProductos: Producto [] = new Array();
  formBusProd = new FormControl( this.searchInput );
  filteredProds: Observable<Producto[]>;

  private _filterProds(value: string): Producto[] {
    if (value.length > 1) {
      const filterValue = value.toLowerCase();
      return this.listaProductos.filter(prod => prod.nombre.toLowerCase().indexOf(filterValue) === 0);
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
      this.listaCadenas = JSON.parse(localStorage.getItem('cadenas'));
    } else {
      this.listaCadenas = [];
    }
  }

  loadProducts() {
    // ver cuando no existe
    if (localStorage.getItem('productos') !== null) {
      this.listaProductos = JSON.parse(localStorage.getItem('productos'));
    } else {
      this.listaProductos = [];
    }
  }

  loadCategories() {
    const lcat: Categoria [] = JSON.parse(localStorage.getItem('categorias'));
    if (lcat !== null) {
      lcat.forEach(cat => {
        this.listaCategorias.push(cat.nombre);
      });
    } else {
      this.listaCategorias = [];
    }
  }

  loadProvinces() {
    const lprov: Provincia [] = JSON.parse(localStorage.getItem('provincias'));
    if (lprov !== null) {
      this.listaProvincias = lprov;
    } else {
      this.listaProvincias = [];
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
    if (localStorage.getItem('posicion') !== null){
      this.listaubicaciones = JSON.parse(localStorage.getItem('posicion'));
      this.listaubicaciones.forEach(ubic => {
        /*ubic.latitud = ubic.latitud.toString().substring(0, 7);
        ubic.longitud = ubic.longitud.toString().substring(0, 7);*/
      });
    }
  }

  registrarUbicacion() {
    const dialogRef = this.dialog.open(DialogLocationComponent, {
      width: '500px'
    });
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
}
