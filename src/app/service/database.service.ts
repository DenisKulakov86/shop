import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  PathReference,
} from '@angular/fire/database';
import {
  Observable,
  Subject,
  from,
  BehaviorSubject,
  combineLatest,
} from 'rxjs';
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
import DataBase from './batabase.interface';

@Injectable()
export class DataBaseService<T> {
  private _limit$: BehaviorSubject<number> = new BehaviorSubject(10);
  private _orderByValue$: BehaviorSubject<string> = new BehaviorSubject('');
  private _path = '';
  private _orderBy = '';
  private _ref: AngularFireList<T>;
  get limit() {
    return this._limit$.value;
  }
  get orderByValue() {
    return this._orderByValue$.value;
  }

  constructor(private rtdb: AngularFireDatabase) {
    console.log('INIT DataBase Service'.toLocaleUpperCase());
  }
  init({ path, orderBy = '', limit = 10 }) {
    this._orderBy = orderBy;
    this._path = path;
    this._ref = this.rtdb.list<T>(path);
    this._limit$.next(limit);
  }
  list() {
    return combineLatest(this._orderByValue$, this._limit$).pipe(
      switchMap(([value, limit]: [string, number]) => {
        return this.rtdb
          .list<T>(this._path, (ref) => {
            let query =
              this._orderBy && value
                ? ref.orderByChild(this._orderBy).equalTo(value)
                : ref;
            query = query.limitToFirst(limit);
            return query;
          })
          .snapshotChanges()
          .pipe(
            map((chenge) => {
              return chenge.map((c) => ({ ...c.payload.val(), key: c.key }));
            })
          );
      }),
      shareReplay({ refCount: false, bufferSize: 1 }),
      tap((val) => console.log('GET LIST', val))
    );
  }
  setFilter(value: string) {
    this._orderByValue$.next(value);
  }
  setLimit(num: number) {
    this._limit$.next(num);
  }
  add(data: T) {
    return this._ref.push(data);
  }
  update(key: string, data: T) {
    return this._ref.update(key, data);
  }
  delete(key?: string) {
    return this._ref.remove(key);
  }
  set(key: string, data: T) {
    return this._ref.set(key, data);
  }
  get(key: string) {
    return this.rtdb.object<T>(`${this._path}/${key}`).valueChanges();
  }
}
