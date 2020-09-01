import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopComponent } from './shop.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsResolver } from '../shared/shop.resolve';
import { FollowListComponent } from './components/follow-list/follow-list.component';

const childRoutes: Routes = [];

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    pathMatch: 'full',
    resolve: {
      products: ProductsResolver,
    },
    children: childRoutes,
  },
  { path: 'follow-list', component: FollowListComponent },
  { path: 'details', component: ProductDetailsComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
