import { Injectable } from '@angular/core';
import { WvrBaseComponent } from '../shared/wvr-base.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentRegistryService {

  private index = -1;
  private readonly registry: Map<number, WvrBaseComponent> = new Map<number, WvrBaseComponent>();

  register(component: WvrBaseComponent): number {
    // tslint:disable-next-line:increment-decrement
    this.registry.set(++this.index, component);

    return this.index;
  }

  unRegisterComponent(id: number): void {
    this.registry.delete(id);
  }

  getComponent(id: number): WvrBaseComponent {
    return this.registry.get(id);
  }

  getComponentByElement(element: HTMLElement): WvrBaseComponent {
    const htmlID = element.getAttribute('id');

    if (!htmlID) {
      return;
    }

    const id = htmlID.replace(WvrBaseComponent.HTML_ID_BASE, '');

    return this.getComponent(parseInt(id, 10));

  }

}
