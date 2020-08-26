import { Injectable } from '@angular/core';
import DataBase from './batabase.interface';
import { of } from 'rxjs';

@Injectable({ providedIn: "root" })
export class LocalDBService<T>  {
  items: T[] = [];
  key: number = 1;
  constructor() {}
  list() {
    return of(this.items);
  }

  add(data: T) {
    this.items.push({ ...data, key: this.key++ });
    return Promise.resolve();
  }
  update(key: string, data: T) {
    let item = this.items.find((i) => i['key'] === key);
    if (item) item = { ...data };
    return Promise.resolve();
  }
  delete(key?: string) {
    let indx = this.items.findIndex((i) => i['key'] === key);
    this.items.splice(indx, 1);
    return Promise.resolve();
  }
  set(key: string, data: T) {
    return this.update(key, data);
  }
  get(key: string) {
    let item = this.items.find((i) => i['key'] === key);
    return of(item);
  }
}
