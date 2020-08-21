import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ShopService } from '../service/shop.service';
import { DataBaseService } from '../service/database.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  providers:[ShopService, DataBaseService]
})
export class ShopComponent implements OnInit, AfterContentInit {
  constructor(private shopService: ShopService) {}

  ngOnInit(): void {}
  ngAfterContentInit() {
    this.shopService.print();
  }
}
