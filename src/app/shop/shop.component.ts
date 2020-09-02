import {
  Component,
  OnInit,
  AfterContentInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable, Subject, BehaviorSubject, combineLatest, of } from 'rxjs';
import { Product } from '../model/product.model';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { ProductsState } from '../store/state/products.state';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  //   providers: [DataBaseService],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent implements OnInit, AfterContentInit {
  arr = [1, 2, 3, 4, 5, 6];
  products$: Observable<Product[]>;
  images: string[] = [];
  //   images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  get images$() {
    // return this.store.selectSnapshot(ProductsState.products());
    return this.products$.pipe(map((p) => p.map((p) => p.img)));
  }
  constructor(private route: ActivatedRoute, private store: Store) {}
  ngOnInit(): void {
    this.products$ = (this.store.select(ProductsState.products()) as Observable<
      Product[]
    >).pipe(tap((p) => (this.images = p.map((p) => p.img))));
  }
  ngAfterContentInit() {}
}
