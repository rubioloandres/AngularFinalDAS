import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../../services/datasharing.service';
import { Categoria } from './../../interfaces/categoria';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  message: string;
  listaCategorias: Categoria [] = new Array();

  loadCategorias() {
    if (localStorage.getItem('categorias') !== null) {
    const categorias: Array<Categoria> = JSON.parse(localStorage.getItem('categorias'));
    this.listaCategorias = categorias;
    } else {
      this.listaCategorias = [];
    }
  }

  newMessage(categoria: string) {
    this.data.changeMessage(categoria);
  }

  constructor(private data: DataSharingService) {   }

  ngOnInit() {
    this.loadCategorias();
    this.data.currentMessage.subscribe(message => this.message = message);
  }

}
