import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { projectSourceContent } from '../utility';

@Directive({
  selector: '[wvrContentProjection]'
})
export class WvrContentProjectionDirective implements AfterViewInit {

  @Input('wvrContentProjection') parentElementRef: ElementRef;

  /* tslint:disable-next-line:no-input-rename */
  @Input('template') template: string;

  constructor(private readonly elementRef: ElementRef) {

  }

  ngAfterViewInit(): void {
    projectSourceContent(this.elementRef, this.parentElementRef, `template[${this.template}]`);
  }

}
