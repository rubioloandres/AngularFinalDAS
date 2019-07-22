import { Component, OnInit, OnDestroy, ChangeDetectorRef, Inject, LOCALE_ID } from '@angular/core';
import { LocalidadesService } from './services/indec/localidades.service';
import { CategoriasService } from './services/indec/categorias.service';
import { ProductosService } from './services/indec/productos.service';
import { ProvinciasService } from './services/indec/provincias.service';
import { CadenasService } from './services/indec/cadenas.service';
import { MenuService } from './services/indec/menu.service';
import { Categoria } from './interfaces/categoria';
import { Subscription, Observable } from 'rxjs';
import { DataSharingService } from './services/datasharing.service';
import { GeoLocationService } from './services/geoLocation.service';
import { MatDialog } from '@angular/material';
import { Ubicacion, Coordenadas } from './interfaces/ubicacion';
import { Producto } from './interfaces/producto';
import { FormControl } from '@angular/forms';
import { Provincia } from './interfaces/provincia';
import { Idioma } from './interfaces/idioma';
import { Cadena } from './interfaces/cadena';
import { DialogLocationComponent } from './components/location/location.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Comparador de precios';
  error: any;

  nombreComponente: string = 'NavBarComponent';
  listaCadenas: Cadena[] = new Array();
  listaProvincias: Provincia[] = new Array();
  listaCategorias: Categoria[] = new Array();
  listaIdiomas: Idioma[] = [
    { nombre: 'ES', imagen: './../../../assets/img/lang_esp_icon.png' , puerto: 4200 },
    { nombre: 'EN', imagen: './../../../assets/img/lang_eng_icon.png' , puerto: 44316 }
  ];
  idiomaActual: Idioma;
  searchInput = '';
  listaubicaciones: Coordenadas[] = new Array();
  ubicacion: Ubicacion;
  ubicacionActual: Ubicacion;
  listaProductos: Producto[] = new Array();
  formBusProd = new FormControl(this.searchInput);
  private suscripcionformBusProd: Subscription;
  filteredProds: Observable<Producto[]>;
  
  selected = new FormControl(0);
  seccionActiva = 0;


  constructor(
    private sCat: CategoriasService,
    private sProd: ProductosService,
    private sProv: ProvinciasService,
    private sLoc: LocalidadesService,
    private sCad: CadenasService,
    private sMen: MenuService,
    private data: DataSharingService,
    private loc: GeoLocationService,
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    @Inject(LOCALE_ID) locale: string
  ) {
        if (locale === 'en') {
          this.idiomaActual = this.listaIdiomas.find(i => i.nombre === 'EN');
        } else {
          this.idiomaActual = this.listaIdiomas.find(i => i.nombre === 'ES');
        }

    
      console.log(locale);
      console.log(this.idiomaActual);
      

   }

  suscripcionCadenasService: Subscription;
  suscripcionProductoService: Subscription;
  suscripcionCategoriasService: Subscription;
  suscripcionProvinciasService: Subscription;
  suscripcionLocalidadesService: Subscription;
  suscripcionMenuService: Subscription;

  secciones = [
    {
      nombre: 'Principal',
      imagen: './../../../assets/img/home_icon.png',
      ruta: '/',
      descripcion: 'Principal'
    },
    {
      nombre: 'Saludable',
      imagen: './../../../assets/img/health-food-icon2.png',
      ruta: 'health',
      descripcion: 'Menu Saludable'
    },
    {
      nombre: 'Carrito',
      imagen: './../../../assets/img/cart_icon.png',
      ruta: 'cart',
      descripcion: 'Carrito'
    }
  ];


  buscarProductos() {
    this.suscripcionProductoService = this.sProd.buscarProductos({ componente: 'SearchbarComponent' }).subscribe(
      prods => {
        console.log('HTTP Response Productos', prods);
        localStorage.setItem('productos', JSON.stringify(prods));
      },
      err => {
        console.log('HTTP Error Productos', err);
        localStorage.setItem('productos', '[]');
        this.error = err;
      },
      () => console.log('HTTP Request Productos completed')
    );
  }

  getCategorias() {
    this.suscripcionCategoriasService = this.sCat.getCategorias().subscribe(
      cats => {
        console.log('HTTP Response Categorias', cats);
        localStorage.setItem('categorias', JSON.stringify(cats));
      },
      err => {
        console.log('HTTP Error Categorias', err);
        localStorage.setItem('categorias', '[]');
        this.error = err;
      },
      () => console.log('HTTP Request Categorias completed')
    );
  }

  getProvincias() {
    this.suscripcionProvinciasService = this.sProv.getProvincias().subscribe(
      provs => {
        console.log('HTTP Response Provincias', provs);
        localStorage.setItem('provincias', JSON.stringify(provs));
      },
      err => {
        console.log('HTTP Error Provincias', err);
        localStorage.setItem('provincias', '[]');
        this.error = err;
      },
      () => console.log('HTTP Request Provincias completed')
    );
  }

  getLocalidades() {
    this.suscripcionLocalidadesService = this.sLoc.getLocalidades().subscribe(
      locs => {
        console.log('HTTP Response Localidades', locs);
        localStorage.setItem('localidades', JSON.stringify(locs));
      },
      err => {
        console.log('HTTP Error Localidades', err);
        localStorage.setItem('localidades', '[]');
        this.error = err;
      },
      () => console.log('HTTP Request Localidades completed')
    );
  }

  getCadenas() {
    this.suscripcionCadenasService = this.sCad.getCadenas().subscribe(
      cads => {
        console.log('HTTP Response Cadenas', cads);
        localStorage.setItem('cadenas', JSON.stringify(cads));
      },
      err => {
        console.log('HTTP Error Cadenas', err);
        localStorage.setItem('cadenas', '[]');
        this.error = err;
      },
      () => console.log('HTTP Request Cadenas completed')
    );
  }

  getMenu() {
    this.suscripcionMenuService = this.sMen.getMenu().subscribe(
      menus => {
        console.log('HTTP Response Menu', menus);
        localStorage.setItem('menu', JSON.stringify(menus));
      },
      err => {
        console.log('HTTP Error Menu', err);
        localStorage.setItem('menu', '[]');
        this.error = err;
      },
      () => console.log('HTTP Request Menu completed')
    );
  }

  inicializarCarrito(): void {
    localStorage.setItem('carrito', '[]');
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

  loadCategories() {
    const lc = localStorage.getItem('categorias');
    if (lc !== null) {
      const lcat: Categoria[] = JSON.parse(lc);
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
      const lprov: Provincia[] = JSON.parse(lp);
      if (lprov.length > 0) {
        this.listaProvincias = lprov;
      } else {
        this.listaProvincias = [];
      }
    }
  }

  getProvincia(codEntFed: string) {
    return this.listaProvincias.find(prov => prov.codigoEntidadFederal === codEntFed);
  }

  getAutomaticLocation() {
    this.loc.getCurrentLocation();
  }

  searchProductsPorPalabraClave(): void {
    this.suscripcionformBusProd = this.formBusProd.valueChanges.subscribe(palabra => {
      if (palabra.length > 1) {
        this.data.changeCriterioBusquedaProducto({ palabraclave: palabra, componente: this.nombreComponente });
      } else {
        this.data.changeCriterioBusquedaProducto({ componente: this.nombreComponente });
      }
    });
  }

  onClickSearchProductsPorPalabraClave(): void {
      if (this.formBusProd.value.length > 1) {
        this.data.changeCriterioBusquedaProducto({ palabraclave: this.searchInput, componente: this.nombreComponente });
      }
  }

  searchAllProducts() {
    this.data.changeCriterioBusquedaProducto({ componente: this.nombreComponente });
  }

  hayUbicacion(): boolean {
    if (localStorage.getItem('ubicacion') !== null) {
      return true;
    } else{
      return false;
    }
  }

  loadUbicacion() {
    if (localStorage.getItem('ubicacion') !== null) {
      this.ubicacion = JSON.parse(localStorage.getItem('ubicacion'));
    }
  }

  registrarUbicacion() {
    const dialogRef = this.dialog.open(DialogLocationComponent, {
      width: '500px'
    });
  }

  setIdioma(idioma: Idioma) {
    let url = '';
    if (idioma.nombre === 'ES') {
      console.log('espa;ol');
      url = 'http://localhost:'+idioma.puerto;
      return url;
    }

    if (idioma.nombre === 'EN') {
      console.log('ingles');
      url = 'http://localhost:'+idioma.puerto;
      return url;
    }
  }

  // TODO: MUY IMPORTANTE INICIALIZAR TODO BIEN PORFAVOR!
  ngOnInit(): void {
    this.inicializarCarrito();
    this.buscarProductos();
    //TODO: ARREGLAR CARGAR CATEGORIAS
    this.getCategorias();
    this.getProvincias();
    this.getLocalidades();
    this.getCadenas();
    this.getMenu();

    this.loadCategories();
    this.loadProvinces();
    this.loadCadenas();
    // this.loadIdioma();
    this.searchProductsPorPalabraClave();

    this.data.currentUbicacion.subscribe(ub => {
      if (ub.localidad !== 'default') {
        this.ubicacionActual = ub;
      }
    });
  }

  ngOnDestroy(): void {
    this.suscripcionCadenasService.unsubscribe();
    this.suscripcionProductoService.unsubscribe();
    this.suscripcionCategoriasService.unsubscribe();
    this.suscripcionProvinciasService.unsubscribe();
    this.suscripcionLocalidadesService.unsubscribe();
    this.suscripcionformBusProd.unsubscribe();
  }


  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  

}
