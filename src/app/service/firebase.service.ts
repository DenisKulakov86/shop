import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import DataBase from '../model/database.model';
import { map, switchMap, startWith } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';

interface Filter<T> {
  orderBy?: keyof T;
  orderValue?: T[keyof T];
  limit?: number;
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseService<T> implements DataBase<T> {
  filter$: BehaviorSubject<Filter<T>> = new BehaviorSubject({});
  constructor(private rtdb: AngularFireDatabase) {}

  setFilter(value: Filter<T> = {}) {
    this.filter$.next(value);
  }

  list(path) {
    return this.filter$.pipe(
      switchMap((f: Filter<T>) => {
        return this.rtdb
          .list<T>(path, (ref) => {
            let query: firebase.database.Query = ref;
            query = f.orderBy ? query.orderByChild(String(f.orderBy)) : query;
            query = f.orderValue ? query.equalTo(String(f.orderValue)) : query;
            query = f.limit ? query.limitToFirst(f.limit) : query;
            return query;
          })
          .snapshotChanges();
      }),
      map((change) => {
        return change.map((c) => ({ ...c.payload.val(), key: c.key }));
      })
    );
  }
  add(path: string, value: T) {
    return this.rtdb.list<T>(path).push(value);
  }
  update(path: string, key: string, value: T) {
    return this.rtdb.list<T>(path).update(key, value);
  }
  delete(path: string, key: string = '') {
    return this.rtdb.list<T>(path).remove(key);
  }
}
