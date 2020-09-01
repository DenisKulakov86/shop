import { Injectable } from '@angular/core';
import { EntitiesState } from './entities.state';
import { State } from '@ngxs/store';
@Injectable()
export class ProductsState extends EntitiesState {
  constructor() {
    super();
  }
}
