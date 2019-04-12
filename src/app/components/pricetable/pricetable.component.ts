import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Producto, ProductoPrecio } from './../../interfaces/producto';
import { Sucursal, TotalSucursal, SucursalInfo } from './../../interfaces/sucursal';
import { Cadena, CadenaSucursal } from 'src/app/interfaces/cadena';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataSharingService } from 'src/app/services/datasharing.service';
import { Ubicacion } from 'src/app/interfaces/ubicacion';
import { CadenasDataSource } from 'src/app/data/cadenas.datasource';

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

  listaCadenasRespuesta: CadenaSucursal [] = new Array();

  codigos: string;

  loadCadenas() {
    this.listaCadenas = JSON.parse(localStorage.getItem('cadenas'));
  }

  loadSucursales() {
    /*
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
*/
  }

  loadColumns() {
    this.displayedColumns.push('item');
    for (const suc of this.listaSucursales) {
      this.displayedColumns.push('sucursal' + ( (this.listaSucursales.indexOf(suc)) + 1));
    }
    this.displayedColumns.push('star');

    console.log(this.displayedColumns);
  }

  loadProductos() {
    this.listaProductos =  JSON.parse(localStorage.getItem('carrito'));
  }

  getProductoPriceBySucursal(indexSuc: number, idProd: string) {
    const pp: ProductoPrecio[] = this.listaSucursales[indexSuc]
                                     .productos
                                     .filter(p => p.idComercial === idProd);
    if (pp.length === 0) {
      return 'No Disponible';
    } else {
      return '$ ' + pp[0].precio;
    }
  }

  getTotal(indexSuc: number) {
    const tot  = this.listaSucursales[indexSuc]
                      .productos
                      .map(p => p.precio)
                      .reduce((total, precProd) => total + precProd, 0);
    this.precioTotalSucursal.push({numeroSucursal: indexSuc, totalPrecio: tot});
    return tot;
  }

  removeProduct(idprod: string) {
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
                nombreSucursal: suc.nombreSucursal,
                direccion: suc.direccion,
                latitud: suc.lat,
                longitud: suc.lng}
    });
  }

  updateSucursales() {
    this.data.currentCodigos.subscribe(codigos => {
    this.codigos = codigos;
    const ubicacion: Ubicacion = JSON.parse(localStorage.getItem('ubicacion'));
    this.dsCad.getPreciosINDEC(ubicacion.codigoEntidadFederal
      , ubicacion.localidad
      , this.codigos.toString()
      ).subscribe( cadenas  =>  {
        console.log(cadenas);
        cadenas.forEach(cadena => {
          console.log(cadena.sucursales);
          this.listaSucursales = this.listaSucursales.concat(cadena.sucursales);
          console.log(this.listaSucursales);
        });
        this.loadColumns();
      });
    });
  }

  sucursalesEmpty() {
   if (this.listaSucursales.length > 0) {
    return false;
   } else {
     return true;
   }
  }

  constructor(
    private dsCad: CadenasDataSource,
    public dialog: MatDialog,
    private data: DataSharingService
  ) {   }

  ngOnInit() {
    this.updateSucursales();
    this.loadCadenas();
    this.loadProductos();
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
