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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isShowOverlay: boolean = false;
  currentProduct: Product;
  srcImg: string;

  category = ['Майки', 'Футболки', 'Бриджи', 'Спорт'];

  newProduct: Product = {
    name: 'название',
    price: 1110,
    category: '',
    color: {
      '#000': true,
      '#fff': false,
      '#C81212': true,
      '#156207': true,
    },
    size: {
      '12': false,
      '24': true,
      '32': false,
      '48': false,
      '52': false,
    },
  };

  form: FormGroup;

  closeResult = '';
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private adminService: AdminService
  ) {}

  open(title: string) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.form = this.form;
    modalRef.result.then(
      (resolve) => console.log(resolve),
      (reject) => console.log(reject)
    );
    // .result.then(
    //   (result) => {
    //     this.closeResult = `Closed with: ${result}`;
    //   },
    //   (reason) => {
    //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //   }
    // );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.min(1)]],
      size: this.fb.array([]),
      color: this.fb.array([]),
      category: [this.category[0]],
    });
  }

  patchForm(product: Product) {
    this.currentProduct = product;
    this.form.get('name').setValue(product.name);
    this.form.get('price').setValue(product.price);
    // this.form.get('category').setValue(product.category);
    this.sizeArr.clear();

    let arr = this.buildArr(product.size);
    for (let i = 0; i < arr.length; i++) {
      this.sizeArr.push(arr.at(i));
    }
    this.colorArr.clear();
    arr = this.buildArr(product.color);
    for (let i = 0; i < arr.length; i++) {
      this.colorArr.push(arr.at(i));
    }
  }

  sizeName(i) {
    return Object.keys(this.currentProduct.size)[i];
  }
  colorCode(i) {
    return Object.keys(this.currentProduct.color)[i];
  }

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

  submit(value) {
    console.log(value);

    function filler(obj: Object, val: []) {
      return Object.keys(obj).reduce((acc, key, i) => {
        acc[key] = val[i];
        return acc;
      }, {});
    }
    const formValue = Object.assign({}, value, {
      size: filler(this.currentProduct.size, value.size),
      color: filler(this.currentProduct.color, value.color),
    });
    this.currentProduct = formValue;

    console.log(formValue);
  }

  addItem() {
    this.adminService.create();
    //this.patchForm(this.newProduct);
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Новый товар';
    //modalRef.componentInstance.form = this.form;
    modalRef.result.then(
      (prod) => {
        console.log(prod);
        this.adminService.add(prod);
      },
      (val) => console.log(val)
    );
    // this.openPopup();
  }
  editItem() {
    this.patchForm(this.currentProduct);
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.title = 'Редактировать товар';
    modalRef.componentInstance.form = this.form;
    modalRef.result.then(
      (resolve) => console.log(resolve),
      (reject) => console.log(reject)
    );
    // this.openPopup();
  }
  closePopup() {
    document.body.style.overflow = 'auto';
    this.isShowOverlay = false;
  }
  openPopup() {
    document.documentElement.style.overflow = 'hidden';
    this.isShowOverlay = true;
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
}
