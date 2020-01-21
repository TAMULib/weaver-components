import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Component, Injector, ViewEncapsulation } from '@angular/core';

export abstract class WvrBaseComponent {

    protected domSanitizer: DomSanitizer;

    constructor(injector: Injector) {
        this.domSanitizer = injector.get(DomSanitizer);
    }

    public slotValidation: Map<string, string[]>;

    safe(html: string): SafeHtml {
        return this.domSanitizer.bypassSecurityTrustHtml(html);
    }

    slotChange($event) {
        const assigned: [] = $event.target.assignedNodes();
        if (!this[$event.target.name]) {
            this[$event.target.name] = new Array<HTMLElement>();
        }
        if (assigned.length != this[$event.target.name].length) {
            this[$event.target.name].length = 0;
            assigned.forEach(elem => {
                const validation = this.slotValidation.get($event.target.name);
                if (validation && validation.find(v => v === (<HTMLElement>elem).tagName))
                    this[$event.target.name].push(elem);
            });
        }
    }

}