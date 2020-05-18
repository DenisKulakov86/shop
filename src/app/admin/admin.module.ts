import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrdersComponent } from './components/orders/orders.component';

@NgModule({
  declarations: [AdminComponent, DashboardComponent, OrdersComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
