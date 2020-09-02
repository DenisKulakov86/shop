import { NgModule, APP_INITIALIZER } from '@angular/core';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SharedModule } from '../shared/shared.module';
import { FollowListComponent } from './components/follow-list/follow-list.component';
import { NgxsModule } from '@ngxs/store';
import { ProductsState } from '../store/state/products.state';

@NgModule({
  declarations: [
    ShopComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    FollowListComponent,
  ],
  imports: [
    ShopRoutingModule,
    SharedModule,
    NgxsModule.forFeature([ProductsState]),
  ],
  providers: [],
})
export class ShopModule {}
