import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { OrderService } from 'src/app/service/order.service';
import { DataBaseService } from 'src/app/service/database.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [OrderService, DataBaseService],
})
export class OrdersComponent implements OnInit {
  constructor(private orders: OrderService) {}

  ngOnInit(): void {
    this.orders.print();
  }
}
