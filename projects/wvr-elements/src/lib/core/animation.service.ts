import { animation, AnimationBuilder, AnimationMetadata, AnimationPlayer, AnimationReferenceMetadata, useAnimation } from '@angular/animations';
import { Injectable } from '@angular/core';
import { wvrAnimationDefaults } from '../shared/animation/wvr-animation-defaults';
import { wvrAnimationInitialization, wvrAnimations } from '../shared/animation/wvr-animations';
import { WvrAnimationComponent } from '../shared/wvr-animation.component';

/**
 * A centralized utility for handeling animation tasks.
 */
@Injectable({
  providedIn: 'root',
  deps: [AnimationBuilder]
})
export class AnimationService<T extends WvrAnimationComponent> {

  /** A registry of WvrBaseComponent which are participating in animations. */
  private readonly _animationTargetsRegistry = new Map<string, Array<T>>();

  /** Records state for each WvrBaseComponent which is participating in animation */
  private readonly animationStates = new Map<number, Map<string, boolean>>();

  constructor(private readonly builder: AnimationBuilder) { }

  /** Adds a component to the registry of targets */
  registerAnimationTargets(targetName: string, component: T): void {
    let targets = this._animationTargetsRegistry.get(targetName);
    /* istanbul ignore else */
    if (!targets) {
      targets = new Array<T>();
      this._animationTargetsRegistry.set(targetName, targets);
    }
    targets.push(component);
  }

  /** Creates an entry in the animation state registry and assigns a random identifier */
  registerAnimationStates(): number {
    const id = Math.random();
    this.animationStates.set(id, new Map<string, boolean>());

    return id;
  }

  /** Triggers associated animations from the _animationTargetsRegistry. */
  triggerAnimationTarget(targetName: string): void {
    const targets = this._animationTargetsRegistry.get(targetName);
    if (targets) {
      targets.forEach(r => {
        r.triggerAnimations('animationTrigger');
      });
    }
  }

  /** Runs the initialization function for each configured animation.  */
  initializeAnimationElement(stateId, animationConfig: {}, animationRootElem): void {
    Object.keys(animationConfig)
      .forEach(animName => {
        const animConf = animationConfig[animName];
        const initializationMethod = wvrAnimationInitialization[animName];
        if (initializationMethod && animationRootElem) {
          const from = animConf.from ? animConf.from : wvrAnimationDefaults[animName].from;
          initializationMethod(this.animationStates.get(stateId), from, animationRootElem.nativeElement);
        }
      });
  }

  /** Plays the specified animation. */
  playAnimation(stateId: number, animationName: string, animationConfig: {}, animationRoot: HTMLElement): AnimationPlayer {
    const timing = animationConfig[animationName] ?
      animationConfig[animationName].timing :
      wvrAnimationDefaults[animationName].timing;
    const to = animationConfig[animationName] ?
      animationConfig[animationName].to :
      wvrAnimationDefaults[animationName].to;
    const from = animationConfig[animationName] ?
      animationConfig[animationName].from :
      wvrAnimationDefaults[animationName].from;
    const a = this.selectAnimation(stateId, animationName, timing, to, from, animationRoot);
    if (a) {
      const animationFactory = this.builder.build(a);
      const player: AnimationPlayer = animationFactory.create(animationRoot);
      player.play();

      return player;
    }
  }

  /** Retrieves specified the animation. */
  private selectAnimation(stateId: number, animationName: string, timing: string,
                          to: string, from: string, animationRoot: HTMLElement): AnimationReferenceMetadata {
    const animationInput: AnimationMetadata | Array<AnimationMetadata> =
    this.compileAnimation(stateId, animationName, animationRoot);

    return useAnimation(animation(animationInput), {
      params: {
          timing,
          to,
          from
        }
    });
  }

  /** Compiles the specified animation. */
  private compileAnimation(stateId, animationName, value): AnimationMetadata | Array<AnimationMetadata> {
    const a = wvrAnimations[animationName];

    if (!a) {
      console.warn(`${animationName} not a known animation.`);

      return [];
    }

    return a(this.animationStates.get(stateId), value);
  }

}
