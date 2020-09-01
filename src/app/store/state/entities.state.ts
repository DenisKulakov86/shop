import {
  State,
  Selector,
  createSelector,
  Action,
  StateContext,
  Store,
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { GetItems } from '../action/entities.action';
import { of, Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import DataBase from 'src/app/service/batabase.interface';
import { FirebaseService } from 'src/app/service/firebase.service';

export interface EntitiesStateModel<T> {
  items: T[];
  loading: boolean;
}

// @State<EntitiesStateModel<any>>({
//   name: 'entities',
//   defaults: {
//     loading: false,
//     items: [1, 2, 34, 5],
//   },
// })
// @Injectable()
export class EntitiesState<T> {
  constructor(private path: string, private db?: FirebaseService<T>) {}
  @Action(GetItems)
  getItems(ctx: StateContext<EntitiesStateModel<T>>, { options }: GetItems<T>) {
    if (!this.db) return;
    ctx.patchState({ loading: true });
    return this.db.list(this.path, options).pipe(
      tap((value: T[]) => {
        ctx.setState({ items: value, loading: false });
      })
    );
  }

  static entities<T extends { key?: string }>(key: string = '') {
    return createSelector([this], (state: EntitiesStateModel<T>): T[] => {
      return key.length
        ? state.items.filter((item) => item.key === key)
        : state.items;
    });
  }
}
