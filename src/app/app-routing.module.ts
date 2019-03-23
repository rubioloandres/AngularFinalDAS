import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ShcartComponent } from './shcart/shcart.component';
import { PricetableComponent } from './pricetable/pricetable.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CategoriesComponent,
  },
  {
    path: 'catalogue',
    component: CatalogueComponent,
    pathMatch: 'full'
  },
  {
    path: 'cart',
    component: ShcartComponent,
    pathMatch: 'full'
  },
  {
    path: 'prices',
    component: PricetableComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
