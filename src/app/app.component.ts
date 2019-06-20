import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalidadesService } from './services/indec/localidades.service';
import { CategoriasService } from './services/indec/categorias.service';
import { ProductosService } from './services/indec/productos.service';
import { ProvinciasService } from './services/indec/provincias.service';
import { CadenasService } from './services/indec/cadenas.service';
import { MenuService } from './services/indec/menu.service';
import { Categoria } from './interfaces/categoria';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Comparador de precios';
  error: any;

  constructor(
    private sCat: CategoriasService,
    private sProd: ProductosService,
    private sProv: ProvinciasService,
    private sLoc: LocalidadesService,
    private sCad: CadenasService,
    private sMen: MenuService
  ) { }

  suscripcionCadenasService: Subscription;
  suscripcionProductoService: Subscription;
  suscripcionCategoriasService: Subscription;
  suscripcionProvinciasService: Subscription;
  suscripcionLocalidadesService: Subscription;
  suscripcionMenuService: Subscription;

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
  }

  ngOnDestroy(): void {
    this.suscripcionCadenasService.unsubscribe();
    this.suscripcionProductoService.unsubscribe();
    this.suscripcionCategoriasService.unsubscribe();
    this.suscripcionProvinciasService.unsubscribe();
    this.suscripcionLocalidadesService.unsubscribe();
  }

}
