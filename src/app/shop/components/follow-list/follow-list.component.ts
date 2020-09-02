import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Product } from 'src/app/model/product.model';
import { ProductsState } from 'src/app/store/state/products.state';

@Component({
  selector: 'app-follow-list',
  templateUrl: './follow-list.component.html',
  styleUrls: ['./follow-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FollowListComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}
  load() {}
}
