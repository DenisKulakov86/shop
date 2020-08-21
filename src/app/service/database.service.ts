import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  PathReference,
} from '@angular/fire/database';
import { Observable, Subject, from } from 'rxjs';
import {
  map,
  switchMap,
  shareReplay,
  share,
  publish,
  publishReplay,
  tap,
  take,
  refCount,
  finalize,
} from 'rxjs/operators';

@Injectable()
export class DataBaseService {
  private _ref: AngularFireList<any>;
  private key: string;
  constructor(private rtdb: AngularFireDatabase) {}

  init<T>(key) {
    this.key = key;
    this._ref = this.rtdb.list<T>(key);
  }
  print() {
    console.log(`Init ${this.key.toLocaleUpperCase()}\n\r`);
  }

  getItems<T>(): Observable<T[]> {
    return this._ref.snapshotChanges().pipe(
      map((change) =>
        change.map<T>((c) => ({ ...c.payload.val(), id: c.key }))
      ),
      shareReplay(1)
    );
  }

  addItem<T>(newItem: T) {
    return this._ref.push(newItem);
  }

  updateItem<T>(key: string, newItem: T) {
    return this._ref.update(key, newItem);
  }

  deleteItem(key?) {
    return this._ref.remove(key);
  }
}
