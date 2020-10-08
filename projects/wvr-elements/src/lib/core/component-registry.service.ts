import { Injectable } from '@angular/core';
import { WvrBaseComponent } from '../shared/wvr-base.component';

/**
 * A registry for each WvrBaseComponent currently present on the page.
 */
@Injectable({
  providedIn: 'root'
})
export class ComponentRegistryService {

  /** Incrementing index of all registered components. */
  private index = -1;

  /** Registry for all WvrBaseComponent. */
  private readonly registry: Map<number | string, WvrBaseComponent> = new Map<number, WvrBaseComponent>();

  /** Adds a WvrBaseComponent to the registry. */
  register(component: WvrBaseComponent): number {

    // tslint:disable-next-line:no-string-literal
    const element = (component['_eRef'].nativeElement as HTMLElement);
    // tslint:disable-next-line:increment-decrement
    this.registry.set(++this.index, component);

    return this.index;
  }

  /** Removes a WvrBaseComponent from the registry. */
  unRegisterComponent(id: number | string): void {
    this.registry.delete(id);
  }

  /** Retrieves a WvrBaseComponent from the registry. */
  getComponent(id: number | string): WvrBaseComponent {
    return this.registry.get(id);
  }

  /** Retrieves a WvrBaseComponent from the registry by HTMLElement. */
  getComponentByElement(element: HTMLElement): WvrBaseComponent {

    const hasNativeId = element.hasAttribute('wvr-id');
    const htmlID = hasNativeId ? element.getAttribute('wvr-id') : element.getAttribute('id');

    if (!htmlID) {
      return;
    }

    const id = parseInt(htmlID.replace(`${WvrBaseComponent.HTML_ID_BASE}-`, ''), 10);

    return this.getComponent(id);
  }

}
