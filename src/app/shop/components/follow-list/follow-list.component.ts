import { Component, OnInit } from '@angular/core';
import ItemsStore from 'src/app/shared/items.store';
import { Observable } from 'rxjs';
import { GetItems } from 'src/app/shared/store';

@Component({
  selector: 'app-follow-list',
  templateUrl: './follow-list.component.html',
  styleUrls: ['./follow-list.component.scss'],
})
export class FollowListComponent implements OnInit {
  items$: Observable<any[]>;

  constructor(public itemsStore: ItemsStore) {
    console.log(itemsStore);
  }

  ngOnInit(): void {
    this.items$ = this.itemsStore.items$;
    this.items$.subscribe(console.log);
  }
  load() {
    debugger;
    this.itemsStore.dispatch(new GetItems());
  }
}
