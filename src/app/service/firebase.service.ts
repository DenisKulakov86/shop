import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import DataBase from '../model/database.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService<T> implements DataBase<T> {
  constructor(private rtdb: AngularFireDatabase) {}

  list(
    path,
    {
      orderBy,
      orderValue,
      limit,
    }: { orderBy?: keyof T; orderValue: T[keyof T]; limit?: number }
  ) {
    return this.rtdb
      .list<T>(path, (ref) => {
        let query: firebase.database.Query = ref;
        query = orderBy ? query.orderByChild(String(orderBy)) : query;
        query = orderValue ? query.equalTo(String(orderValue)) : query;
        query = limit ? query.limitToFirst(limit) : query;
        return query;
      })
      .snapshotChanges()
      .pipe(
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
