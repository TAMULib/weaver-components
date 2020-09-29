import { Injectable } from '@angular/core';
import { WvrBaseComponent } from '../shared/wvr-base.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentRegistryService {

  private readonly registry: Array<WvrBaseComponent> = new Array<WvrBaseComponent>();

  register(component: WvrBaseComponent): number {
    return this.registry.push(component) - 1;
  }

  getComponent(id: number): WvrBaseComponent {
    return this.registry[id];
  }
}
