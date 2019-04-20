import { Component, OnInit} from '@angular/core';
import { LocalidadesService } from './services/indec/localidades.service';
import { CategoriasService } from './services/indec/categorias.service';
import { ProductosService } from './services/indec/productos.service';
import { ProvinciasService } from './services/indec/provincias.service';
import { CadenasService } from './services/indec/cadenas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Comparador de precios';

 constructor(
   private sCat: CategoriasService,
   private sProd: ProductosService,
   private sProv: ProvinciasService,
   private sLoc: LocalidadesService,
   private sCad: CadenasService
  ) { }

  getProductos() {
    this.sProd.getProductosResponse().subscribe(
      prods => localStorage.setItem('productos', JSON.stringify(prods))
    );
  }

  getCategorias() {
    this.sCat.getCategoriaResponse().subscribe (
      cats => localStorage.setItem('categorias', JSON.stringify(cats))
    );
  }

/*
  getProvinciasFromService() {
    this.sProv.getProvinciasINDEC().subscribe( provs  =>  {
          localStorage.setItem('provincias', JSON.stringify(provs));
    });
  }

  getLocalidadesFromService() {
    this.sLoc.getLocalidadesINDEC().subscribe( locs  =>  {
          localStorage.setItem('localidades', JSON.stringify(locs));
    });
  }

  getCadenasFromService() {
      this.sCad.getCadenasINDEC().subscribe( cads  =>  {
        localStorage.setItem('cadenas', JSON.stringify(cads));
    });
  }*/

  ngOnInit(): void {
    this.getProductos();
    this.getCategorias();
    /*this.getProductosFromService();
    this.getProvinciasFromService();
    this.getLocalidadesFromService();
    this.getCadenasFromService();*/
  }
}
