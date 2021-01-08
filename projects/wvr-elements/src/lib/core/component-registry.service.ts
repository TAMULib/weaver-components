import { Injectable } from '@angular/core';

/**
 * A registry for each WvrBaseComponent currently present on the page.
 */
@Injectable({
  providedIn: 'root'
})
export class ComponentRegistryService<T> {

  /** Incrementing index of all registered components. */
  private index = -1;

  /** Registry for all WvrBaseComponent. */
  private readonly registry: Map<number | string, T> = new Map<number, T>();

  /** A statically accessible reference to the prefix used in deriving the HTML identifier. */
  static readonly HTML_ID_BASE = 'wvr-component';

  /** Adds a WvrBaseComponent to the registry. */
  register(component: T): number {
    // tslint:disable-next-line:increment-decrement
    this.registry.set(++this.index, component);

    return this.index;
  }

  /** Removes a WvrBaseComponent from the registry. */
  unRegisterComponent(id: number | string): void {
    this.registry.delete(id);
  }

  /** Retrieves a WvrBaseComponent from the registry. */
  getComponent(id: number | string): T {
    return this.registry.get(id);
  }

  /** Retrieves a WvrBaseComponent from the registry by HTMLElement. */
  getComponentByElement(element: HTMLElement): T {

    const hasNativeId = element.hasAttribute('wvr-id');
    const htmlID = hasNativeId ? element.getAttribute('wvr-id') : element.getAttribute('id');

    if (!htmlID) {
      return undefined;
    }

    const id = parseInt(htmlID.replace(`${ComponentRegistryService.HTML_ID_BASE}-`, ''), 10);

    return this.getComponent(id);
  }

}
