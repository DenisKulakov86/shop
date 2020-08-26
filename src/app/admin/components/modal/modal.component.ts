import {
  Component,
  OnInit,
  Input,
  OnChanges,
  AfterViewInit,
  OnDestroy,
  AfterContentInit,
  ChangeDetectionStrategy,
  SimpleChanges,
  AfterContentChecked,
  AfterViewChecked,
  DoCheck,
  ChangeDetectorRef,
  HostListener,
  Inject,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Product, category } from 'src/app/model/product.model';
import {
  Subscription,
  pipe,
  Subject,
  of,
  BehaviorSubject,
  timer,
  Observable,
} from 'rxjs';
import { tap, delay, map, mapTo, shareReplay, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  providers: [],
  //   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit {
  @Input() title: string;
  form: FormGroup = null;
  category = category;
  @Input() product$: Observable<Product>;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}
  ngOnInit() {
    this.form = this.fb.group({});
    // this.form.valueChanges.subscribe(console.log);
    // this.form.statusChanges.subscribe(console.log);
  }

  submit(value: Product) {
    this.form.markAsTouched();
    this.form.valid && this.activeModal.close(value);
  }
  get ctrSizeNameArr() {
    return Object.keys(this.form.get('size').value);
  }

  //   isSomeSelectedSize() {
  //     return (this.form.value['size'] as Array<boolean>).some((v) => v === true);
  //   }
  //   isAllSelectedSize() {
  //     return (
  //       !!(this.form.value['size'] as Array<boolean>).length &&
  //       (this.form.value['size'] as Array<boolean>).every((v) => v === true)
  //     );
  //   }
  //   masterToggle() {
  //     this.isAllSelectedSize()
  //       ? this.sizeArr.reset()
  //       : this.sizeArr.controls.forEach((cntrl) => cntrl.setValue(true));
  //   }
}
