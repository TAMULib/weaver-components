import { animate, AnimationMetadata, style } from '@angular/animations';

const wvrAnimationDefaults = {
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
  }
};

const wvrAnimations = {

  rotationtoggle: (s: Map<string, boolean>, v): AnimationMetadata | Array<AnimationMetadata> => {
    const a = [
      animate('{{timing}}',
        style({ transform: s.get('rotationtoggle') ? 'rotate(0)' : `rotate(${v}deg)` }))
    ];
    s.set('rotationtoggle', !s.get('rotationtoggle'));

    return a;
  },

  rotate: (s: Map<string, boolean>, v): AnimationMetadata | Array<AnimationMetadata> => {
    const a = [
      animate('{{timing}}',
        style({ transform: 'rotate({{value}}deg)' }))
    ];
    s.set('rotationtoggle', true);

    return a;
  },

  unrotate: (s: Map<string, boolean>, v): AnimationMetadata | Array<AnimationMetadata> => {
    const a = [
      animate('{{timing}}',
        style({ transform: 'rotate({{value}}deg)' }))
    ];
    s.set('rotationtoggle', false);

    return a;
  },

  fadein: (s: Map<string, boolean>, v): AnimationMetadata | Array<AnimationMetadata> => {
    const a = [
      animate('{{timing}}',
        style({ opacity: '{{value}}' }))
    ];
    s.set('fadetoggle', true);

    return a;
  },

  fadeout: (s: Map<string, boolean>, v): AnimationMetadata | Array<AnimationMetadata> => {
    const a = [
      animate('{{timing}}',
        style({ opacity: '{{value}}' }))
    ];
    s.set('fadetoggle', false);

    return a;
  },

  fadetoggle: (s: Map<string, boolean>, v): AnimationMetadata | Array<AnimationMetadata> => {
    const a = [
      animate('{{timing}}',
        style({ opacity: s.get('fadetoggle') ? 1 : 0 }))
    ];
    s.set('fadetoggle', !s.get('fadetoggle'));

    return a;
  }

};

export { wvrAnimations, wvrAnimationDefaults };

/*
    slideopen
    slideclosed
    slidetoggle

    bounce

    grow
    shrink
    growshrinktoggle

    color
    colorToggle

*/
