import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { ProductsState } from 'src/app/store/state/products.state';
import { tap } from 'rxjs/operators';
import { AddFollow, DeleteFollow } from 'src/app/store/action/follow.action';
import { FollowState } from 'src/app/store/state/follow.state';

@Component({
  selector: 'app-shop-view',
  templateUrl: './shop-view.component.html',
  styleUrls: ['./shop-view.component.scss'],
})
export class ShopViewComponent implements OnInit {
  products$: Observable<Product[]>;
  images: string[] = [];

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.products$ = this.store
      .select(ProductsState.products)
      .pipe(tap((p) => setTimeout(() => (this.images = p.map((p) => p.img)))));
  }
  ngAfterContentInit() {}
  toggleFollow(ev: Event, key) {
    ev.stopPropagation();
    if (!~this.store.selectSnapshot(FollowState.follows).indexOf(key))
      this.store.dispatch(new AddFollow(key));
    else this.store.dispatch(new DeleteFollow(key));
  }
  isFollow(key) {
    return this.store.selectSnapshot(FollowState.follows).indexOf(key) > -1;
  }
}
