import { Component, OnInit} from '@angular/core';
import { LocalidadesService } from './services/indec/localidades.service';
import { CategoriasService } from './services/indec/categorias.service';
import { ProductosService } from './services/indec/productos.service';
import { ProvinciasService } from './services/indec/provincias.service';
import { CadenasService } from './services/indec/cadenas.service';
import { MenuService } from './services/indec/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

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

  getProductos() {
    this.sProd.getProductosResponse().subscribe(
      prods => {
        localStorage.setItem('productos', JSON.stringify(prods));
        console.log('HTTP Response Productos', prods);
      },
      err => {
        console.log('HTTP Error Productos', err);
        this.error = err;
      },
      () => console.log('HTTP Request Productos completed')
    );
  }

  getCategorias() {
    const lcat = localStorage.getItem('categorias');
    if (lcat.length < 1) {
      this.sCat.getCategoriaResponse().subscribe (
        cats => {
          localStorage.setItem('categorias', JSON.stringify(cats));
          console.log('HTTP Response Categorias', cats);
        },
        err => {
          console.log('HTTP Error Categorias', err);
          this.error = err;
        },
        () => console.log('HTTP Request Categorias completed')
      );
    }
  }

  getProvincias() {
    this.sProv.getProvinciasINDEC().subscribe(
      provs  =>  {
          localStorage.setItem('provincias', JSON.stringify(provs));
          console.log('HTTP Response Provincias', provs);
          },
      err => {
        console.log('HTTP Error Provincias', err);
        this.error = err;
      },
      () => console.log('HTTP Request Provincias completed')
    );
  }

  getLocalidades() {
    this.sLoc.getLocalidadesINDEC().subscribe(
      locs  =>  {
          localStorage.setItem('localidades', JSON.stringify(locs));
          console.log('HTTP Response Localidades', locs);
          },
      err => {
        console.log('HTTP Error Localidades', err);
        this.error = err;
      },
      () => console.log('HTTP Request Localidades completed')
    );
  }

  getCadenas() {
      this.sCad.getCadenasINDEC().subscribe(
      cads  =>  {
      localStorage.setItem('cadenas', JSON.stringify(cads));
      console.log('HTTP Response Cadenas', cads);
      },
      err => {
        console.log('HTTP Error Cadenas', err);
        this.error = err;
      },
      () => console.log('HTTP Request Cadenas completed')
    );
  }

  getMenu() {
    this.sMen.getMenuResponse().subscribe(
      mens => {
        localStorage.setItem('menu', JSON.stringify(mens));
        console.log('HTTP Response Menu', mens);
      },
      err => {
        console.log('HTTP Error Menu', err);
        this.error = err;
      },
      () => console.log('HTTP Request Menu completed')
    );
  }

  ngOnInit(): void {
    /*
    this.getProductos();
    this.getCategorias();
    this.getProvincias();
    this.getLocalidades();
    this.getCadenas();
    this.getMenu();*/
  }
}
