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
  ViewEncapsulation,
} from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { trigger, state, style } from '@angular/animations';
import { animHover } from 'src/app/animations/animate';

@Directive({
  selector: '[cardIcon]',
})
export class CardIconDirective {
  constructor(public tmpRef: TemplateRef<any>) {}
  ngOnInit(): void {
    // console.log(this.tmpRef);
  }
}

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  animations: [animHover],
  changeDetection: ChangeDetectionStrategy.OnPush,
//   encapsulation: ViewEncapsulation.None,
})
export class ProductCardComponent implements OnInit, AfterViewInit {
  @Input() product: Product = null;
  @ContentChild(CardIconDirective, { static: false }) cardIcon;

  get sizes() {
    return Object.entries(this.product.size).map(([s, c]) => ({
      value: s,
      muted: !c,
    }));
  }
  constructor() {}
  ngOnInit(): void {}
  ngAfterViewInit() {}
}
