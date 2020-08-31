import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataBaseService } from '../service/database.service';
import { Product } from '../model/product.model';
import { SharedModule } from '../shared/shared.module';
import { FollowListComponent } from './components/follow-list/follow-list.component';

@NgModule({
  declarations: [ShopComponent, ProductCardComponent, ProductDetailsComponent, FollowListComponent],
  imports: [ShopRoutingModule, SharedModule],
  providers: [],
})
export class ShopModule {}
