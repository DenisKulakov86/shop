import { Component, OnInit, Input } from '@angular/core';
import { FormControlName, FormGroup, FormControl } from '@angular/forms';
import { timer, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-counter',
  template: `
    <div [formGroup]="form" class="form-row">
      <button
        class=" btn btn-primary mx-1"
        type="button"
        (click)="decrement()"
        (mousedown)="autoplay('decrement')"
        (mouseup)="stopAutoplay()"
        (touchstart)="autoplay('decrement')"
        (touchend)="stopAutoplay()"
      >
        -
      </button>
      <input
        #input
        class="form-control col-3 col-sm-5"
        id="{{ id }}"
        type="number"
        min="{{ min }}"
        [formControlName]="fcn"
      />
      <button
        class="btn btn-primary mx-1 "
        type="button"
        (click)="increment()"
        (mousedown)="autoplay('increment')"
        (mouseup)="stopAutoplay()"
        (touchstart)="autoplay('increment')"
        (touchend)="stopAutoplay()"
      >
        +
      </button>
    </div>
    <div
      *ngIf="
        form.get(fcn).invalid && (form.get(fcn).dirty || form.get(fcn).touched)
      "
      class="mt-2 alert alert-warning"
      role="alert"
    >
      min {{ min }}
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
})
export class CounteComponent implements OnInit {
  @Input('step') step: number;
  @Input('fcn') fcn: string;
  @Input('id') id;
  @Input('formGroup') form: FormGroup;
  @Input('min') min;

  subAutoplay: Subscription;
  constructor() {}

  ngOnInit(): void {}
  increment() {
    const ctr = this.form.get(this.fcn);
    ctr.setValue(ctr.value + +this.step);
  }
  decrement() {
    const ctr = this.form.get(this.fcn);
    ctr.setValue(
      ctr.value - (ctr.value - +this.step < this.min ? 0 : this.step)
    );
  }
  autoplay(nfn: string) {
    this.subAutoplay = timer(500, 100).subscribe(() => this[nfn]());
  }
  stopAutoplay() {
    this.subAutoplay && this.subAutoplay.unsubscribe();
  }
}
