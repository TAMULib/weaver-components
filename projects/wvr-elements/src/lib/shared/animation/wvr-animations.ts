import { animate, AnimationMetadata, style } from '@angular/animations';

const wvrAnimationDefaults = {
  fadein: {
    value: 1,
    timing: '250ms linear'
  },
  fadeout: {
    value: 0,
    timing: '250ms linear'
  },
  fadetoggle: {
    value: 0,
    timing: '250ms linear'
  },
  rotationtoggle: {
    value: 90,
    timing: '250ms linear'
  },
  rotate: {
    value: 90,
    timing: '250ms linear'
  },
  unrotate: {
    value: 0,
    timing: '250ms linear'
  },
  expand: {
    value: '*',
    timing: '250ms linear'
  },
  collapse: {
    value: 0,
    timing: '250ms linear'
  },
  expandcollapsetoggle: {
    value: '*',
    timing: '250ms linear'
  }
};

const wvrAnimations = {

  fadein: (s: Map<string, any>, v, elem: HTMLElement): AnimationMetadata | Array<AnimationMetadata> => {
    const a = [
      animate('{{timing}}',
        style({ opacity: '{{value}}' }))
    ];
    s.set('fadetoggle', true);

    return a;
  },

  fadeout: (s: Map<string, any>, v, elem: HTMLElement): AnimationMetadata | Array<AnimationMetadata> => {
    const a = [
      animate('{{timing}}',
        style({ opacity: '{{value}}' }))
    ];
    s.set('fadetoggle', false);

    return a;
  },

  fadetoggle: (s: Map<string, any>, v, elem: HTMLElement): AnimationMetadata | Array<AnimationMetadata> => {
    const a = [
      animate('{{timing}}',
        style({ opacity: s.get('fadetoggle') ? 1 : 0}))
    ];
    s.set('fadetoggle', !s.get('fadetoggle'));

    return a;
  },

  rotationtoggle: (s: Map<string, any>, v, elem: HTMLElement): AnimationMetadata | Array<AnimationMetadata> => {
    const a = [
      animate('{{timing}}',
        style({ transform: s.get('rotationtoggle') ?
                           'rotate(0)' :
                           `rotate(${v}deg)` }))
    ];
    s.set('rotationtoggle', !s.get('rotationtoggle'));

    return a;
  },

  rotate: (s: Map<string, any>, v, elem: HTMLElement): AnimationMetadata | Array<AnimationMetadata> => {
    const a = [
      animate('{{timing}}',
        style({ transform: 'rotate({{value}}deg)' }))
    ];
    s.set('rotationtoggle', true);

    return a;
  },

  unrotate: (s: Map<string, any>, v, elem: HTMLElement): AnimationMetadata | Array<AnimationMetadata> => {
    const a = [
      animate('{{timing}}',
        style({ transform: 'rotate(0)' }))
    ];
    s.set('rotationtoggle', false);

    return a;
  },

  expand: (s: Map<string, any>, v, elem: HTMLElement): AnimationMetadata | Array<AnimationMetadata> => {

    if (!s.get('expandcollapseheight')) {
      s.set('expandcollapseheight', elem.clientHeight);
    }

    const a = [
      animate('{{timing}}',
        style({ height: s.get('expandcollapseheight') }))
    ];
    s.set('expandcollapsetoggle', true);

    return a;
  },

  collapse: (s: Map<string, any>, v, elem: HTMLElement): AnimationMetadata | Array<AnimationMetadata> => {

    if (!s.get('expandcollapseheight')) {
      s.set('expandcollapseheight', elem.clientHeight);
    }

    const a = [
      animate('{{timing}}',
        style({ height: '0' }))
    ];
    s.set('expandcollapsetoggle', false);

    return a;
  },

  expandcollapsetoggle: (s: Map<string, any>, v, elem: HTMLElement): AnimationMetadata | Array<AnimationMetadata> => {

    if (!s.get('expandcollapseheight')) {
      s.set('expandcollapseheight', elem.clientHeight);
    }

    const value = v ===  wvrAnimationDefaults.expandcollapsetoggle.value ?
                  s.get('expandcollapseheight') :
                  v;

    const a = [
      animate('{{timing}}',
        style({ height: s.get('expandcollapsetoggle') ? value : '0' }))
    ];
    s.set('expandcollapsetoggle', !s.get('expandcollapsetoggle'));

    return a;
  }

};

export { wvrAnimations, wvrAnimationDefaults };

/*
    slideopen
    slideclosed
    slidetoggle

    bounce

    slideopen
    slideclosed
    slideopenclosedtoggle

    color
    colorToggle

*/
