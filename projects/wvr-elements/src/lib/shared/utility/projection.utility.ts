import { ElementRef } from '@angular/core';

/**
 * Projects content within all templates into target.
 *
 * @param eRef element reference with native element to perform content projection
 * @param templateSelector input template to project
 * @param targetSelector target element to project template to
 */
const projectContent = (eRef: ElementRef, templateSelector: string, targetSelector: string): void => {
  const element: Element = eRef.nativeElement.querySelector(targetSelector);
  const templates: Array<HTMLTemplateElement> = Array.from(eRef.nativeElement.querySelectorAll(templateSelector));
  if (!!element) {
    templates.forEach((template: HTMLTemplateElement) => {
      const clone: Node = template.children.length === 0 && template.content.children.length > 0
        ? template.content.cloneNode(true)
        : template;
      Array.from((clone as Element).children)
        .forEach((elem: Element) => {
          element.appendChild(elem);
        });
    });
  }
  // hide target element if nothing to project
  if (!!element && !templates.length) {
    (element as HTMLElement).hidden = true;
  }
};

/**
 * When projected content requires being preserved but not rendered.
 * This ratains two-way binding.
 *
 * @param eRef element reference with native element to preserve projected content
 * @param templateSelector template in which to preserve the content on
 * @param targetSelector target element to preserve its content
 */
const preserveContent = (eRef: ElementRef, templateSelector: string, targetSelector: string): void => {
  const element: Element = eRef.nativeElement.querySelector(targetSelector);
  const template: HTMLTemplateElement = eRef.nativeElement.querySelector(templateSelector);
  if (!!element && !!template) {
    Array.from(element.children)
      .filter((elem: Element) => elem.nodeName !== 'TEMPLATE')
      .forEach((elem: Element) => {
        if (template.children.length) {
          template.replaceChild(elem, template.children[0]);
        } else {
          template.appendChild(elem);
        }
      });
  }
};

export {
  projectContent,
  preserveContent
};
