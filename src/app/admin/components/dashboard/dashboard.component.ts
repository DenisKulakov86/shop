import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  OnDestroy,
  ChangeDetectorRef,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  AbstractControl,
  FormControl,
  NgForm,
} from '@angular/forms';
import { Product, category, newProduct } from 'src/app/model/product.model';

import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { Observable, Subscribable, Subscription, of } from 'rxjs';
import { take, delay, map, tap } from 'rxjs/operators';
import { isNumber } from 'util';
import { Store, Select } from '@ngxs/store';
import {
  GetProducts,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
} from 'src/app/store/action/product.action';
import { ProductsState } from 'src/app/store/state/products.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  //   providers: [DataBaseService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;
  category = category;
  page: number = 1;
  pageSize: number = 5;
  collectionSize = 0;

  constructor(private modalService: NgbModal, private store: Store) {}

  setCategory(cat) {
    this.store.dispatch(
      new GetProducts({
        orderBy: cat ? 'category' : null,
        orderValue: cat,
      })
    );
  }

  getNumber(p: Product) {
    return Object.entries(p.size).reduce((sum, [, val]) => (sum += val), 0);
  }
  ngOnInit(): void {
    this.products$ = this.store
      .select(ProductsState.products())
      .pipe(tap((p: Product[]) => (this.collectionSize = p.length)));
  }

  ngOnDestroy() {}

  create() {
    this.openModal('Новый товар', null).then(
      (prod) => this.store.dispatch(new AddProduct(prod)), //this.ps.add(prod as Product),
      (reject) => console.log(reject)
    );
  }
  edit(key) {
    this.openModal(`Редактировать товар ${key}`, key).then(
      (edited) => this.store.dispatch(new UpdateProduct(key, edited)), //this.ps.update(key, edited),
      (reject) => console.log(reject)
    );
  }
  openModal(title, key) {
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });
    (<ModalComponent>modalRef.componentInstance).title = title;
    (<ModalComponent>modalRef.componentInstance).product$ = key
      ? (this.store.selectOnce(ProductsState.products(key)) as Observable<
          Product
        >)
      : of(newProduct);

    return modalRef.result;
  }

  delete(id) {
    this.store.dispatch(new DeleteProduct(id));
  }
  delBranch() {
    this.store.dispatch(new DeleteProduct());
  }
  getCount() {
    this.store.dispatch(new GetProducts());
    // this.page++;
    // return this.ps.getCount().pipe(tap(console.log));
    //.subscribe((val) => console.log(val));
  }
}
