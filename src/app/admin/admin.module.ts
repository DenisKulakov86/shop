import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrdersComponent } from './components/orders/orders.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './components/modal/modal.component';
import { ConectFormDirective } from './components/modal/conect-form.directive';
import { CounteComponent } from './components/modal/counter.component';
import { FileUploadComponent } from './components/modal/file-upload.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    OrdersComponent,
    ModalComponent,
    ConectFormDirective,
    CounteComponent,
    FileUploadComponent,
  ],
  imports: [AdminRoutingModule, ReactiveFormsModule, SharedModule],
  providers: [],
})
export class AdminModule {}
