import { Injectable } from '@angular/core';
import { WvrBaseComponent } from './wvr-base.component';
import { wvrAnimationDefaults, wvrAnimations } from './wvr-animations';
import { animation, AnimationBuilder, AnimationMetadata, AnimationPlayer, AnimationReferenceMetadata, useAnimation } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class WvrAnimationService {

  private recieversRegistry = new Map<string, Array<WvrBaseComponent>>();

  private animationStates = new Map<string, boolean>();

  constructor(private readonly builder: AnimationBuilder) {

  }

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

  compileAnimation(animationName, timing, value): AnimationMetadata | Array<AnimationMetadata> {
    return wvrAnimations[animationName](this.animationStates, value ? value : wvrAnimationDefaults[animationName].value);
  }

  selectAnimation(animationName, timing, value): AnimationReferenceMetadata {

    const animationInput: AnimationMetadata | Array<AnimationMetadata> =
      this.compileAnimation(animationName, value, timing);

    return useAnimation(animation(animationInput), {
      params: {
        timing,
        value
      }
    });
  }

  playAnimation(a: AnimationReferenceMetadata, animationRoot: HTMLElement): void {
    const animationFactory = this.builder
      .build(a);
    const player: AnimationPlayer = animationFactory.create(animationRoot);
    player.play();
  }

}
