import { AfterViewInit, Directive, ElementRef, Input } from "@angular/core";
import { projectSourceContent } from "../utility";

@Directive({
  selector: '[wvrContentProjection]'
})
export class WvrContentProjectionDirective implements AfterViewInit {

  @Input('wvrContentProjection') parentElementRef: ElementRef;

  @Input('template') template: string;

  constructor(private readonly elementRef: ElementRef) {

  }

  ngAfterViewInit() {
    projectSourceContent(this.elementRef, this.parentElementRef, `template[${this.template}]`);
  }

}
