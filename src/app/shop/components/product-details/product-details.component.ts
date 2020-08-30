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
import { ActivatedRoute } from '@angular/router';
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
} from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataBaseService } from 'src/app/service/database.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  providers: [DataBaseService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  form: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private ps: DataBaseService<Product>,
    private fb: FormBuilder,
    private el: ElementRef<any>
  ) {
    ps.init({ path: 'products' });
  }

  products$: Observable<Product[]>;
  obj;
  get images$() {
    console.log('GET');
    let newObj = this.products$.pipe(
      map((p) =>
        p.map((p) =>
          Object.entries(p.size)
            .filter(([, c]) => c > 0)
            .map(([s, c]) => s)
        )
      )
    );
    if (this.obj !== newObj) {
      this.obj = newObj;
      console.log('ogject change');
    }
    return newObj;
  }

  get sizes$() {
    console.log('GET');

    const key = this.activatedRoute.snapshot.params.id;
    let newObj = this.ps.get(key).pipe(
      take(1),
      map((p) =>
        Object.entries(p.size)
          .filter(([, c]) => c > 0)
          .map(([s]) => s)
      )
    );
    if (this.obj !== newObj) {
      this.obj = newObj;
      console.log('ogject change');
    }
    return newObj;
  }
  get sizes() {
    return Object.entries(this.product.size)
      .filter(([, c]) => c > 0)
      .map(([s]) => s);
  }

  ngOnInit(): void {
    this.products$ = this.ps.list();
    const key = this.activatedRoute.snapshot.params.id;
    this.ps.get(key).subscribe((p) => (this.product = p));

    this.form = this.fb.group(
      {
        size: ['', [Validators.required]],
        num: [1, [Validators.required, Validators.min(1)]],
      },
      {
        validators: this.validatorForm.bind(this),
      }
    );
    // this.sizes$.subscribe(console.log);
    this.form.valueChanges.subscribe(() => console.log(this.form.errors));
    this.form.statusChanges.subscribe(console.log);
  }
  getError() {
    if (!this.form.errors) return;
    return Object.entries(this.form.errors).reduce(
      (acc, [k, v]) => (acc += ' ' + v),
      ''
    );
  }
  validatorForm(ctl: FormGroup) {
    if (!this.product) return;
    const size = ctl.get('size').value;
    const num = ctl.get('num').value;

    for (const key of Object.keys(ctl.controls)) {
      if (ctl.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector(
          '[formcontrolname="' + key + '"]'
        );
        invalidControl.focus();
        break;
      }
    }

    if (!size) return null;
    if (this.product.size[size] >= num) return null;
    return {
      num: `Доступно ${this.product.size[size]} шт.`,
    };
  }
  submit(value) {
    console.log(this.form.get('num').errors, this.form.errors);

    //   this.form.get('sze').
    this.form.markAsTouched();
    console.log(value);
  }
}
