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
  selector: '[cardItem]',
})
export class CardItemDirective {}

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
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss'],
  animations: [animHover],
  changeDetection: ChangeDetectionStrategy.OnPush,
  //   encapsulation: ViewEncapsulation.None,
})
export class ProductsViewComponent implements OnInit, AfterViewInit {
  @Input() products: Product[] = [];
  @Input() product: Product = null;
  @ContentChild(CardIconDirective, { static: false }) cardIcon;
  @ContentChild(CardItemDirective, { read: TemplateRef }) cardItem;

  get sizes() {
    return Object.entries(this.product.size).map(([s, c]) => ({
      value: s,
      muted: !c,
    }));
  }
  constructor() {}
  ngOnInit(): void {}
  ngAfterViewInit() {
    console.log(this.cardItem, this.products);
  }
}
