import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Producto, ProductoPrecio } from './../../interfaces/producto';
import { Sucursal, TotalSucursal, SucursalInfo } from './../../interfaces/sucursal';
import { SucursalesDataSource } from 'src/app/data/sucursales.datasource';
import { Cadena } from 'src/app/interfaces/cadena';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-pricetable',
  templateUrl: './pricetable.component.html',
  styleUrls: ['./pricetable.component.css']
})
export class PricetableComponent implements OnInit, AfterViewInit {

  displayedColumns = new Array();
  precioTotalSucursal: TotalSucursal[] = new Array();
  listaSucursales: Sucursal[] = new Array();
  listaProductos: Producto[] = new Array();
  listaCadenas: Cadena [] = new Array();

  loadCadenas() {
    this.listaCadenas = JSON.parse(localStorage.getItem('cadenas'));
  }

  loadSucursales() {
    this.listaSucursales = [
      {
        idCadena: 5, idSucursal: 1, nombre: 'Sucursal Disco I', direccion: 'dir disco 111', latitud: '-33.111', longitud: '54.35'
        , listaPreciosProductos: [
          { idProd: 1111, precio: 50, mejorPrecio: false},
          { idProd: 3333, precio: 41, mejorPrecio: false},
          { idProd: 4444, precio: 25, mejorPrecio: false},
          { idProd: 5555, precio: 7.50, mejorPrecio: false },
        ], mejor: true
      },
      {
       idCadena: 1, idSucursal: 1, nombre: 'Sucursal Walmart I', direccion: 'dir walmart 222', latitud: '-33.112', longitud: '54.36',
        listaPreciosProductos: [
        { idProd: 2222, precio: 50, mejorPrecio: false },
        { idProd: 3333, precio: 37, mejorPrecio: false },
        { idProd: 4444, precio: 25, mejorPrecio: false },
        { idProd: 6666, precio: 80, mejorPrecio: false }
        ], mejor: false
      },
      {
        idCadena: 4, idSucursal: 1, nombre: 'Sucursal Libertad I', direccion: 'dir libertad 333', latitud: '-33.1112', longitud: '54.33',
         listaPreciosProductos: [
          { idProd: 4444, precio: 23, mejorPrecio: false },
          { idProd: 6666, precio: 82, mejorPrecio: false }
         ], mejor: false
      },
      {
        idCadena: 3, idSucursal: 1, nombre: 'Sucursal Carrefour I', direccion: 'dir carrefour 444', latitud: '-33.121', longitud: '54.66',
         listaPreciosProductos: [
          { idProd: 2222, precio: 45, mejorPrecio: false },
          { idProd: 3333, precio: 37, mejorPrecio: false },
          { idProd: 4444, precio: 23, mejorPrecio: false },
          { idProd: 6666, precio: 81, mejorPrecio: false }
        ], mejor: false
      }
    ];
    /*
    this.dsSuc.getPreciosSucursalesINDEC().subscribe(suc =>
      this.listaSucursales = suc );*/
  }

  loadColumns() {
    this.displayedColumns.push('item');
    for (const suc of this.listaSucursales) {
      this.displayedColumns.push('sucursal' + ( (this.listaSucursales.indexOf(suc)) + 1));
    }
    this.displayedColumns.push('star');
  }

  loadProductos() {
    this.listaProductos =  JSON.parse(localStorage.getItem('carrito'));
  }

  getProductoPriceBySucursal(indexSuc: number, idProd: number) {
    const pp: ProductoPrecio[] = this.listaSucursales[indexSuc]
                                     .listaPreciosProductos
                                     .filter(p => p.idProd === idProd);
    if (pp.length === 0) {
      return 'No Disponible';
    } else {
      return '$ ' + pp[0].precio;
    }
  }

  getTotal(indexSuc: number) {
    const tot  = this.listaSucursales[indexSuc]
                      .listaPreciosProductos
                      .map(p => p.precio)
                      .reduce((total, precProd) => total + precProd, 0);
    this.precioTotalSucursal.push({numeroSucursal: indexSuc, totalPrecio: tot});
    return tot;
  }

  removeProduct(idprod: number) {
    const prodscart: Producto [] = JSON.parse(localStorage.getItem('carrito'));
    this.listaProductos = prodscart.filter(p => p.idComercial !== idprod);
    localStorage.setItem('carrito', JSON.stringify(this.listaProductos));
  }

  getCadena(id: number) {
    return this.listaCadenas.find(cad => cad.id === id);
  }

  openDialogInfo(suc: Sucursal): void {
    const cadenaSuc = this.getCadena(suc.idCadena);
    const dialogRef = this.dialog.open(DialogInfoSucursalComponent, {
      width: '500px',
      data: {   nombreCadena: cadenaSuc.nombre,
                imagenCadena: cadenaSuc.imagen,
                nombreSucursal: suc.nombre,
                direccion: suc.direccion,
                latitud: suc.latitud,
                longitud: suc.longitud}
    });
  }

  constructor(
    private dsSuc: SucursalesDataSource,
    public dialog: MatDialog
  ) {   }

  ngOnInit() {
    this.loadCadenas();
    this.loadSucursales();
    this.loadProductos();
    this.loadColumns();
  }

  ngAfterViewInit(): void {
  }
}

@Component({
  selector: 'app-dialog-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class DialogInfoSucursalComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogInfoSucursalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SucursalInfo) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
