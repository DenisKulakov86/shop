import { Component, OnInit } from '@angular/core';
import { ShopService } from '../service/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  title

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.title = this.shopService.title;
  }

}
