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
import { CadenasDataSource } from 'src/app/data/cadenas.datasource';

/**
 * @title Nested menu
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NestedMenuExampleComponent implements OnInit {

  listaCadenas: Cadena [] = new Array();
  listaProvincias: Provincia [] = new Array();
  listaCategorias: string [] = new Array();
  listaIdiomas: Idioma [] = [
    {nombre: 'ES', imagen: './../../../assets/img/lang_esp_icon.png'},
    {nombre: 'EN', imagen: './../../../assets/img/lang_eng_icon.png'}
  ];
  idiomaActual: Idioma;
  message: string;
  searchInput = '';

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
    this.listaCadenas = JSON.parse(localStorage.getItem('cadenas'));
    this.listaCadenas = [
      {idCadena: 1, nombre: 'Walmart', imagen: './../../../assets/img/walmart_logo.png'},
      {idCadena: 2, nombre: 'Jumbo', imagen: './../../../assets/img/jumbo_logo.png'},
      {idCadena: 3, nombre: 'Carrefour', imagen: './../../../assets/img/carrefour_logo.png'},
      {idCadena: 4, nombre: 'Libertad', imagen: './../../../assets/img/libertad_logo.png'},
      {idCadena: 5, nombre: 'Disco', imagen: './../../../assets/img/disco_logo.png'},
    ];
    localStorage.setItem('cadenas', JSON.stringify(this.listaCadenas));
   /* this.dsCad.getCadenasINDEC().subscribe(
      cad => this.listaCadenas = cad );*/
  }

  loadProducts() {
    this.listaProductos = JSON.parse(localStorage.getItem('productos'));
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
    /*this.listaProvincias = ['Cordoba', 'Buenos Aires', 'Santa Fe', 'Mendoza', 'San Luis', 'San Juan'];
    localStorage.setItem('provincias', JSON.stringify(this.listaProvincias));*/
    const lprov: Provincia [] = JSON.parse(localStorage.getItem('provincias'));
    if (lprov !== null) {
      this.listaProvincias = lprov;
    } else {
      this.listaProvincias = [];
    }
  }

  newMessage(categoria: string) {
    this.data.changeMessage(categoria);
  }

  getAutomaticLocation() {
    this.loc.getCurrentLocation();
  }

  searchProducts() {
    this.data.changeMessage(this.searchInput);
    this.searchInput = '';
  }

  loadUbicacion() {
    this.listaubicaciones = JSON.parse(localStorage.getItem('posicion'));
    this.listaubicaciones.forEach(ubic => {
      ubic.latitud = ubic.latitud.toString().substring(0, 7);
      ubic.longitud = ubic.longitud.toString().substring(0, 7);
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
    private dsCad: CadenasDataSource
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
    this.data.currentMessage.subscribe(message => this.message = message);
  }
}
