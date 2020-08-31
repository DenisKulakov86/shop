import { Injectable } from '@angular/core';
import Store from './store';

@Injectable({
  providedIn: 'root',
})
export default abstract class ItemsStore extends Store {
  constructor() {
    super();
  }
}
