import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/interfaces/categoria';
import { DataSharingService } from 'src/app/services/datasharing.service';
import { Producto } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-searchfilter',
  templateUrl: './searchfilter.component.html',
  styleUrls: ['./searchfilter.component.css']
})
export class SearchfilterComponent implements OnInit {

  listaCategorias: Categoria[] = new Array();
  listaMarcas: string [] = new Array ();
  listaProvincias: string [] = new Array();
  message: string;

  loadCategories() {
    const lcat = localStorage.getItem('categorias');
    if (lcat !== null) {
      this.listaCategorias = JSON.parse(lcat);
    } else {
      this.listaCategorias = [];
    }
  }

  loadProvinces() {
    // localStorage.setItem('provincias', JSON.stringify(this.listaProvincias));
    this.listaProvincias = JSON.parse(localStorage.getItem('provincias'));
  }

  newMessage(categoria: string) {
    this.data.changeMessage(categoria);
  }

  constructor(
    private data: DataSharingService
  ) { }

  ngOnInit() {
    this.loadCategories();
    this.loadProvinces();
    this.data.currentMessage.subscribe(message => {
      this.message = message;
      this.listaMarcas = [];
      const lprod: Producto [] = JSON.parse(localStorage.getItem('productos'));
      if (lprod !== null) {
        lprod.forEach(prod => {
          if (prod.categoria === this.message) {
            this.listaMarcas.push(prod.marca);
          }
        });
      }
    });
  }

}
