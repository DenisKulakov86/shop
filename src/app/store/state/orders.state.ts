import { Injectable } from '@angular/core';
import { EntitiesState } from './entities.state';
import { State } from '@ngxs/store';
@State({
  name: 'Orders',
  defaults: null,
})
@Injectable()
export class OrdersState extends EntitiesState<any> {
  constructor() {
    super('orders');
  }
}
