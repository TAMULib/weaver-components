import { animation, AnimationBuilder, AnimationMetadata, AnimationPlayer, AnimationReferenceMetadata, useAnimation } from '@angular/animations';
import { Injectable } from '@angular/core';
import { wvrAnimationDefaults, wvrAnimations } from './wvr-animations';
import { WvrBaseComponent } from './wvr-base.component';

@Injectable({
  providedIn: 'root',
  deps: [AnimationBuilder]
})
export class WvrAnimationService {

  private recieversRegistry = new Map<string, Array<WvrBaseComponent>>();

  private animationStates = new Map<number, Map<string, boolean>>();

  constructor(private readonly builder: AnimationBuilder) { }

  registerAnimationReciever(recieverName: string, component: WvrBaseComponent): void {
    let recievers = this.recieversRegistry.get(recieverName);
    if (!recievers) {
      recievers = new Array<WvrBaseComponent>();
      this.recieversRegistry.set(recieverName, recievers);
    }
    recievers.push(component);
  }

  registerAnimationStates(): number {
    const id = Math.random();
    this.animationStates.set(id, new Map<string, boolean>());

    return id;

  }

  triggerAnimationReciever(recieverName: string): void {
    const recievers = this.recieversRegistry.get(recieverName);
    if (recievers) {
      recievers.forEach(r => r.triggerAnimations('animationTrigger'));
    }
  }

  compileAnimation(stateId, animationName, value): AnimationMetadata | Array<AnimationMetadata> {

    const a = wvrAnimations[animationName];

    if (!a) {
      console.warn(`${animationName} not a known animation.`);

      return undefined;
    }

    return a(this.animationStates.get(stateId), value);
  }

  selectAnimation(stateId, animationName, timing, value): AnimationReferenceMetadata {
    const t = timing ? timing : wvrAnimationDefaults[animationName].timing;
    const v = value ? value : wvrAnimationDefaults[animationName].value;
    const animationInput: AnimationMetadata | Array<AnimationMetadata> =
      this.compileAnimation(stateId, animationName, v);

    if (animationInput) {
      return useAnimation(animation(animationInput), {
        params: {
          timing: t,
          value: v
        }
      });
    }
  }

  playAnimation(stateId, animationName, timing, value, animationRoot: HTMLElement): void {
    const a = this.selectAnimation(stateId, animationName, timing, value);
    if (a) {
      const animationFactory = this.builder
        .build(a);
      const player: AnimationPlayer = animationFactory.create(animationRoot);
      player.play();
    }
  }

}
