import { Injectable } from '@angular/core';
import { DataBaseService } from './database.service';

@Injectable()
export class ShopService {
  constructor(private fdb: DataBaseService) {
    fdb.init('shop');
  }
  print() {
    this.fdb.print();
  }
}
