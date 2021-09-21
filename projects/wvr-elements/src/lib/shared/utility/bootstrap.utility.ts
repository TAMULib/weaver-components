/* istanbul ignore file */

/* TODO: Issue #292. */
import { enableProdMode, Injector, isDevMode, Type } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppConfig, APP_CONFIG } from '../config';
import { wvrTimeout } from './timing.utility';

interface WvrElementDesc {
  component: any;
  selector: string;
  lazy: boolean;
}

const componentScript = document.currentScript;

/** Interigates the current script tag for its src and extroplates the configuration path from that location. */
const obtainConfigPath = (): string => {
  const componentScriptSrc = componentScript.getAttribute('src');
  const componentScriptSrcPathParts = componentScriptSrc.split('/');
  componentScriptSrcPathParts.pop();
  const configBasePath = componentScriptSrcPathParts.join('/');

  return `${configBasePath}/config.json`;
};

const weaverInit = (module: Type<unknown>, environment: any) => {
  if (environment.production) {
    enableProdMode();
  }

  const win = (window as any);

  if (!win.weaverBootstrapEvent) {
    win.weaverBootstrapEvent = 'DOMContentLoaded';
  }

  document.addEventListener(win.weaverBootstrapEvent, () => {
    weaverBootstrap(module)(isDevMode() ? '/config.json' : undefined)
      .catch();
  });
};

/** Obtains, parses and injects the configuration. */
const weaverBootstrap = (module: Type<unknown>) => (configPath: string) => fetch(configPath ? configPath : obtainConfigPath())
  .then((response: Response) => response.json())
  .then((appConfig: AppConfig) => platformBrowserDynamic([{
    provide: APP_CONFIG,
    useValue: appConfig
  }])
    .bootstrapModule(module)
    .then(showWeaverElements)
    .catch((err: any) => {
      console.error(err);
    }));

const lazyLoadWeaverElement = (element: HTMLElement, selectors: Array<string>): boolean => {
  if (selectors.indexOf(element.parentNode.nodeName) >= 0) {
    return false;
  }
  if (element.parentNode.nodeName === 'BODY') {
    return true;
  }

  return lazyLoadWeaverElement(element.parentNode as HTMLElement, selectors);
};

/** Lazy load weaver elements. */
const registerWeaverElements = (injector: Injector, wvrElements: Array<WvrElementDesc>) => {
  // filter for selectors of elements to lazy load
  const selectors = wvrElements.filter(wvrElement => wvrElement.lazy)
    .map(wvrElement => wvrElement.selector.toUpperCase());

  // wrap elements that do not have weaver element as parent in div and template
  // div to specify class to target for min-height
  // template to prevent render of weaver element
  wvrElements
    .filter(wvrElement => wvrElement.lazy)
    .forEach(wvrElement => {
      Array.from(document.getElementsByTagName(wvrElement.selector))
        .forEach(element => {
          if (lazyLoadWeaverElement(element as HTMLElement, selectors)) {
            const div = document.createElement('div');
            div.setAttribute('element', wvrElement.selector);
            const template = document.createElement('template');
            div.appendChild(template);
            element.parentNode.replaceChild(div, element);
            template.content.appendChild(element);
          }
        });
    });

  // define the weaver elements in custom browser element registry
  wvrElements.forEach(wvrElement => {
    try {
      customElements.define(wvrElement.selector, createCustomElement(wvrElement.component, { injector }));
    } catch (e) {
      // console.warn(e);
    }
  });

  // create observer to detect when wrapped element enters view port
  const observer = new IntersectionObserver(entries => {
    entries.map(entry => {
      // when wrapped element enters view port, unwrap it and remove from observer
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        const clone = (entry.target.childNodes[0] as HTMLTemplateElement).content.cloneNode(true);
        entry.target.parentNode.replaceChild(clone.childNodes[0], entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px 5px 0px'
  });

  wvrTimeout(() => {
    // add all wrapped weaver elements to observer
    Array.from(document.querySelectorAll('div[element]'))
      .forEach(element => {
        observer.observe(element);
      });
  });
};

/** Show weaver elements. */
const showWeaverElements = () => {
  document.querySelectorAll('.wvr-components-loading:not(body)')
    .forEach(element => {
      element.classList.remove('wvr-components-loading');
    });

  document.querySelectorAll('[wvr-hide-content]')
    .forEach(elem => {
      elem.removeAttribute('wvr-hide-content');
    });

  const body = document.querySelector('body');
  if (body) {
    body.classList.remove('wvr-components-loading');
    body.classList.remove('wvr-hidden');
  }
};

export {
  obtainConfigPath,
  registerWeaverElements,
  showWeaverElements,
  weaverInit,
  WvrElementDesc,
};
