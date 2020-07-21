import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

export const baseHostProps = {
  '(click)': 'onClick($event)',
  '(mouseover)': 'onMouseover($event)',
  '(mouseenter)': 'onMouseenter($event)',
  '(mouseleave)': 'onMouseleave($event)'
};

export const baseAnimationsProps = [
  trigger('toggleRotation', [
    state('default', style({ transform: 'rotate(0)' })),
    state('rotated', style({ transform: 'rotate(var(--wvr-animate-rotation-degree))' })),
    transition('rotated <=> default', animate('{{animateRotationTiming}}'))
  ])
];

export const wvrComponentBaseProps: Component = {
  host: baseHostProps,
  animations: baseAnimationsProps
};
