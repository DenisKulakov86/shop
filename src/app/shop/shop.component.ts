import { Component, OnInit, AfterContentInit } from '@angular/core';
import { DataBaseService } from '../service/database.service';
import { Observable, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  providers: [DataBaseService],
})
export class ShopComponent implements OnInit, AfterContentInit {
  constructor(private ps: DataBaseService<Product>) {
    ps.init({ path: 'products' });
  }
  products$: Observable<Product[]>;
  ngOnInit(): void {
    this.products$ = this.ps.list();
  }
  ngAfterContentInit() {}
}
