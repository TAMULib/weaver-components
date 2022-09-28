import { ElementRef } from '@angular/core';

const projectContent = (elementRef: ElementRef, templateSelector: string, targetSelector: string): void => {
  const element: Element = elementRef.nativeElement.querySelector(targetSelector);
  project(element, elementRef, templateSelector);
};

const projectSourceContent = (elementRef: ElementRef, sourceElementRef: ElementRef, templateSelector: string): void => {
  const element: Element = elementRef.nativeElement;
  project(element, sourceElementRef, templateSelector);
};

const project = (element: Element, sourceElementRef: ElementRef, templateSelector: string): void => {
  const templates: Array<HTMLTemplateElement> = Array.from(sourceElementRef.nativeElement.querySelectorAll(templateSelector));
  if (!!element) {
    if (templates.length) {
      templates.forEach((template: HTMLTemplateElement) => {
        const clone: Node = template.children.length === 0 && template.content.children.length > 0
          ? template.content.cloneNode(true)
          : template;

        Array.from((clone as Node).childNodes)
          .forEach((child: Node) => {
            element.appendChild(child);
          });
      });
    }
    else {
      // hide target element if nothing to project
      (element as HTMLElement).hidden = true;
    }
  }
};

const preserveContent = (elementRef: ElementRef, templateSelector: string, targetSelector: string): void => {
  const element: Element = elementRef.nativeElement.querySelector(targetSelector);
  const template: HTMLTemplateElement = elementRef.nativeElement.querySelector(templateSelector);
  if (!!element && !!template) {
    Array.from(element.children)
      .filter((elem: Element) => elem.nodeName !== 'TEMPLATE')
      .forEach((elem: Element) => {
        template.appendChild(elem);
      });
  }
};

export {
  projectContent,
  projectSourceContent,
  preserveContent
};
