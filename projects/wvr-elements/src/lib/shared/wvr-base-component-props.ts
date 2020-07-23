import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

export const baseHostProps = {
  '(mousedown)': 'onEvent($event)',
  '(mouseup)': 'onEvent($event)',
  '(click)': 'onEvent($event)',
  '(mouseenter)': 'onEvent($event)',
  '(mouseleave)': 'onEvent($event)',
  '(mouseover)': 'onEvent($event)',
  '(mousemove)': 'onEvent($event)'
};

/*
  onchange
  onblure
  onfocus
  oncancel
  onresize
  onwheel
  input
  ondblclick
  onkeydown
  onkeypress
  onkeyup
  ondrag
  ondrop
  onload
  onprogress
  ontimout
  */

export const wvrBaseComponentProps: Component = {
  host: baseHostProps
};
