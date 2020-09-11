import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { Store } from '@ngxs/store';
import { FollowState } from 'src/app/store/state/follow.state';
import { DeleteFollow, AddFollow } from 'src/app/store/action/follow.action';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() product: Product = null;
  @Input() mode: 'card' | 'list' = 'card';
  constructor(private store: Store) {}

  ngOnInit(): void {}
  getSizes(sizes) {
    return Object.entries(sizes).map(([s, c]) => ({
      value: s,
      muted: !c,
    }));
  }

  toggleFollow(ev: Event, key) {
    ev.stopPropagation();
    if (~this.store.selectSnapshot(FollowState.follows).indexOf(key))
      this.store.dispatch(new DeleteFollow(key));
    else this.store.dispatch(new AddFollow(key));
  }
  isFollow(key) {
    return this.store.selectSnapshot(FollowState.follows).indexOf(key) > -1;
  }
}
