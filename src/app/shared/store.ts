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
  private action$: Subject<Action> = new Subject();
  private list$: Observable<Action>;
  private state$: Observable<State>;
  private dispatcher$;
  constructor(@Optional() dbs?: DataBase) {
    this.dispatcher$ = merge(this.action$, this.list$);
    this.state$ = this.dispatcher$.pipe(
      startWith(this.stateDefault),
      scan<Action, State>(this.reduser.bind(this)),
      shareReplay(1)
    );

    this.list$ = this.action$.pipe(
      typeOf('Get Items'),
      switchMap((action) => of([1, 2, 3, 4])),
      map((payload) => ({ type: 'Get Items complite', payload }))
    );
  }

  private reduser(state: State, action: Action): State {
    switch (action.type) {
      case 'Get Items':
        return { ...state, loading: true };
      case 'Get Items complite':
        return {
          items: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  }

  get items$() {
    try {
      return this.state$.pipe(map((s) => s.items));
    } catch (error) {
      console.log(error);
    }
  }

  dispatch(action: Action) {
    this.action$.next(action);
    return this.state$;
  }
}
