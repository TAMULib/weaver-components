import { ElementRef } from '@angular/core';

/**
 * Projects content within all templates into target.
 *
 * @param eRef element reference with native element to perform content projection
 * @param templateSelector input template to project
 * @param targetSelector target element to project template to
 */
const projectContent = (eRef: ElementRef, templateSelector: string, targetSelector: string) => {
  const templates = Array.from(eRef.nativeElement.querySelectorAll(templateSelector));

  templates.forEach((template: any) => {
    const element: Element = eRef.nativeElement.querySelector(targetSelector);
    const clone = template.children.length === 0 && template.content.children.length > 0
        ? template.content.cloneNode(true)
        : template;
    Array.from(clone.children)
      .forEach((elem: Element) => {
        element.appendChild(elem);
      });
  });
};

/**
 * When projected content requires being preserved but not rendered.
 * This ratains two-way binding.
 *
 * @param eRef element reference with native element to preserve projected content
 * @param templateSelector template in which to preserve the content on
 * @param targetSelector target element to preserve its content
 */
const preserveContent = (eRef: ElementRef, templateSelector: string, targetSelector: string) => {
  const template = eRef.nativeElement.querySelector(templateSelector);
  if (!!template) {
    const element: Element = eRef.nativeElement.querySelector(targetSelector);
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
