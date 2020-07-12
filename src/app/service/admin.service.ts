import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

export const category = ['Майки', 'Футболки', 'Бриджи', 'Спорт'];

export const newProduct: Product = {
  name: '',
  price: 0,
  number: 1,
  category: 'Майки',
  color: {
    '000': true,
    fff: false,
    C81212: true,
    '156207': true,
  },
  size: {
    '12': false,
    '24': true,
    '32': false,
    '48': false,
    '52': false,
  },
  img: '',
};

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  ref: AngularFireList<Product>;
  private _prods: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  private _curProd: BehaviorSubject<Product> = new BehaviorSubject(newProduct);

  get curProd() {
    return this._curProd.asObservable();
  }
  get prods(): Observable<Product[]> {
    return this._prods.asObservable().pipe(tap(console.log));
  }

  constructor(private db: AngularFireDatabase) {
    this.ref = db.list<Product>('products');
  }

  create() {
    this._curProd.next(newProduct);
  }
  edit(id) {
    const prods = this._prods.getValue();
    let finded = prods.find((p) => p.id == id);
    if (finded) this._curProd.next(finded);
  }

  add(prod: Product) {
    console.log(prod);

    this.ref.push(prod).then((res) => this.log('add', res));
    //let prods = this._prods.getValue();
    //prod.id = Math.max(...prods.map((p) => p.id), 0) + 1;
    //prods.push(prod);
    //this._prods.next(prods);
    //console.log(prods);
  }

  update(id, prod: Product) {
    this.ref.update(id, prod);
    // let prods = this._prods.getValue();
    // let ind = prods.findIndex((p) => p.id === id);
    // if (~ind) {
    //   prods[ind] = { ...prod, id };
    //   this._prods.next(prods);
    // }
  }
  load(): Observable<Product[]> {
    this._prods.next([]);
    return this.ref.snapshotChanges().pipe(
      map((change) => change.map((c) => ({ ...c.payload.val(), id: c.key }))),
      tap((res) => this.log('load', res))
      //   .tap((res) => console.log(res))
    );
  }

  log(operation = 'operatioin', val = null) {
    console.log(`Admin Service: ${operation}`, val);
  }
}
