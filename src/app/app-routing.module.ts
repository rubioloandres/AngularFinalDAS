import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { CartComponent } from './components/cart/cart.component';
import { PricetableComponent } from './components/pricetable/pricetable.component';

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
    component: CartComponent,
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
