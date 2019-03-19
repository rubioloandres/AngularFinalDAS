import { Component, OnInit } from '@angular/core';
import { FactorialDatasource } from './factorial.datasource';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rest',
  templateUrl: './rest.component.html',
  styleUrls: ['./rest.component.css']
})
export class RestComponent implements OnInit {

  private _numeros: number[];
  public numero: string;

  constructor( private _ds: FactorialDatasource ) { }

  ngOnInit() {
  }

  get numeros(): number[] {
    return this._numeros;
  }

  calcular(form: NgForm) {
    if ( form.valid ) {
      this._ds.getFactorial(+this.numero).subscribe(nros => this._numeros = nros);
    }
  }

}

