import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { Observable, BehaviorSubject } from 'rxjs';

export const category = ['Майки', 'Футболки', 'Бриджи', 'Спорт'];

export const newProduct: Product = {
  name: '',
  price: 0,
  category: '',
  color: {
    '#000': true,
    '#fff': false,
    '#C81212': true,
    '#156207': true,
  },
  size: {
    '12': false,
    '24': true,
    '32': false,
    '48': false,
    '52': false,
  },
};

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  title = 'admin SERVICE works';
  private _prods: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  private _curProd: BehaviorSubject<Product> = new BehaviorSubject(newProduct);

  get curProd() {
    return this._curProd.asObservable();
  }
  get prods() {
    return this._prods.asObservable();
  }

  constructor() {}

  create() {
    this._curProd.next(newProduct);
  }
  edit(i) {
    const prods = this._prods.getValue();
    this._curProd.next(prods[i]);
  }

  add(prod: Product) {
    let prods = this._prods.getValue();
    prod.id = Math.max(...prods.map((p) => p.id), 0) + 1;
    prods.push(prod);
    this._prods.next(prods);
  }
  update(prod: Product) {
    let prods = this._prods.getValue();
    let ind = prods.findIndex((p) => p.id === prod.id);
    if (~ind) {
      prods[ind] = prod;
      this._prods.next(prods);
    }
  }
  load() {
    this._prods.next([]);
  }
}
