import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Component, Injector, ViewEncapsulation } from '@angular/core';

export abstract class WvrBaseComponent {

    constructor(protected domSanitizer: DomSanitizer) { }

    protected slotValidation = {
        'browNavLinks': ["WVR-LINK"],
        'bottomNavLinks': ["WVR-LINK"]
    }

    safe(html: string): SafeHtml {
        return this.domSanitizer.bypassSecurityTrustHtml(html);
    }

    slotChange($event) {
        const assigned: [] = $event.target.assignedNodes();
        if (assigned.length != this[$event.target.name].length) {
            this[$event.target.name].length = 0;
            assigned.forEach(elem => {
                if (this.slotValidation[$event.target.name].find(v => v === (<HTMLElement>elem).tagName))
                    this[$event.target.name].push(elem);
            });
        }
    }

}