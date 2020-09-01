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
import { DataBaseService } from 'src/app/service/database.service';
import { take, delay, map, tap, first } from 'rxjs/operators';
import { isNumber } from 'util';
import { Selector, Select, Store } from '@ngxs/store';
import { ProductsState } from 'src/app/store/state/products.state';
import { GetItems } from 'src/app/store/action/entities.action';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  //   providers: [DataBaseService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  //@Select(ProductsState.entities<Product>())
  products$: Observable<Product[]>;
  category = category;
  //   categoryControl: FormControl;
  limit: number;
  page: number = 1;
  pageSize: number = 5;
  collectionSize = 0;

  constructor(
    private modalService: NgbModal,
    public ps: DataBaseService<Product>,
    private store: Store
  ) {
    ps.init({ path: 'products', orderBy: 'category' });
  }
  setLimit(val: number) {
    this.limit += val;
    if (!this.limit) this.limit = 1;
    this.ps.setLimit(this.limit);
  }

  getNumber(p: Product) {
    return Object.entries(p.size).reduce((sum, [, val]) => (sum += val), 0);
  }
  filter(cat) {
    this.store.dispatch(
      new GetItems<Product>({ orderBy: 'category', orderValue: cat })
    );
  }

  ngOnInit(): void {
    // this.categoryControl = new FormControl(this.ps.orderByValue);

    this.limit = this.ps.limit;

    this.products$ = this.store
      .select(ProductsState.entities<Product>())
      .pipe(tap((products) => (this.collectionSize = products.length)));

    // this.products$.pipe(first()).subscribe(console.log);
    // this.categoryControl.valueChanges.subscribe((cat) => {
    //   this.ps.setFilter(cat);
    // });
    // this.products$ = this.ps
    //   .list()
    //   .pipe(tap((v) => (this.collectionSize = v.length)));
  }

  ngOnDestroy() {}

  create() {
    this.openModal('Новый товар', null).then(
      (prod) => this.ps.add(prod as Product),
      (reject) => console.log(reject)
    );
  }
  edit(key) {
    this.openModal(`Редактировать товар ${key}`, key).then(
      (edited) => this.ps.update(key, edited),
      (reject) => console.log(reject)
    );
  }
  openModal(title, key) {
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });
    (<ModalComponent>modalRef.componentInstance).title = title;
    (<ModalComponent>modalRef.componentInstance).product$ = this.ps
      .get(key)
      .pipe(map((p) => (p ? p : newProduct)));
    return modalRef.result;
  }

  delete(id) {
    this.ps.delete(id);
  }
  delBranch() {
    this.ps.delete();
  }
  getCount() {
    // this.page++;
    return this.ps.getCount().pipe(tap(console.log));
    //.subscribe((val) => console.log(val));
  }
}
