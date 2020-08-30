import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { SharedModule } from './shared.module';
import { Product } from '../model/product.model';
import { DataBaseService } from '../service/database.service';
import { Observable, timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: SharedModule })
export class ProductsResolver implements Resolve<Product> {
  constructor(private service: DataBaseService<Product>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    this.service.init({ path: 'products' });
    return this.service.list().pipe(take(1)).toPromise();
  }
}
