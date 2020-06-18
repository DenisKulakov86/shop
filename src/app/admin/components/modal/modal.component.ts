import {
  Component,
  OnInit,
  Input,
  OnChanges,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AdminService, category } from 'src/app/service/admin.service';
import { Product } from 'src/app/model/product.model';
import { Subscription, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() title: string;
  form: FormGroup;
  category = category;
  prod: Product;
  sub: Subscription;
  srcImg: string ="";

  constructor(
    public activeModal: NgbActiveModal,
    private adminServicve: AdminService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.min(1)]],
      size: this.fb.array([]),
      color: this.fb.array([]),
      category: [this.category[0]],
      img: '',
    });

    this.sub = this.adminServicve.curProd
      .pipe(tap(console.log))
      .subscribe((p) => {
        this.prod = p;
        this.patchForm(p);
      });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  sizeName(i) {
    return Object.keys(this.prod.size)[i];
  }
  colorCode(i) {
    return Object.keys(this.prod.color)[i];
  }

  loadImg(ev: Event) {
    let input = ev.target as HTMLInputElement;
    let file: File = input.files[0];
    if (!file) return;

    let reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.srcImg = <string>reader.result;
    };
  }

  patchForm(product: Product) {
    let arr;
    this.form.get('name').setValue(product.name);
    this.form.get('price').setValue(product.price);
    this.form.get('category').setValue(product.category);

    this.sizeArr.clear();
    arr = this.buildArr(product.size);
    for (let i = 0; i < arr.length; i++) {
      this.sizeArr.push(arr.at(i));
    }

    this.colorArr.clear();
    arr = this.buildArr(product.color);
    for (let i = 0; i < arr.length; i++) {
      this.colorArr.push(arr.at(i));
    }
  }

  submit(value) {}

  get sizeArr(): FormArray {
    return this.form.get('size') as FormArray;
  }
  get colorArr(): FormArray {
    return this.form.get('color') as FormArray;
  }

  buildArr(obj: Object) {
    const arr = Object.keys(obj).map((k) => this.fb.control(obj[k]));
    return this.fb.array(arr);
  }
}
