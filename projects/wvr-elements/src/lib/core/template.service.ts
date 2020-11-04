import { Injectable } from '@angular/core';
import * as Handlebars from 'handlebars/dist/handlebars';
import * as JSON5 from 'json5';
import { WvrDataSelect } from './data-select';
import { WvrDataComponent } from './wvr-data-component';

@Injectable({
  providedIn: 'root'
})
export class TemplateService<T extends WvrDataComponent> {
  constructor() {
    console.log('Handlebars', Handlebars);
    // Handlebars.registerHelper('json', context => JSON.stringify(context));
  }

  parseProjectedContent(component: T, elem: HTMLElement): void {
    if (!component.hasWvrData()) {
      return;
    }

    setTimeout(() => {
      const projectedContentElem = elem.querySelector('wvre-template') as HTMLElement;
      if (!projectedContentElem) {
        return;
      }
      const valueParsed = JSON5.parse(component.getWvrData());
      const wvrDataSelects: Array<any> = Array.isArray(valueParsed) ? valueParsed : [valueParsed];

      wvrDataSelects
        .filter((s: WvrDataSelect) => !!s.manifest && !!s.entry && !!s.as)
        .forEach((s: WvrDataSelect) => {
          component.data[s.as].subscribe(d => this.compile(d, s, elem, projectedContentElem));
        });
    });
  }

  compile(d: {}, s: WvrDataSelect, elem: HTMLElement, projectedContentElem: HTMLElement): void {
    const data = {};
    data[s.as] = d;
    const compiledContent = Handlebars.compile(projectedContentElem.innerHTML)(data);
    projectedContentElem.outerHTML = compiledContent
        .replace('<!--', '')
        .replace('-->', '');
  }

}
