import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { SharedModule } from './shared.module';
import { Product } from '../model/product.model';
import { Observable, timer, of } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: SharedModule })
export class ProductsResolver implements Resolve<Product> {
  constructor() {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return of({});
  }
}
