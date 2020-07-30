import { Injectable } from '@angular/core';
import { WvrBaseComponent } from '../wvr-base.component';
import { wvrAnimationDefaults, wvrAnimations } from './wvr-animations';
import { animation, AnimationBuilder, AnimationMetadata, AnimationPlayer, AnimationReferenceMetadata, useAnimation } from '@angular/animations';

@Injectable({
  providedIn: 'root',
  deps: [AnimationBuilder]
})
export class WvrAnimationService {

  private recieversRegistry = new Map<string, Array<WvrBaseComponent>>();

  private animationStates = new Map<number, Map<string, any>>();

  constructor(private readonly builder: AnimationBuilder) {}

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
    this.animationStates.set(id, new Map<string, any>());

    return id;

  }

  triggerAnimationReciever(recieverName: string): void {
    const recievers = this.recieversRegistry.get(recieverName);
    if (recievers) {
      recievers.forEach(r => r.triggerAnimations('animationTrigger'));
    }
  }

  compileAnimation(stateId: number, animationName: string,
                   value: string, animationRoot: HTMLElement): AnimationMetadata | Array<AnimationMetadata> {

    const a = wvrAnimations[animationName];

    if (!a) {
      console.warn(`${animationName} not a known animation.`);

      return undefined;
    }

    return a(this.animationStates.get(stateId), value, animationRoot);
  }

  selectAnimation(stateId: number, animationName: string, timing: string,
                  value: string, animationRoot: HTMLElement): AnimationReferenceMetadata {
    const t = timing ? timing : wvrAnimationDefaults[animationName].timing;
    const v = value ? value : wvrAnimationDefaults[animationName].value;
    const animationInput: AnimationMetadata | Array<AnimationMetadata> =
      this.compileAnimation(stateId, animationName, v, animationRoot);

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
    const a = this.selectAnimation(stateId, animationName, timing, value, animationRoot);
    if (a) {
      const animationFactory = this.builder
      .build(a);
      const player: AnimationPlayer = animationFactory.create(animationRoot);
      player.play();
    }
  }

}
