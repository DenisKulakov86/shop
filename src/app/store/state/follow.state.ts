import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AddFollow, DeleteFollow } from '../action/follow.action';

@State({
  name: 'Follow',
  defaults: [],
})
@Injectable()
export class FollowState {
  @Selector()
  static follows(state: string[]) {
    return state;
  }

  @Action(AddFollow)
  add(ctx: StateContext<string[]>, { key }: AddFollow) {
    let state = ctx.getState();
    ctx.setState([...state, key]);
  }

  @Action(DeleteFollow)
  delete(ctx: StateContext<string[]>, { key }: DeleteFollow) {
    let state = ctx.getState();
    ctx.setState([...state.filter((s) => s !== key)]);
  }
}
