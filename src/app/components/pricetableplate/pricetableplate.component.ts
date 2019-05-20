
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Producto, ProductoPrecio } from './../../interfaces/producto';
import { Sucursal, TotalSucursal, SucursalInfo, SucursalTablaPrecio } from './../../interfaces/sucursal';
import { Cadena, CadenaSucursal } from 'src/app/interfaces/cadena';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataSharingService } from 'src/app/services/datasharing.service';
import { Ubicacion } from 'src/app/interfaces/ubicacion';
import { CadenasService } from 'src/app/services/indec/cadenas.service';
import { ActivatedRoute } from '@angular/router';
import { ResolvedRespuestaComparador } from 'src/app/models/resolved-comparador.model';
import { resolve } from 'url';
import { DialogInfoSucursalComponent } from './../info/info.component';
import { Subscription } from 'rxjs';
import { MenuService } from 'src/app/services/indec/menu.service';

@Component({
  selector: 'app-pricetableplate',
  templateUrl: './pricetableplate.component.html',
  styleUrls: ['./pricetableplate.component.css']
})
export class PricetableplateComponent implements OnInit, OnDestroy {


  // Nombres de las columnas mostradas
  displayedColumns: string[] = new Array();

  // Nombres de las columnas disponibles para mostrar
  columnsToDisplay: string[] = new Array();

 precioTotalSucursal: TotalSucursal[] = new Array();

 // Todas las sucursales.
 listaSucursales: SucursalTablaPrecio[] = new Array();

 // Todas las sucursales ordenadas por
 listaSucursalesOrdenadas: SucursalTablaPrecio [] = new Array();

 listaProductos: Producto[] = new Array();

 listaCadenasDisponibles: Cadena [] = new Array();

 listaCadenasNoDisponibles: CadenaSucursal [] = new Array();
 error: string;

 // Suscripciones
 suscripcionPlato: Subscription;
 loading = true;
 ubicacion: Ubicacion;

 sucursalSeleccionada: SucursalTablaPrecio = undefined;
 indiceSucSel: number;

 agregarDatosSucursal(suc: Sucursal): SucursalTablaPrecio {
   const sucursalTablaPrecio: SucursalTablaPrecio = {
     idSucursal: suc.idSucursal,
     nombreSucursal: suc.nombreSucursal,
     direccion: suc.direccion,
     latitud: suc.latitud,
     longitud: suc.longitud,
     email: suc.email,
     telefono: suc.telefono,
     cuit: suc.cuit,
     localidad: suc.localidad,
     provincia: suc.provincia,
     codigoEntidadFederal: suc.codigoEntidadFederal,
     idCadena: suc.idCadena,
     productos: suc.productos,
     mejorOpcion: suc.mejorOpcion,
     cantidadDeProductosConPrecioMasBajo: suc.cantidadDeProductosConPrecioMasBajo,
     total: suc.total,
     imagenCadena: this.getCadena(suc.idCadena).imagenCadena,
     nombreCadena: this.getCadena(suc.idCadena).nombreCadena
   };
   return sucursalTablaPrecio;
 }

 agregarDatosSucursales(suc: Sucursal[]): SucursalTablaPrecio[] {
   return suc.map(s => this.agregarDatosSucursal(s));
 }

 esMejorPrecio(idCad: number, idSuc: number, idProd: string) {
   const sucursal: Sucursal = this.listaSucursales
                              .find (suc => (suc.idCadena === idCad) && (suc.idSucursal === idSuc));
   const producto = sucursal.productos.find( prod => prod.codigoDeBarras === idProd);
   if (producto !== undefined && (producto.mejorPrecio)) {
     return true;
   } else {
     return false;
   }
 }

 cadenasNoDisp() {
   if ( (this.listaCadenasNoDisponibles !== null)) {
     return true;
   }
   return false;
 }

 loadCadenas() {
   this.listaCadenasDisponibles = JSON.parse(localStorage.getItem('cadenas'));
 }

 loadColumns() {
   // Calculamos la cantidad de columnas a mostrar
   const n = this.calcularCantidadColumnas();
   // La columna que se muestra por defecto es la de los productos
   this.displayedColumns.push('item');
   // Le damos nombres a las columnas que se corresponden con las sucursales
   let i = 1;
   while (i <= n)  {
     this.displayedColumns.push('sucursal' + i);
     i++;
   }
   // Ordenamos las sucursales
   this.listaSucursalesOrdenadas = this.listaSucursales.sort(  (suc1, suc2) => {
     if ( suc1.cantidadDeProductosConPrecioMasBajo > suc2.cantidadDeProductosConPrecioMasBajo) {  return -1; }
     if ( suc1.cantidadDeProductosConPrecioMasBajo < suc2.cantidadDeProductosConPrecioMasBajo) {  return 1; }
     return 0;
   });

   i = 1;
   this.columnsToDisplay.push('item');
   while (i <= this.listaSucursalesOrdenadas.length) {
     this.columnsToDisplay.push('sucursal' + i);
     i++;
   }
   // this.listaSucursales2 = this.listaSucursalesOrdenadas.slice(0, 4);

   console.log('SucursalesOrdenadas deberian ser 4');
   console.log(this.displayedColumns);
   console.log(this.columnsToDisplay);
 }

 loadProductos() { // controlar que ocurre cuando esto es undefined o null
   this.listaProductos =  JSON.parse(localStorage.getItem('carrito'));
 }

 getProductoPriceBySucursal(indexSuc: number, idProd: string) {
   const pp: ProductoPrecio = this.listaSucursales[indexSuc]
                                    .productos
                                    .find(p => p.codigoDeBarras === idProd);
   if (pp === undefined) {
     return 'No Disponible';
   } else {
     return '$ ' + pp.precio;
   }
 }

 removeProduct(idprod: string) {
   const prodscart: Producto [] = JSON.parse(localStorage.getItem('carrito'));
   this.listaProductos = prodscart.filter(p => p.codigoDeBarras !== idprod);
   localStorage.setItem('carrito', JSON.stringify(this.listaProductos));
 }

 getCadena(id: number) {
   return this.listaCadenasDisponibles.find(cad => cad.idCadena === id);
 }

 openDialogInfo(suc: Sucursal): void {
   const cadenaSuc = this.getCadena(suc.idCadena);
   const dialogRef = this.dialog.open(DialogInfoSucursalComponent, {
     width: '500px',
     data: {   nombreCadena: cadenaSuc.nombreCadena,
               imagenCadena: cadenaSuc.imagenCadena,
               nombreSucursal: suc.nombreSucursal,
               direccion: suc.direccion,
               latitud: suc.latitud,
               longitud: suc.longitud}
   });
 }

 updateSucursales() {
   /*
   this.suscripcionCodigos = this.data.currentCodigos.subscribe(codigos => {
     if (codigos === 'default codigos') {
       this.compararPorPlato();
     } else {
       console.log(codigos);
       this.compararPrecios(codigos);
     }
   });*/
 }

 compararPorPlato() {
   this.suscripcionPlato = this.data.currentPlato.subscribe(
     idPlato => {
       if (idPlato === 0) {
         this.compararPorProducto();
       } else {
         console.log(idPlato);
         this.sMen.getPrecioPlato(this.ubicacion.codigoEntidadFederal, this.ubicacion.localidad, idPlato)
                  .subscribe(
                    cadenas => {
                      this.loading = false;
                      console.log(cadenas);
                      cadenas.forEach( cadena => {
                         if (cadena.disponible) {
                           this.listaSucursales = this.listaSucursales.concat(this.agregarDatosSucursales(cadena.sucursales));
                         } else {
                           this.listaCadenasNoDisponibles.push(cadena);
                         }
                      });
                      console.log('HTTP Response Comparador plato success');
                      console.log(this.listaSucursales);
                      this.loadColumns();
                    }, err => {
                       console.log('HTTP Error Comparador plato', err);
                       this.error = err;
                       this.loading = false;
                    }, () => console.log('HTTP Request Comparador plato completed')
                  );
       }
     }
   );
 }

 compararPorProducto() {
   /*
   this.suscripcionProducto = this.data.currentProducto.subscribe(
     producto => {
       if (producto !== undefined) {
         console.log(producto);
         this.listaProductos = new Array();
         this.listaProductos.push(producto);
         this.compararPrecios(producto.codigoDeBarras);
       }
     }
   );*/
 }

 compararPrecios(codigos: any) {
   this.sCad.getComparacionINDEC(this.ubicacion.codigoEntidadFederal, this.ubicacion.localidad, codigos.toString()   )
       .subscribe( cadenas  =>  {
               this.loading = false;
               console.log(cadenas);
               cadenas.forEach(cadena => {
                 if (cadena.disponible) {
                   this.listaSucursales = this.listaSucursales.concat(this.agregarDatosSucursales(cadena.sucursales));
                 } else {
                   this.listaCadenasNoDisponibles.push(cadena);
                 }
             });
               console.log('HTTP Response Comparador success');
               console.log(this.listaSucursales);
               this.loadColumns();
         }, err => {
             console.log('HTTP Error Comparador ', err);
             this.error = err;
             this.loading = false;
         }, () => console.log('HTTP Request Comparador completed')
       );
 }

 sucursalesEmpty() {
  if (this.listaSucursales.length > 0) {
   return false;
  } else {
    return true;
  }
 }

 calcularCantidadColumnas() {
   if (this.listaSucursales !== undefined) {// ver que ocurre cuando es  undefined
     if (this.listaSucursales.length < 4) {
       return this.listaSucursales.length;
     } else {
       return 4;
     }
   }
 }

 cargarUbicacion() {
   const ub = localStorage.getItem('ubicacion');
   if (ub !== null) {
     this.ubicacion = JSON.parse(ub);
   }
 }

 cambiarSucursalSeleccionada(suc: SucursalTablaPrecio, indexSuc: number) {
   console.log('Sucursal seleccionada: ' + suc.nombreSucursal);
   console.log('Indice suc anterior: ' + indexSuc);
   this.sucursalSeleccionada = suc;
   this.indiceSucSel = indexSuc;

   const sucAnt: SucursalTablaPrecio = this.listaSucursalesOrdenadas[indexSuc];
   console.log(sucAnt);
   this.listaSucursalesOrdenadas[indexSuc] = suc;
   console.log(this.listaSucursalesOrdenadas);
 }

 constructor(
  private sCad: CadenasService,
  private sMen: MenuService,
  public dialog: MatDialog,
  private data: DataSharingService
) { }

ngOnInit() {
  this.cargarUbicacion();
  this.loadCadenas();
  this.loadProductos();
  this.updateSucursales();
  // this.actualizarSucVisibles();
}

ngOnDestroy() {
  // this.suscripcionCodigos.unsubscribe();
  this.suscripcionPlato.unsubscribe();
  // this.suscripcionProducto.unsubscribe();
}

}
