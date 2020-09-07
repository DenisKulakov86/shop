import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appHover]',
  host: {
    '(mouseenter)': 'onMouseenter()',
    '(mouseleave)': 'onMouseleave()',
  },
})
export class HoverDirective {
  @Input('appHover')
  public isAnim = true;
  isHover = false;
  @HostBinding('@animHover') get hovered() {
    if (!this.isAnim) return false;
    return this.isHover;
  }

  constructor(private el: ElementRef) {}
  onMouseenter() {
    this.isHover = true;
  }
  onMouseleave() {
    this.isHover = false;
  }
}
