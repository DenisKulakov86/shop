import { Injectable } from '@angular/core';
import Order from 'src/app/model/order.model';
import { FirebaseService } from 'src/app/service/firebase.service';
import { State } from '@ngxs/store';

// @State<OrdersStateModel>({
//   name: 'Ordes',
//   defaults: {
//     items: [],
//     loading: false,
//   },
// })
// @Injectable()
// export class OrdersState extends EntitiesState<Order> {
//   constructor(private fbs: FirebaseService<Order>) {
//     super('orders', fbs);
//   }
// }
