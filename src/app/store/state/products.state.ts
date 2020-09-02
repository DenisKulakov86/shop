import { Injectable } from '@angular/core';
import {
  State,
  Action,
  NgxsAfterBootstrap,
  Store,
  StateContext,
  NgxsOnInit,
  Selector,
  createSelector,
} from '@ngxs/store';
import { Product } from 'src/app/model/product.model';
import { FirebaseService } from 'src/app/service/firebase.service';
import { environment } from 'src/environments/environment';
import {
  AddProduct,
  UpdateProduct,
  DeleteProduct,
  GetProducts,
  LoadProducts,
} from '../action/product.action';
import { tap, take } from 'rxjs/operators';

export interface ProductsStateModel {
  products: Product[];
  loading: boolean;
}
@State<ProductsStateModel>({
  name: 'Products',
  defaults: {
    products: [],
    loading: false,
  },
})
@Injectable()
export class ProductsState implements NgxsAfterBootstrap, NgxsOnInit {
  private path = environment.paths.products;
  constructor(private fbs: FirebaseService<Product>, private store: Store) {}

  ngxsOnInit(ctx: StateContext<ProductsStateModel>) {
    this.fbs
      .list(this.path)
      .subscribe((products) => this.store.dispatch(new LoadProducts(products)));
  }

  ngxsAfterBootstrap() {}

  static products(key: string = '') {
    return createSelector([this], (state: ProductsStateModel) => {
      return key.length
        ? state.products.find((p) => p.key === key)
        : state.products;
    });
  }

  @Action(GetProducts)
  getItems(ctx: StateContext<ProductsStateModel>, { options }: GetProducts) {
    ctx.patchState({ loading: true });
    this.fbs.setFilter(options);
  }

  @Action(LoadProducts)
  load(ctx: StateContext<ProductsStateModel>, { products }: LoadProducts) {
    ctx.patchState({
      products: products.reverse(),
      loading: true,
    });
  }
  @Action(AddProduct)
  add(ctx, { data }: AddProduct) {
    return this.fbs.add(this.path, data);
  }
  @Action(UpdateProduct)
  update(ctx, { key, data }: UpdateProduct) {
    return this.fbs.update(this.path, key, data);
  }
  @Action(DeleteProduct)
  delete(ctx, { key }: DeleteProduct) {
    return this.fbs.delete(key);
  }
}
