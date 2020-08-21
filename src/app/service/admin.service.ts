import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { Observable, BehaviorSubject, iif, of } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { DataBaseService } from './database.service';

export const category = ['Майки', 'Футболки', 'Бриджи', 'Спорт'];

export const newProduct: Product = {
  name: '',
  price: 0,
  number: 1,
  category: 'Майки',
  size: {
    '12': 10,
    '24': 20,
    '32': 30,
    '48': 40,
    '52': 50,
  },
  img: '',
};

@Injectable()
export class AdminService {
  ref: AngularFireList<Product>;

  constructor(private db: DataBaseService) {
    db.init('products');
  }

  print() {
    this.db.print();
  }

  add(prod: Product) {
    return this.db.addItem(prod).then((res) => {
      this.log('ADD', res);
      return res;
    });
  }

  update(id: string, prod: Product) {
    return this.db.updateItem(id, prod).then((res) => {
      this.log('UPD', res);
      return res;
    });
  }

  delete(key?: any) {
    return this.db.deleteItem(key).then((res) => {
      this.log('DEL', key);
      return res;
    });
  }

  getProdByID(id: any) {
    return iif(
      () => id,
      this.load().pipe(
        map((prods) => prods.find((p) => p.id === id)),
        take(1)
      ),
      of(newProduct)
    );
  }

  load(): Observable<Product[]> {
    return this.db.getItems<Product>().pipe(tap((res) => this.log('GET', res)));
  }

  log(operation = 'operatioin', val = null) {
    console.log(`Admin Service: ${operation}`, val);
  }
}
