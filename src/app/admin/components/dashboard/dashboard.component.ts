import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isShowOverlay: boolean = false;

  size = {
    '12': false,
    '24': true,
    '32': false,
    '48': false,
    '52': false,
  };
  color = {
    '#333': false,
    '#000': true,
    '#fff': false,
  };

  form: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['name', [Validators.required, Validators.minLength(3)]],
      price: [1, [Validators.min(1)]],
      size: this.buildProp(this.size),
      color: this.buildProp(this.color),
    });
  }

  sizeName(i) {
    return Object.keys(this.size)[i];
  }

  get sizeArr(): FormArray {
    return this.form.get('size') as FormArray;
  }
  get colorArr(): FormArray {
    return this.form.get('color') as FormArray;
  }

  buildProp(obj: Object) {
    const arr = Object.keys(obj).map((k) => this.fb.control(obj[k]));
    return this.fb.array(arr);
  }

  submit(value) {
    function fill(obj: Object, value: Object | []) {
      return Object.keys(obj).reduce((acc, key, i) => {
        acc[key] = value[i];
        return acc;
      }, {});
    }
    const formValue = Object.assign({}, value, {
      size: fill(this.size, value.size),
      color: fill(this.color, value.color),
    });

    console.log(formValue);
  }

  addItem() {
    this.openPopup();
  }
  closePopup() {
    document.body.style.overflow = 'auto';
    this.isShowOverlay = false;
  }
  openPopup() {
    document.body.style.overflow = 'hidden';
    this.isShowOverlay = true;
  }
}
