import { Injectable } from '@angular/core';
import { EntitiesState, EntitiesStateModel } from './entities.state';
import { State, Store } from '@ngxs/store';
import { Product } from 'src/app/model/product.model';
import { FirebaseService } from 'src/app/service/firebase.service';

interface ProductSateModel extends EntitiesStateModel<Product> {}

@State<ProductSateModel>({
  name: 'Products',
  defaults: {
    items: [],
    loading: false,
  },
})
@Injectable()
export class ProductsState extends EntitiesState<Product> {
  constructor(private fs: FirebaseService<Product>) {
    super('products', fs);
  }
}
