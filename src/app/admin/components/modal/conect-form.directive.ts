import { Directive, Input, ChangeDetectorRef, NgZone } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import {
  FormGroupDirective,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';

@Directive({
  selector: '[conectForm]',
})
export class ConectFormDirective {
  @Input('conectForm') set data(value: Product) {
    if (!value) return;
    this.fgd.form.addControl(
      'name',
      this.fb.control(value.name, [Validators.minLength(3)])
    );
    this.fgd.form.addControl(
      'price',
      this.fb.control(value.price, [Validators.min(1)])
    );
    this.fgd.form.addControl('category', this.fb.control(value.category));
    this.fgd.form.addControl('size', this.createFormGroup(value.size));
    this.fgd.form.addControl(
      'img',
      this.fb.control(value.img, [Validators.required, Validators.minLength(1)])
    );
  }
  constructor(private fgd: FormGroupDirective, private fb: FormBuilder) {}

  createFormGroup(size: { [key: number]: number }) {
    return Object.entries(size).reduce((fg: FormGroup, [key, val]) => {
      fg.addControl(key, this.fb.control(val, Validators.min(0)));
      return fg;
    }, this.fb.group({}));
  }
}
