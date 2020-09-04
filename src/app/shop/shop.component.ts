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
export class ShopComponent {}
