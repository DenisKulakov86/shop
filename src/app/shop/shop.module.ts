import { NgModule, APP_INITIALIZER } from '@angular/core';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import {
  ProductsViewComponent,
  CardIconDirective,
  CardItemDirective,
} from './components/products-view/products-view.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SharedModule } from '../shared/shared.module';
import { FollowListComponent } from './components/follow-list/follow-list.component';
import { HeaderComponent } from './components/header/header.component';
import { ShopViewComponent } from './components/shop-view/shop-view.component';
import { BasketComponent } from './components/basket/basket.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    ShopComponent,
    ProductsViewComponent,
    ProductDetailsComponent,
    FollowListComponent,
    HeaderComponent,
    ShopViewComponent,
    BasketComponent,
    CardIconDirective,
    CardItemDirective,
    CardComponent
  ],
  imports: [
    ShopRoutingModule,
    SharedModule,
    // NgxsModule.forFeature([ProductsState]),
  ],
  providers: [],
})
export class ShopModule {}
