import { NgModule, APP_INITIALIZER } from '@angular/core';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import {
  ProductCardComponent,
  CardIconDirective,
} from './components/product-card/product-card.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SharedModule } from '../shared/shared.module';
import { FollowListComponent } from './components/follow-list/follow-list.component';
import { HeaderComponent } from './components/header/header.component';
import { ShopViewComponent } from './components/shop-view/shop-view.component';
import { BasketComponent } from './components/basket/basket.component';

@NgModule({
  declarations: [
    ShopComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    FollowListComponent,
    HeaderComponent,
    ShopViewComponent,
    BasketComponent,
    CardIconDirective,
  ],
  imports: [
    ShopRoutingModule,
    SharedModule,
    // NgxsModule.forFeature([ProductsState]),
  ],
  providers: [],
})
export class ShopModule {}
