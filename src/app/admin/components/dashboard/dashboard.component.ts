import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { Product } from 'src/app/model/product.model';

import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { AdminService } from 'src/app/service/admin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  $prods: Observable<Product[]>;

  constructor(
    private modalService: NgbModal,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.$prods = this.adminService.load();
  }

  create() {
    this.adminService.create();
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Новый товар';
    modalRef.result.then(
      (prod) => this.adminService.add(prod as Product),
      (val) => console.log(val)
    );
    // this.openPopup();
  }
  edit(id) {
    this.adminService.edit(id);
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = `Редактировать товар ${id}`;

    modalRef.result.then(
      (edited) => this.adminService.update(id, edited),
      (reject) => console.log(reject)
    );
    // this.openPopup();
  }
}
