/* istanbul ignore file */

/* TODO: Issue #292. */
import * as JSON5 from 'json5';
import Handlebars from 'handlebars/dist/cjs/handlebars';
import { WvrDataSelect } from '../../core/data-select';
import { WvrDataComponent } from '../wvr-data.component';
import { wvrTimeout } from '../../shared/utility';

const wvrCompile = (d: {}, s: WvrDataSelect, elem: HTMLElement, projectedContentElem: HTMLElement): void => {
  const data = {};
  data[s.as] = d;
  const compiledContent = Handlebars.compile(projectedContentElem.innerHTML)(data);
  projectedContentElem.outerHTML = compiledContent;
};

const wvrParseProjectedContent = (component: WvrDataComponent, elem: HTMLElement): void => {
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
          wvrCompile(d, s, elem, projectedContentElem as HTMLElement);
        });
      });
  });
};

export {
  wvrCompile,
  wvrParseProjectedContent
};
