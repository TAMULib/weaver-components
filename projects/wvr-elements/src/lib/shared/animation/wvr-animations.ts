import { animate, AnimationMetadata, style } from '@angular/animations';

const wvrAnimationInitialization = {
  fade: (s: Map<string, any>, from: string, elem: HTMLElement): void => {
    elem.style.opacity = from;
  },
  fadeToggle: (s: Map<string, any>, from: string, elem: HTMLElement): void => {
    elem.style.opacity = from;
  },
  rotate: (s: Map<string, any>, from: string, elem: HTMLElement): void => {
    elem.style.transform = `rotate(${from}deg)`;
  },
  rotateToggle: (s: Map<string, any>, from: string, elem: HTMLElement): void => {
    elem.style.transform = `rotate(${from}deg)`;
  },
  expandCollapse: (s: Map<string, any>, from: string, elem: HTMLElement): void => {
    s.set('expandCollapseFrom', from ? from : elem.clientHeight);
    if (from) {
      elem.style.height = from;
    }
  },
  expandCollapseToggle: (s: Map<string, any>, from: string, elem: HTMLElement): void => {
    s.set('expandCollapseFrom', from ? from : elem.clientHeight);
    if (from) {
      elem.style.height = from;
    }
  }
};

const wvrAnimations = {

  fade: (s: Map<string, any>, elem: HTMLElement): AnimationMetadata | Array<AnimationMetadata> => {
    const a = [
      animate('{{timing}}',
        style({ opacity: '{{to}}' }))
    ];
    s.set('fadetoggle', true);

    return a;
  },

  fadeToggle: (s: Map<string, any>, elem: HTMLElement): AnimationMetadata | Array<AnimationMetadata> => {
    const a = [
      animate('{{timing}}',
        style({ opacity: s.get('fadetoggle') ? '{{from}}' : '{{to}}'}))
    ];
    s.set('fadetoggle', !s.get('fadetoggle'));

    return a;
  },

  rotate: (s: Map<string, any>, elem: HTMLElement): AnimationMetadata | Array<AnimationMetadata> => {
    const a = [
      animate('{{timing}}',
        style({ transform: 'rotate({{to}}deg)' }))
    ];
    s.set('rotateToggle', true);

    return a;
  },

  rotateToggle: (s: Map<string, any>, elem: HTMLElement): AnimationMetadata | Array<AnimationMetadata> => {
    const a = [
      animate('{{timing}}',
        style({ transform: s.get('rotateToggle') ?
                           'rotate({{from}}deg)' :
                           'rotate({{to}}deg)' }))
    ];
    s.set('rotateToggle', !s.get('rotateToggle'));

    return a;
  },

  expandCollapse: (s: Map<string, any>, elem: HTMLElement): AnimationMetadata | Array<AnimationMetadata> => {

    const a = [
      animate('{{timing}}',
        style({ height: '{{to}}' }))
    ];
    s.set('expandCollapseToggle', true);

    return a;
  },

  expandCollapseToggle: (s: Map<string, any>, elem: HTMLElement): AnimationMetadata | Array<AnimationMetadata> => {
    const a = [
      animate('{{timing}}',
        style({ height: s.get('expandCollapseToggle') ?  s.get('expandCollapseFrom') : '{{to}}'}))
    ];
    s.set('expandCollapseToggle', !s.get('expandCollapseToggle'));

    return a;
  }

};

export { wvrAnimations, wvrAnimationInitialization };

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
