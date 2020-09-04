import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { ProductsState } from 'src/app/store/state/products.state';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-shop-view',
  templateUrl: './shop-view.component.html',
  styleUrls: ['./shop-view.component.scss'],
})
export class ShopViewComponent implements OnInit {
  products$: Observable<Product[]>;
  images: string[] = [];
  isFollow;
  constructor(private route: ActivatedRoute, private store: Store) {}
  ngOnInit(): void {
    this.products$ = this.store
      .select(ProductsState.products)
      .pipe(tap((p) => setTimeout(() => (this.images = p.map((p) => p.img)))));
  }
  ngAfterContentInit() {}
  goToFollow(ev: Event) {
    ev.stopPropagation();
    this.isFollow = !this.isFollow;
  }
}
