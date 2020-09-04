import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  HostBinding,
  ChangeDetectionStrategy,
  Directive,
  TemplateRef,
  ContentChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { trigger, state, style } from '@angular/animations';
import { animHover } from 'src/app/shared/animate';

@Directive({
  selector: 'cardIcon',
})
export class CardIconDirective {
  // constructor(public tmpRef: ElementRef) {
    constructor(public tmpRef: TemplateRef<any>) {
    console.log(this.tmpRef);
  }
}

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  animations: [animHover],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent implements OnInit, AfterViewInit {
  isHover = true;
  @Input() product: Product = null;
  @Input() isFollow: boolean = true;
  @ContentChild(CardIconDirective, { static: false }) cardIcon: TemplateRef<
    any
  >;

  get sizes() {
    //   debugger;
    return Object.entries(this.product.size).map(([s, c]) => ({
      value: s,
      muted: !c,
    }));
  }
  constructor() {}
  ngOnInit(): void {}
  ngAfterViewInit() {
    console.log(this.cardIcon);
  }
}
