import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appHover]',
  host: {
    '(mouseenter)': 'onMouseenter()',
    '(mouseleave)': 'onMouseleave()',
  },
})
export class HoverDirective {
  @HostBinding('@animHover') isHover;

  constructor(private el: ElementRef) {}
  onMouseenter() {
    this.isHover = true;
  }
  onMouseleave() {
    this.isHover = false;
  }
}
