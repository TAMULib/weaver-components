import { Injectable } from '@angular/core';
import { WvrBaseComponent } from '../shared/wvr-base.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentRegistryService {

  private index = -1;
  private readonly registry: Map<number | string, WvrBaseComponent> = new Map<number, WvrBaseComponent>();

  register(component: WvrBaseComponent): number {

    // tslint:disable-next-line:no-string-literal
    const element = (component['_eRef'].nativeElement as HTMLElement);
    // tslint:disable-next-line:increment-decrement
    const id: number | string = element.hasAttribute('id') ? ++this.index : `${element.getAttribute('id')}-${++this.index}`;

    this.registry.set(id, component);

    return this.index;
  }

  unRegisterComponent(id: number | string): void {
    this.registry.delete(id);
  }

  getComponent(id: number | string): WvrBaseComponent {
    return this.registry.get(id);
  }

  getComponentByElement(element: HTMLElement): WvrBaseComponent {
    const hasNativeId = element.hasAttribute('wvr-id');
    const htmlID = hasNativeId ? element.getAttribute('wvr-id') : element.getAttribute('id');

    if (!htmlID) {
      return;
    }

    return this.getComponent(hasNativeId ? htmlID : parseInt(htmlID.replace(WvrBaseComponent.HTML_ID_BASE, ''), 10));
  }

}
