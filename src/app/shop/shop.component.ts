import {
  Component,
  OnInit,
  AfterContentInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable, Subject, BehaviorSubject, combineLatest, of } from 'rxjs';
import { Product } from '../model/product.model';
import { ActivatedRoute, OutletContext, RouterOutlet } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { ProductsState } from '../store/state/products.state';
import { routeAnim } from '../animations/animate';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routeAnim],
})
export class ShopComponent {
  constructor() {}
  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData.anim;
  }
}
