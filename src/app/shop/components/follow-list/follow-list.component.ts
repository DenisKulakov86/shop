import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import ItemsStore from 'src/app/shared/items.store';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Product } from 'src/app/model/product.model';
import { ProductsState } from 'src/app/store/state/products.state';

@Component({
  selector: 'app-follow-list',
  templateUrl: './follow-list.component.html',
  styleUrls: ['./follow-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FollowListComponent implements OnInit {
  @Select(ProductsState.entities<Product>()) entities: Observable<Product[]>;

  constructor(public itemsStore: ItemsStore, private store: Store) {
    // console.log(itemsStore);
  }

  ngOnInit(): void {
    // this.store.select(ProductsState.entities<Product>()).subscribe(console.log);
    // this.items$ = this.itemsStore.items$;
    // this.items$.subscribe(console.log);
  }
  load() {
    // this.store.dispatch(new GetItems());
  }
}
