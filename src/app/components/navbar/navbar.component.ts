import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Categoria } from 'src/app/interfaces/categoria';
import { DataSharingService } from 'src/app/services/datasharing.service';
import { GeoLocationService } from 'src/app/services/geoLocation.service';
import { Provincia } from 'src/app/interfaces/provincia';
import { Producto } from 'src/app/interfaces/producto';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Coordenadas, Ubicacion, UbicacionNombres } from 'src/app/interfaces/ubicacion';
import { Idioma } from 'src/app/interfaces/idioma';
import { Cadena } from 'src/app/interfaces/cadena';
import { CriterioBusquedaProducto } from 'src/app/interfaces/criterios';
import { MatDialog } from '@angular/material';
import { DialogLocationComponent } from '../location/location.component';
import { ChangeDetectorRef } from '@angular/core';
/**
 * @title NavBarMenu
 */

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavBarComponent implements OnInit, AfterViewChecked {

  listaCadenas: Cadena [] = new Array();
  listaProvincias: Provincia [] = new Array();
  listaCategorias: Categoria [] = new Array();
  listaIdiomas: Idioma [] = [
    {nombre: 'ES', imagen: './../../../assets/img/lang_esp_icon.png'},
    {nombre: 'EN', imagen: './../../../assets/img/lang_eng_icon.png'}
  ];
  idiomaActual: Idioma;
  searchInput = '';
  criterioBusqueda: CriterioBusquedaProducto;
  listaubicaciones: Coordenadas [] = new Array();
  ubicacion: Ubicacion;
  ubicacionActual: UbicacionNombres;
  listaProductos: Producto [] = new Array();
  formBusProd = new FormControl( this.searchInput );
  filteredProds: Observable<Producto[]>;

  secciones = [
    {
      nombre: 'Principal',
      imagen: './../../../assets/img/home_icon.png',
      ruta: '/',
      descripcion: 'Buscador y categorias'
    },
    {
      nombre: 'Saludable',
      imagen: './../../../assets/img/health-food-icon2.png',
      ruta: 'health',
      descripcion: 'Menu sugerido para cada dia de la semana'
    },
    {
      nombre: 'Carrito',
      imagen: './../../../assets/img/cart_icon.png',
      ruta: 'cart',
      descripcion: 'Productos agregados a carrito'
    }
  ];

  selected = new FormControl(0);
  seccionActiva = 0;

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
    const lp = localStorage.getItem('productos');
    if (lp !== null) {
      const lprod: Producto [] = JSON.parse(lp);
      if ( lprod.length > 0 ) {
        this.listaProductos = lprod;
      } else {
        this.listaProductos = [];
      }
    }
  }

  loadCategories() {
    const lc = localStorage.getItem('categorias');
    if (lc !== null) {
      const lcat: Categoria [] = JSON.parse(lc);
      if (lcat.length > 0) {
        lcat.forEach(cat => {
          this.listaCategorias.push(cat);
        });
      } else {
        this.listaCategorias = [];
      }
    }
  }

  loadProvinces() {
    const lp = localStorage.getItem('provincias');
    if (lp !== null) {
      const lprov: Provincia [] = JSON.parse(lp);
      if (lprov.length > 0) {
        this.listaProvincias = lprov;
      } else {
        this.listaProvincias = [];
      }
    }
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
    this.ubicacionActual = {
      localidad: this.ubicacion.localidad,
      provincia: this.listaProvincias.find(p => p.codigoEntidadFederal === this.ubicacion.codigoEntidadFederal).nombreProvincia
    };
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

  newCriterio(cat: string) {
    const crit: CriterioBusquedaProducto = {
      idComercial: undefined,
      marca: undefined,
      categoria: cat,
      nombre: undefined
    };
    this.data.changeCriterioBusquedaProducto(crit);
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
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef
   ) {
    this.loadProducts();
    this.filtrarProductos();
    this.loadProvinces();
    this.loadUbicacion();
   }

  ngOnInit() {
    this.loadCadenas();
    this.loadIdioma();
    this.loadCategories();
    this.data.currentCriterio.subscribe(criterio => this.criterioBusqueda = criterio);
    this.data.currentUbicacion.subscribe(ub => {
      if (ub.localidad !== 'default') {
        this.ubicacionActual = ub;
      }
    });
  }

  ngAfterViewChecked() {
    this.filtrarProductos();
    this.cdRef.detectChanges();
  }

}
