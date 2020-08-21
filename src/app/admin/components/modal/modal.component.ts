import {
  Component,
  OnInit,
  Input,
  OnChanges,
  AfterViewInit,
  OnDestroy,
  AfterContentInit,
  ChangeDetectionStrategy,
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit, AfterContentInit {
  @Input() title: string;
  @Input() id: any;
  form: FormGroup;
  category = category;
  prod: Product = null;
  srcImg: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    // private adminServicve: AdminService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.adminServicve.print();

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.min(1)]],
      number: [1, Validators.min(1)],
      size: this.fb.array([]),
      //number: this.fb.array([]),
      color: this.fb.array([]),
      category: [this.category[0]],
    });
    let group = this.fb.group({
      
    })
  }

  ngAfterContentInit() {
    this.srcImg = this.prod.img;
    this.patchForm(this.prod);
  }

  sizeName(i) {
    return Object.keys(this.prod.size)[i];
  }
 

  loadImg(ev: Event) {
    let input = ev.target as HTMLInputElement;
    let file: File = input.files[0];
    if (!file) return;

    let reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      this.srcImg = <string>reader.result;
    };
  }

  patchForm(product: Product) {
    let arr;
    this.form.get('name').setValue(product.name);
    this.form.get('price').setValue(product.price);
    this.form.get('category').setValue(product.category);
    this.form.get('number').setValue(product.number);

    this.sizeArr.clear();
    arr = this.buildArr(product.size);
    for (let i = 0; i < arr.length; i++) {
      this.sizeArr.push(arr.at(i));
    }
  }

  submit(value) {
    function filler(obj: Object, val: []) {
      return Object.keys(obj).reduce((acc, key, i) => {
        acc[key] = val[i];
        return acc;
      }, {});
    }
    const formValue = Object.assign({}, value, {
      size: filler(this.prod.size, value.size),
      img: this.srcImg,
    });

    this.activeModal.close(formValue);
  }

  get sizeArr(): FormArray {
    return this.form.get('size') as FormArray;
  }

  buildArr(obj: Object) {
    const arr = Object.keys(obj).map((k) => this.fb.control(obj[k] ? true: false));
    return this.fb.array(arr);
  }

  isSomeSelectedSize() {
    console.log( (this.form.value['size'] as Array<boolean>).length);
    return (this.form.value['size'] as Array<boolean>).some((v) => v === true);
  }
  isAllSelectedSize() {
    return (this.form.value['size'] as Array<boolean>).every((v) => v === true);
  }
  masterToggle() {
    this.isAllSelectedSize()
      ? this.sizeArr.reset()
      : this.sizeArr.controls.forEach((cntrl) => cntrl.setValue(true));
  }
}
