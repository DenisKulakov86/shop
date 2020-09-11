import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnChanges,
  DoCheck,
  SimpleChanges,
  ChangeDetectorRef,
  TemplateRef,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, pairs, of, Subject } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import {
  switchMap,
  filter,
  map,
  reduce,
  scan,
  tap,
  delay,
  take,
  share,
  shareReplay,
} from 'rxjs/operators';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Store } from '@ngxs/store';
import { ProductsState } from 'src/app/store/state/products.state';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  form: FormGroup;
  // isShowWarning = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private fb: FormBuilder,
    private el: ElementRef<any>
  ) {}
  get sizes() {
    return Object.entries(this.product.size)
      .filter(([, c]) => c > 0)
      .map(([s]) => s);
  }

  ngOnInit(): void {
    const key = this.activatedRoute.snapshot.queryParams.key;
    this.product = this.store.selectSnapshot(ProductsState.productItem(key));
    this.form = this.fb.group(
      {
        num: [
          1,
          {
            validators: [Validators.required, Validators.min(1)],
            // updateOn: 'submit',
          },
        ],
        size: [
          '',
          {
            validators: [Validators.required],
            // updateOn: 'submit',
          },
        ],
      },
      {
        validators: this.validatorNum.bind(this),
      }
    );

    this.form.valueChanges.subscribe((v) => {
      console.log(v);
      // this.isShowWarning = false;
    });
    this.form.statusChanges.subscribe((v) => {
      console.log(this.form.errors);
      console.log(v);
    });
  }

  validatorNum(cntrl: FormGroup) {
    const size = Number(cntrl.get('size').value);
    const num = cntrl.get('num').value;
    if (!size) return null;
    if (this.product.size[size] >= num) return null;
    return {
      maxNum: `Доступно ${this.product.size[size]} шт.`,
    };
  }
  submit(value) {
    console.log(this.form.get('num').errors, this.form.errors);
    this.form.markAsTouched();
    if (this.form.errors && this.form.errors['maxNum']) {
      const invalidControl = this.el.nativeElement.querySelector(
        `[formcontrolname="num"]`
      );
      invalidControl.focus();
    } else {
      for (const key of Object.keys(this.form.controls)) {
        if (this.form.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector(
            `[formcontrolname="${key}"]`
          );
          invalidControl.focus();
          break;
        }
      }
    }
    // this.isShowWarning = true;

    this.form.valid && console.log(value);
  }
}
