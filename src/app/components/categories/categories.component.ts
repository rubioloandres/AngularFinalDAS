import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../../services/datasharing.service';
import { Categoria } from './../../interfaces/categoria';
import { ActivatedRoute } from '@angular/router';
import { ResolvedCategorias } from 'src/app/models/resolved-categories.model';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  message: string;
  error: string;
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
/*
  constructor(private data: DataSharingService) {   }*/

  constructor(
    private data: DataSharingService,
    private route: ActivatedRoute
    ) {
     /* const resolvedCategorias: ResolvedCategorias = this.listaCategorias = this.route.snapshot.data['categorias'];
      if (resolvedCategorias.error == null) {
        this.listaCategorias = resolvedCategorias.categorias;
      } else {
        this.error = resolvedCategorias.error;
      }*/
    }

  ngOnInit() {
    this.loadCategorias();
    this.data.currentMessage.subscribe(message => this.message = message);
  }

}


