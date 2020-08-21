import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
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
import { AdminService, newProduct } from 'src/app/service/admin.service';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { DataBaseService } from 'src/app/service/database.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [AdminService, DataBaseService],
})
export class DashboardComponent implements OnInit, OnDestroy {
  $prods: Observable<Product[]>;
  prods: Product[];
  sub: Subscription;

  constructor(
    private modalService: NgbModal,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.adminService.print();
    this.sub = this.adminService
      .load()
      .subscribe((prods) => (this.prods = prods));
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  create() {
    this.openModal('Новый товар', null).then(
      (prod) => this.adminService.add(prod as Product),
      (reject) => console.log(reject)
    );
  }
  edit(id) {
    this.openModal(`Редактировать товар ${id}`, id).then(
      (edited) => this.adminService.update(id, edited),
      (reject) => console.log(reject)
    );
  }
  openModal(title, id) {
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.prod = id
      ? this.prods.find((p) => p.id === id)
      : newProduct;
    return modalRef.result;
  }

  delete(id) {
    this.adminService.delete(id);
  }
  delBranch() {
    this.adminService.delete();
  }
}
