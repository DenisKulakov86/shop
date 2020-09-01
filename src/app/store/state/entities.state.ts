import {
  State,
  Selector,
  createSelector,
  Action,
  StateContext,
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { GetItems } from '../action/entities.action';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface EntitiesStateModel<T> {
  items: T[];
  loading: boolean;
}

@State<EntitiesStateModel<any>>({
  name: 'entities',
  defaults: {
    loading: false,
    items: [1, 2, 34, 5],
  },
})
@Injectable()
export class EntitiesState {
  @Action(GetItems)
  getItems(ctx: StateContext<EntitiesStateModel<any>>) {
    return of([42, 42, 42, 42]).pipe(
      delay(1000),
      tap((v) => {
        ctx.patchState({
          items: v,
        });
      })
    );
  }
  static entities<T extends { key?: string }>(key = '') {
    return createSelector([this], (state: EntitiesStateModel<T>) => {
      return key.length
        ? state.items.filter((item) => item.key === key)
        : state.items;
    });
  }
}
