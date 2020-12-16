export interface WvrAnimationComponent {
  initializeAnimationElement(): void;
  initializeAnimationRegistration(): void;
  onAnimationEvent($event: Event): void;
  triggerAnimations(animationTriggerType: string): void;
}
