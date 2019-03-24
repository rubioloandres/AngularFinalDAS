import { Component, OnInit } from '@angular/core';
import { Categoria } from './../interfaces/categoria';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public categoria: Categoria;

  childEventClicked(categoria: Categoria) {
    console.log(categoria.nombre);
    this.categoria = categoria;
  }

  ngOnInit() {
  }

}
