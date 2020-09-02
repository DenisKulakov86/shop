import { Injectable } from '@angular/core';
import { EntitiesState, EntitiesStateModel } from './entities.state';
import { State, Action } from '@ngxs/store';
import { Product } from 'src/app/model/product.model';
import { FirebaseService } from 'src/app/service/firebase.service';
import { AddItem } from '../action/entities.action';

export interface ProductsStateModel<T = Product>
  extends EntitiesStateModel<T> {}
@State<ProductsStateModel>({
  name: 'Products',
  defaults: {
    items: [],
    loading: false,
  },
})
@Injectable()
export class ProductsState<T = Product> extends EntitiesState<T> {
  constructor(private fbs: FirebaseService<T>) {
    super('products', fbs);
  }

  @Action(AddItem)
  addItem(ctx: EntitiesStateModel<T>, { data }: AddItem<T>) {
    return this.fbs.add('products', data).then((res)=>{
      console.log(res);
      
    })
  }
}
