import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Component, Injector, ViewEncapsulation, ElementRef } from '@angular/core';

export abstract class WvrBaseComponent {

  protected domSanitizer: DomSanitizer;
  public slotValidation: Map<string, string[]>;


  constructor(injector: Injector) {
    this.domSanitizer = injector.get(DomSanitizer);
  }

  safe(html: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }

  slotChange($event) {
    const assigned: HTMLElement[] = $event.target.assignedElements();
    assigned.forEach(elem => {
      this.slotValidation.forEach((validation, key) => {
        if (this[key] && validation.find(v => v === (<HTMLElement>elem).tagName)) {
          this[key].push(elem);
        }
      });
    });
  }

}