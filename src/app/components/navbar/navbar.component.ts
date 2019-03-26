import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/interfaces/categoria';
import { DataSharingService } from 'src/app/services/datasharing.service';

/**
 * @title Nested menu
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NestedMenuExampleComponent implements OnInit {

  listaProvincias: string [] = new Array();
  listaCategorias: string [] = new Array();
  message: string;
  listaCadenas = [ 'Walmart' , 'Disco' , 'Jumbo' , 'Libertad', 'Carrefour' ];

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
    const lprov: string [] = JSON.parse(localStorage.getItem('provincias'));
    if (lprov !== null) {
      this.listaProvincias = lprov;
    } else {
      this.listaProvincias = [];
    }
  }

  newMessage(categoria: string) {
    this.data.changeMessage(categoria);
  }

  constructor(
    private data: DataSharingService
   ) { }

  ngOnInit() {
    this.loadProvinces();
    this.loadCategories();
    this.data.currentMessage.subscribe(message => this.message = message);
  }

}
