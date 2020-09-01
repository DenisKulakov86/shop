import { Component, OnInit, AfterContentInit } from '@angular/core';
import { DataBaseService } from '../service/database.service';
import { Observable, Subject, BehaviorSubject, combineLatest, of } from 'rxjs';
import { Product } from '../model/product.model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  //   providers: [DataBaseService],
})
export class ShopComponent implements OnInit, AfterContentInit {
  products$: Observable<Product[]>;
  //   images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  get images$() {
    return this.products$.pipe(map((p) => p.map((p) => p.img)));
  }
  constructor(private ps: DataBaseService<Product>, private store: Store) {
    console.log('Shop Component constructor'.toLocaleUpperCase());
    store.selectSnapshot((state) => console.log(state));
    // ps.init({ path: 'products' });
  }
  ngOnInit(): void {
    // this.products$ = of(this.route.snapshot.data['products']);
    this.products$ = this.ps.list();
  }
  ngAfterContentInit() {}
}
