import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService<T> {
  constructor(private rtdb: AngularFireDatabase) {}

  list(
    path: string,
    {
      orderBy,
      orderValue,
      limit,
    }: { orderBy?: keyof T; orderValue?: T[keyof T]; limit?: number } = {}
  ) {
    return this.rtdb
      .list<T>(path, (ref) => {
        let query: firebase.database.Query = ref;
        if (orderBy) query = query.orderByChild(String(orderBy));
        if (orderValue) query = query.equalTo(String(orderValue));
        if (limit) query = query.limitToFirst(limit);
        return query;
      })
      .snapshotChanges()
      .pipe(
        map((chenge) => {
        //   debugger;
          return chenge.map((c) => ({ ...c.payload.val(), key: c.key }));
        })
      );
  }

  add(path: string, value: T) {
    return this.rtdb.list<T>(path).push(value);
  }
  update(path: string, key: string, value: T) {
    return this.rtdb.list<T>(path).update(key, value);
  }
  delete(path: string, key?: string) {
    return this.rtdb.list<T>(path).remove(key);
  }
  set(path: string, key: string, value: T) {
    return this.rtdb.list<T>(path).set(key, value);
  }
  get(path: string, key: string) {
    return this.rtdb.object(path + '/' + key);
  }
}
