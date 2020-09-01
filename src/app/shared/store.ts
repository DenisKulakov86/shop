import { Optional } from '@angular/core';
import DataBase from '../service/batabase.interface';
import { Subject, merge, Observable, MonoTypeOperatorFunction, of } from 'rxjs';
import {
  startWith,
  scan,
  shareReplay,
  map,
  filter,
  switchMap,
  catchError,
  take,
} from 'rxjs/operators';

interface Action {
  type: string;
  payload?: any;
}

interface State {
  items: any[];
  loading: boolean;
}

export class GetItems implements Action {
  type = 'Get Items';
  constructor() {}
}

function typeOf<T extends Action>(type: string): MonoTypeOperatorFunction<T> {
  return filter((action: T) => action.type == type);
}

export default abstract class Store {
  private stateDefault: State = {
    items: [],
    loading: false,
  };
  private action$: Subject<Action>;
  private list$: Observable<Action>;
  private dispatcher$;
  private state$: Observable<State>;

  items$: Observable<any[]>;

  constructor(@Optional() dbs?: DataBase) {
    //   Нельзя менять последовательность определения
    this.action$ = new Subject();

    this.list$ = this.action$.pipe(
      typeOf('Get Items'),
      switchMap((action) => of([1, 2, 3, 4])),
      map((payload) => ({ type: 'Get Items complite', payload }))
    );

    this.dispatcher$ = merge(this.action$, this.list$);

    this.state$ = this.dispatcher$.pipe(
      startWith(this.stateDefault),
      scan<Action, State>(this.reduser.bind(this)),
      shareReplay(1)
    );

    this.items$ = this.state$.pipe(map((s) => s.items));
  }

  private reduser(state: State, action: Action): State {
    switch (action.type) {
      case 'Get Items':
        return { ...state, loading: true };
      case 'Get Items complite':
        return {
          items: [...state.items, ...action.payload],
          loading: false,
        };
      default:
        return state;
    }
  }

  dispatch(action: Action) {
    this.action$.next(action);
    return this.state$.pipe();
  }
}
