import { Injectable } from '@angular/core';
import { WvrBaseComponent } from './wvr-base.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class WvrAnimationService {

  private recieversRegistry = new Map<string, Array<WvrBaseComponent>>();

  registerAnimationReciever(recieverName: string, component: WvrBaseComponent): void {
    let recievers = this.recieversRegistry.get(recieverName);
    if (!recievers) {
      recievers = new Array<WvrBaseComponent>();
      this.recieversRegistry.set(recieverName, recievers);
    }
    recievers.push(component);
  }

  triggerAnimationReciever(recieverName: string): void {
    const recievers = this.recieversRegistry.get(recieverName);
    if (recievers) {
      recievers.forEach(r => r.triggerAnimations('animationTrigger'));
    }
  }

}
