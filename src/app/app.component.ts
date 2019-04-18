import { Component, OnInit} from '@angular/core';
import { LocalidadesDataSource } from './data/localidades.datasource';
import { CategoriesDataSource } from './data/categories.datasource';
import { ProductsDataSource } from './data/products.datasource';
import { ProvincesDataSource } from './data/provincias.datasource';
import { CadenasDataSource } from './data/cadenas.datasource';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Comparador de precios';

 constructor(
   private dsCat: CategoriesDataSource, // TODO: cambiar nombre a datasource "CategoriasDataSource"
   private dsProd: ProductsDataSource,  // TODO: cambiar nombre a datasource "ProductosDataSource"
   private dsProv: ProvincesDataSource, // TODO: cambiar nombre a datasource "ProvinciasDataSource"
   private dsLoc: LocalidadesDataSource,
   private dsCad: CadenasDataSource
  ) { }

  getProductosFromService() {
    this.dsProd.getProductosINDEC().subscribe( prods  =>  {
          localStorage.setItem('productos', JSON.stringify(prods));
    });
  }
  getCategoriasFromService() {
    this.dsCat.getCategoriasINDEC().subscribe( cats  =>  {
          localStorage.setItem('categorias', JSON.stringify(cats));
    });
  }

  getProvinciasFromService() {
    this.dsProv.getProvinciasINDEC().subscribe( provs  =>  {
          localStorage.setItem('provincias', JSON.stringify(provs));
    });
  }

  getLocalidadesFromService() {
    this.dsLoc.getLocalidadesINDEC().subscribe( locs  =>  {
          localStorage.setItem('localidades', JSON.stringify(locs));
    });
  }

  getCadenasFromService() {
      this.dsCad.getCadenasINDEC().subscribe( cads  =>  {
        localStorage.setItem('cadenas', JSON.stringify(cads));
    });
  }

  ngOnInit(): void {
    this.getCategoriasFromService();
    this.getProductosFromService();
    this.getProvinciasFromService();
    this.getLocalidadesFromService();
    this.getCadenasFromService();
  }
}
