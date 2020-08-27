import { Component, OnInit, Input } from '@angular/core';
import {
  FormControlName,
  FormGroup,
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { timer, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-counter',
  template: `
    <div class="form-row">
      <button
        class=" btn btn-primary mx-1"
        type="button"
        (click)="decrement()"
        (mousedown)="autoplay('decrement')"
        (mouseup)="stopAutoplay()"
        (touchstart)="autoplay('decrement')"
        (touchend)="stopAutoplay()"
        (mouseleave)="stopAutoplay()"
      >
        -
      </button>
      <input
        [ngModel]="value"
        (ngModelChange)="setValue($event)"
        [ngModelOptions]="{ updateOn: 'blur' }"
        class="form-control col-3 col-sm-5"
        id="{{ id }}"
        type="number"
        min="{{ min }}"
        max="{{ max }}"
      />
      <button
        class="btn btn-primary mx-1 "
        type="button"
        (click)="increment()"
        (mousedown)="autoplay('increment')"
        (mouseup)="stopAutoplay()"
        (touchstart)="autoplay('increment')"
        (touchend)="stopAutoplay()"
        (mouseleave)="stopAutoplay()"
      >
        +
      </button>
    </div>
  `,
  styles: [
    `
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      .custom-form-control {
        max-width: 60px;
        display: inline-block;
      }
    `,
  ],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: CounteComponent, multi: true },
  ],
})
export class CounteComponent implements OnInit, ControlValueAccessor {
  private _step: number = 1;
  private _min: number = 0;
  private _max: number = Infinity;
  @Input('step') set step(val) {
    this._step = Number(val);
  }
  @Input('value') value: number = 0;
  //   @Input('fcn') fcn: string;
  @Input('id') id;
  //   @Input('formGroup') form: FormGroup;
  @Input('min') set min(val) {
    this._min = Number(val);
  }
  @Input('max') set max(val) {
    this._max = Number(val);
  }
  onChange: Function;

  subAutoplay: Subscription;
  constructor() {}
  registerOnChange(fn) {
    this.onChange = fn;
  }
  writeValue(value) {
    this.value = Number(value);
  }
  registerOnTouched(fn) {}

  ngOnInit(): void {}
  increment() {
    this.value =
      this.value + this._step > this._max ? this._max : this.value + this._step;
    // this.value = Math.floor(this.value / this._step) * this._step;
    this.onChange(this.value);
  }
  setValue(value) {
    this.value = Math.max(value, this._min);
    this.value = Math.min(value, this._max);
    this.onChange(this.value);
  }
  decrement() {
    this.value =
      this.value - this._step < this._min ? this._min : this.value - this._step;
    this.onChange(this.value);
  }
  autoplay(fn: string) {
    this.subAutoplay = timer(500, 50).subscribe(() => this[fn]());
  }
  stopAutoplay() {
    this.subAutoplay && this.subAutoplay.unsubscribe();
  }
}
