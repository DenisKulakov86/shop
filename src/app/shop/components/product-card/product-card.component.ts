import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product = null;

  get sizes() {
    //   debugger;
    return Object.entries(this.product.size).map(([s, c]) => ({
      value: s,
      muted: !c,
    }));
  }
  constructor() {}
  ngOnInit(): void {}
}
