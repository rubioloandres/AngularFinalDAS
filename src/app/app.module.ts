import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NestedMenuExampleComponent } from './components/navbar/navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { ShcartComponent } from './components/shcart/shcart.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PricetableComponent } from './components/pricetable/pricetable.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { CategoriesDataSource } from './data/categories.datasource';
import { ProductsDataSource } from './data/products.datasource';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { LocalStorageService } from './services/localStorage.service';
import { GeoLocationService } from './services/geoLocation.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesComponent } from './components/categories/categories.component';
import { DataSharingService } from './services/datasharing.service';
import { SearchfilterComponent } from './components/searchfilter/searchfilter.component';

import { LOCALE_ID, Inject } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from "@angular/common/locales/es-419";
import localeEn from "@angular/common/locales/en";
import { ProvincesDataSource } from './data/provincias.datasource';
import { LocalidadesDataSource } from './data/localidades.datasource';

@NgModule({
  declarations: [
    AppComponent,
    NestedMenuExampleComponent,
    SearchbarComponent,
    CatalogueComponent,
    ShcartComponent,
    PricetableComponent,
    CategoriesComponent,
    SearchfilterComponent
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
    StorageServiceModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule,
    CarouselModule
  ],
  providers: [
    CategoriesDataSource,
    ProductsDataSource,
    CatalogueComponent,
    LocalStorageService,
    DataSharingService,
    GeoLocationService,
    ProvincesDataSource,
    LocalidadesDataSource
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject(LOCALE_ID) locale: string) {
    registerLocaleData(locale === 'es' ? localeEs : localeEn);
    // registerLocaleData(localeEn);
   }
}
