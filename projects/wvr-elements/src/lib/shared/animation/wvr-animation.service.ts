import { Injectable, ɵConsole } from '@angular/core';
import { WvrBaseComponent } from '../wvr-base.component';
import { wvrAnimationDefaults, wvrAnimationInitialization, wvrAnimations } from './wvr-animations';
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

  initializeAnimationElement(stateId, animationConfig: {}, animationRootElem): void {
    Object.keys(animationConfig)
      .forEach(animName => {
        console.log(animName);
        const animConf = animationConfig[animName];
        const initializationMethod = wvrAnimationInitialization[animName];
        if (initializationMethod && animationRootElem) {
          const from = animConf.from ?
                      animConf.from :
                      wvrAnimationDefaults[animName].from;
          initializationMethod(this.animationStates.get(stateId), from, animationRootElem.nativeElement);
        }
      });
  }

  compileAnimation(stateId: number, animationName: string, animationRoot: HTMLElement): AnimationMetadata | Array<AnimationMetadata> {
    const a = wvrAnimations[animationName];

    if (!a) {
      console.warn(`${animationName} not a known animation.`);

      return undefined;
    }

    return a(this.animationStates.get(stateId), animationRoot);
  }

  selectAnimation(stateId: number, animationName: string, timing: string,
                  to: string, from: string, animationRoot: HTMLElement): AnimationReferenceMetadata {

    const animationInput: AnimationMetadata | Array<AnimationMetadata> =
      this.compileAnimation(stateId, animationName, animationRoot);

    if (animationInput) {
      return useAnimation(animation(animationInput), {
        params: {
          timing,
          to,
          from
        }
      });
    }
  }

  playAnimation(stateId: number, animationName: string, animationConfig: {}, animationRoot: HTMLElement): void {

    const timing = animationConfig[animationName] ?
                   animationConfig[animationName].timing :
                   wvrAnimationDefaults[animationName].timing;
    const to = animationConfig[animationName] ?
                   animationConfig[animationName].to :
                   wvrAnimationDefaults[animationName].to;
    const from = animationConfig[animationName] ?
                   animationConfig[animationName].from :
                   wvrAnimationDefaults[animationName].from;

    console.log(timing, to, from);
    const a = this.selectAnimation(stateId, animationName, timing, to, from, animationRoot);
    if (a) {
      const animationFactory = this.builder
      .build(a);
      const player: AnimationPlayer = animationFactory.create(animationRoot);
      player.play();
    }
  }

}
