import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ShopComponent, ProductCardComponent, ProductDetailsComponent],
  imports: [CommonModule, ShopRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [],
})
export class ShopModule {}
