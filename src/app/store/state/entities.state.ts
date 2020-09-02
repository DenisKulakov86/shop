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
import DataBase from 'src/app/model/database.model';

export interface EntitiesStateModel<T> {
  items: T[];
  loading: boolean;
}

export abstract class EntitiesState<T> {
  constructor(private path: string, private dbs: DataBase<T> = null) {}
  @Action(GetItems)
  getItems(ctx: StateContext<EntitiesStateModel<T>>, { options }: GetItems<T>) {
    if (!this.dbs) return;
    ctx.patchState({ loading: true });
    return this.dbs.list(this.path, options).pipe(
      tap((items) => {
        ctx.patchState({ items: items.reverse(), loading: false });
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
