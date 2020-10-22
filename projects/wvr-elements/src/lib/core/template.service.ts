import { Injectable } from '@angular/core';
import * as Handlebars from 'handlebars';
import { WvrBaseComponent } from '../shared/wvr-base.component';
import * as handlebarHelpers from './handlebars-helpers';
import * as JSON5 from 'json5';
import { WvrDataSelect } from './data-select';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor() {
    Object.keys(handlebarHelpers.helpers)
      .forEach(name => {
        const helper = handlebarHelpers.helpers[name];
        Handlebars.registerHelper(name, helper);
      });
  }

  parseProjectedContent(component: WvrBaseComponent, elem: HTMLElement): void {
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
