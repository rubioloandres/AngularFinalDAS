import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NestedMenuExampleComponent } from './navbar/navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ShcartComponent } from './shcart/shcart.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PricetableComponent } from './pricetable/pricetable.component';
import { RestComponent } from './rest/rest.component';

import { CategoriesDataSource } from './categories/categories.datasource';
import { ProductsDataSource } from './categories/products.datasource';

import { MatProgressSpinnerModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { StorageServiceModule } from 'ngx-webstorage-service';
import { LocalStorageService } from './services/localStorage.service';

import { FactorialDatasource } from './rest/factorial.datasource';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { DataSharingService } from './services/datasharing.service';

@NgModule({
  declarations: [
    AppComponent,
    NestedMenuExampleComponent,
    SearchbarComponent,
    CatalogueComponent,
    ShcartComponent,
    PricetableComponent,
    RestComponent,
    CategoriesComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    MatMenuModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgMatSearchBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatButtonToggleModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    StorageServiceModule
  ],
  providers: [
    FactorialDatasource,
    CategoriesDataSource,
    ProductsDataSource,
    CatalogueComponent,
    LocalStorageService,
    DataSharingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
