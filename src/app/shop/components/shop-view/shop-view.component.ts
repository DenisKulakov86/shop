import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ActivatedRoute } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { ProductsState } from 'src/app/store/state/products.state';
import { tap, map } from 'rxjs/operators';
import { AddFollow, DeleteFollow } from 'src/app/store/action/follow.action';
import { FollowState } from 'src/app/store/state/follow.state';
import { animHover } from 'src/app/animations/animate';

@Component({
  selector: 'app-shop-view',
  templateUrl: './shop-view.component.html',
  styleUrls: ['./shop-view.component.scss'],
  //   changeDetection: ChangeDetectionStrategy.OnPush,
//   animations: [animHover],
})
export class ShopViewComponent implements OnInit {
  @Select(ProductsState.products) products$: Observable<Product[]>;
  images$: Observable<string[]>;

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.images$ = this.products$.pipe(map((ap) => ap.map((p) => p.img)));
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
