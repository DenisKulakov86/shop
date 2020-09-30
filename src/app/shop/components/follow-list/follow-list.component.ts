import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  AfterContentInit,
  SimpleChanges,
} from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Select, Store, Selector } from '@ngxs/store';
import { Product } from 'src/app/model/product.model';
import { ProductsState } from 'src/app/store/state/products.state';
import { FollowState } from 'src/app/store/state/follow.state';
import { map, take, tap } from 'rxjs/operators';
import { DeleteFollow } from 'src/app/store/action/follow.action';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-follow-list',
  templateUrl: './follow-list.component.html',
  styleUrls: ['./follow-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  //   encapsulation: ViewEncapsulation.None,
})
export class FollowListComponent implements OnInit {
  @Select(ProductsState.products) products$: Observable<Product[]>;
  @Select(FollowState.follows) follows$: Observable<string[]>;
  followProducts$: Observable<Product[]>;
  sizeCtrls: FormControl[] = [];
  sizes = [];
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.followProducts$ = combineLatest([this.products$, this.follows$]).pipe(
      map(([prods, follows]) =>
        prods.filter((p) => follows.indexOf(p.key) > -1)
      ),
      tap((follows) => {
        this.sizeCtrls = follows.reduce((acc, p) => {
		  acc.push(new FormControl(Object.keys(p.size)[0]));
		  return acc;
        }, []);
        console.log(this.sizeCtrls);
      })
    );
  }
  deleteFollow(key) {
    this.store.dispatch(new DeleteFollow(key));
  }
  getSizes(sizes) {
    return Object.entries(sizes).map(([s, c]) => ({
      value: s,
      muted: !c,
    }));
  }
  toBasket(value) {
    console.log(value);
  }
  //get
}
