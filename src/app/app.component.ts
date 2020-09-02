import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetItems } from './store/action/entities.action';
import { Product } from './model/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store) {
    this.store.dispatch(new GetItems<Product>());
  }
}
