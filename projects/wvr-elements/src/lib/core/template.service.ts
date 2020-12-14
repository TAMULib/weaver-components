import { Injectable } from '@angular/core';
import Handlebars from 'handlebars/dist/cjs/handlebars';
import * as JSON5 from 'json5';
import { WvrDataSelect } from './data-select';
import { initializeHandlebarHelpers } from './handlebars-helpers';
import { WvrDataComponent } from '../shared/wvr-data.component';
import { wvrTimeout } from '../shared/utility';

@Injectable({
  providedIn: 'root'
})
export class TemplateService<T extends WvrDataComponent> {

  constructor() {
    initializeHandlebarHelpers({});
  }

  parseProjectedContent(component: T, elem: HTMLElement): void {
    if (!component.hasWvrData()) {
      return;
    }

    wvrTimeout(() => {
      const projectedContentElem = elem.querySelector('template[wvr-compile]');
      if (!projectedContentElem) {
        return;
      }
      const valueParsed = JSON5.parse(component.getWvrData());
      const wvrDataSelects: Array<any> = Array.isArray(valueParsed) ? valueParsed : [valueParsed];

      wvrDataSelects
        .filter((s: WvrDataSelect) => !!s.manifest && !!s.entry && !!s.as)
        .forEach((s: WvrDataSelect) => {
          component.data[s.as].subscribe(d => {
            this.compile(d, s, elem, projectedContentElem as HTMLElement);
          });
        });
    });
  }

  compile(d: {}, s: WvrDataSelect, elem: HTMLElement, projectedContentElem: HTMLElement): void {
    const data = {};
    data[s.as] = d;
    const compiledContent = Handlebars.compile(projectedContentElem.innerHTML)(data);
    projectedContentElem.outerHTML = compiledContent;
  }

}
