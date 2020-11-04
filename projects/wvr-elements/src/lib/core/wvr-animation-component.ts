import { AnimationPlayer, AnimationReferenceMetadata } from '@angular/animations';
import { Observable } from 'rxjs';

export interface WvrAnimationComponent {
  initializeAnimationElement(): void;
  initializeAnimationRegistration(): void;
  onAnimationEvent($event: Event): void;
  processAnimations(): void;
  triggerAnimations(animationTriggerType: string): void;
}
