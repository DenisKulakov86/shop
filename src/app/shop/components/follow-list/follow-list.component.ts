import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import ItemsStore from 'src/app/shared/items.store';
import { Observable } from 'rxjs';
import { GetItems } from 'src/app/shared/store';

@Component({
  selector: 'app-follow-list',
  templateUrl: './follow-list.component.html',
  styleUrls: ['./follow-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FollowListComponent implements OnInit {
  items$: Observable<any[]>;

  constructor(public itemsStore: ItemsStore) {
    console.log(itemsStore);
  }

  ngOnInit(): void {
    // this.items$ = this.itemsStore.items$;
  }
  load() {
    this.itemsStore.dispatch(new GetItems()).subscribe(console.log);
  }
}
