import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopComponent } from './shop.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsResolver } from '../shared/shop.resolve';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    pathMatch: 'full',
    resolve: {
      products: ProductsResolver,
    },
  },
  { path: ':id', component: ProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
