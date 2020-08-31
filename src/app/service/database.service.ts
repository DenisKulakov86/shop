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
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product.model';

const instriment = function <T>(src: Observable<T>): Observable<T> {
  return new Observable<T>(function (obs) {
    let sub = src.subscribe(obs);
    return () => {
      console.log('unsubscribe'.toLocaleUpperCase());
      sub.unsubscribe();
    };
  });
};

@Injectable({
  providedIn: 'root',
})
export class DataBaseService<T> {
  private _limit$: BehaviorSubject<number> = new BehaviorSubject(0);
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

  constructor( private rtdb: AngularFireDatabase, private http: HttpClient) {
    console.log('INIT DataBase Service'.toLocaleUpperCase());
  }
  init({ path, orderBy = '' }) {
    this._orderBy = orderBy;
    this._path = path;
    this._ref = this.rtdb.list<T>(path);
  }
  private setOrderValue(
    ref: firebase.database.Reference,
    order: string,
    value: string
  ): firebase.database.Query {
    return order && value
      ? ref.orderByChild(this._orderBy).equalTo(value)
      : ref;
  }
  private setLimitValue(
    ref: firebase.database.Reference | firebase.database.Query,
    limit
  ): firebase.database.Query {
    return limit ? ref.limitToFirst(limit) : ref;
  }
  list() {
    const list = combineLatest(this._orderByValue$, this._limit$).pipe(
      switchMap(([value, limit]: [string, number]) => {
        return this.rtdb
          .list<T>(this._path, (ref) => {
            let query = this.setOrderValue(ref, this._orderBy, value);
            query = this.setLimitValue(query, limit);
            return query;
          })
          .snapshotChanges()
          .pipe(
            map((chenge) => {
              return chenge.map((c) => ({ ...c.payload.val(), key: c.key }));
            })
          );
      }),
      tap((val) => console.log('GET LIST', val))
      //   shareReplay({ refCount: false, bufferSize: 1 })
    );
    return instriment(list).pipe(shareReplay(1));
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
  getCount() {
    const params: HttpParams = new HttpParams().set('shallow', 'true');
    return this.http
      .get(`${environment.firebaseConfig.databaseURL}/${this._path}.json`, {
        params,
      })
      .pipe(
        tap(console.log),
        map((val: { [k: string]: boolean }) => Object.keys(val).length)
      );
  }
}
