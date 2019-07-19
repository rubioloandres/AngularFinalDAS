

  import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
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
    selector: 'app-pricetable',
    templateUrl: './pricetable.component.html',
    styleUrls: ['./pricetable.component.css']
  })
  export class PricetableComponent implements OnInit, OnDestroy {
  
    displayedColumns: string[] = new Array();
    precioTotalSucursal: TotalSucursal[] = new Array();
    listaSucursales: SucursalTablaPrecio[] = new Array();
    listaSucursalesOrdenadas: SucursalTablaPrecio [] = new Array();
    listaSucursalesAnterior: SucursalTablaPrecio[] = new Array();
    listaProductos: Producto[] = new Array();
    listaCadenasDisponibles: Cadena [] = new Array();
    listaCadenasNoDisponibles: CadenaSucursal [] = new Array();
    error: string;
    suscripcionProductos: Subscription;
    suscripcionCadenasService:Subscription;
    loading = true;
    ubicacion: Ubicacion;
    sucursalSeleccionada: SucursalTablaPrecio = undefined;
    indiceSucSel: number;
    screenWidth: number;
    cacheProductos:Producto[];
  
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
      const sucursal: Sucursal = this.listaSucursalesAnterior
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
      const n = this.calcularCantidadColumnas();
      this.displayedColumns = [];
      this.displayedColumns.push('item');
      let i = 1;
      while (i <= n)  {
        this.displayedColumns.push('sucursal' + i);
        i++;
      }
      this.listaSucursalesOrdenadas = this.listaSucursales.sort(  (suc1, suc2) => {
        if ( suc1.cantidadDeProductosConPrecioMasBajo > suc2.cantidadDeProductosConPrecioMasBajo) {  return -1; }
        if ( suc1.cantidadDeProductosConPrecioMasBajo < suc2.cantidadDeProductosConPrecioMasBajo) {  return 1; }
        return 0;
      });
      this.listaSucursalesAnterior = this.listaSucursalesOrdenadas;
      this.listaSucursalesOrdenadas = this.listaSucursalesOrdenadas.slice(0, 4);
    }
  
    loadCarrito() { // controlar que ocurre cuando esto es undefined o null
      this.listaProductos =  JSON.parse(localStorage.getItem('carrito'));
    }
  
    getProductoPriceBySucursal(sucursal: SucursalTablaPrecio, idProd: string) {
      const precioProd = this.listaSucursales.find( s => s === sucursal)
                             .productos.find(p => p.codigoDeBarras === idProd).precio;
      if (precioProd === 0) {
        return 'No Disponible';
      } else {
        return '$ ' + precioProd;
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
  
    cargarTablaPrecios() {
      this.suscripcionProductos = this.data.productosParacomparar.subscribe(productos => {
       this.cacheProductos = productos;
        this.compararPrecios(productos);
      });
    }
  
    compararPrecios(productos: Producto[]) {
      const codigos = new Set<string>();
      productos.forEach(p => codigos.add(p.codigoDeBarras));
      const arrcodigos = Array.from(codigos.values());
      this.suscripcionCadenasService = this.sCad.getComparacionINDEC(this.ubicacion.codigoEntidadFederal, this.ubicacion.localidad, arrcodigos.toString())
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
                  this.loadColumns();
            }, err => {
                console.log('HTTP Error Comparador ', err);
                this.error = err;
                this.loading = false;
            }, () => console.log('HTTP Request Comparador completed')
          );
    }
  
    sucursalesEmpty() {
      if (this.listaSucursalesOrdenadas.length > 0) {
        return false;
        } else {
          return true;
      }
    }
  
    calcularCantidadColumnas() {
      console.log(this.screenWidth);
      var cant_columns:number = 1;
      if (this.listaSucursales !== undefined) {
        if(this.screenWidth < 1012) {
          cant_columns = 1
        }
        if(this.screenWidth >= 1012){
          cant_columns = 2
        }
        if(this.screenWidth >= 1371){
          cant_columns = 3
        }
         
        if(this.screenWidth >= 1695){
          cant_columns = 4
        }
         
        if (this.listaSucursales.length < cant_columns ){
          return this.listaSucursales.length;
        }
        else{
          return cant_columns;
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
      this.sucursalSeleccionada = suc;
      this.indiceSucSel = indexSuc;
    }

    @HostListener('window:resize', ['$event'])
      onResize(event) {
        this.screenWidth = window.innerWidth;
        this.loadColumns();
    }
  
    constructor(
      private sCad: CadenasService,
      public  dialog: MatDialog,
      private data: DataSharingService
    ) { }
  
    ngOnInit() {
      this.screenWidth = window.innerWidth;
      this.cargarUbicacion();
      this.loadCadenas();
      this.loadCarrito();
      this.cargarTablaPrecios();
    }
  
    ngOnDestroy() {
      this.suscripcionProductos.unsubscribe();
      this.suscripcionCadenasService.unsubscribe();
    }
  }
  