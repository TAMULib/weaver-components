import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WvrItWorksComponent } from '../wvr-it-works/wvr-it-works.component';
import { WvrAnimationService } from './wvr-animation.service';

describe('WvrAnimationService', () => {
  let service: WvrAnimationService;
  let componentOne: WvrItWorksComponent;
  let componentTwo: WvrItWorksComponent;
  let fixtureOne: ComponentFixture<WvrItWorksComponent>;
  let fixtureTwo: ComponentFixture<WvrItWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [WvrItWorksComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(WvrAnimationService);

    fixtureOne = TestBed.createComponent(WvrItWorksComponent);
    componentOne = fixtureOne.componentInstance;
    componentOne.animate = `{
      click: "rotateToggle"
    }`;
    componentOne.animateConfig = `{
      rotateToggle: {
        timing: '1000ms ease-in',
        to: 180,
        from: 0
      }
    }`;
    componentOne.animateId = 'animateComponentOne';

    fixtureTwo = TestBed.createComponent(WvrItWorksComponent);
    componentTwo = fixtureTwo.componentInstance;
    componentTwo.animate = `{
      click: "animationTrigger"
    }`;
    componentTwo.animateTarget = 'componentOne.animateId';
    componentTwo.animateId = 'animateComponentTwo';
  });

  it('should be created', () => {
    expect(service)
      .toBeTruthy();
  });

  it('should register new animation targets', () => {
    // tslint:disable-next-line:no-string-literal
    expect(service['_animationTargetsRegistry'].size)
     .toEqual(0);
    service.registerAnimationTargets(componentOne.animateId, componentOne);
    // tslint:disable-next-line:no-string-literal
    expect(service['_animationTargetsRegistry'].size)
     .toEqual(1);
  });

  it('should register new animation states', () => {
    // tslint:disable-next-line:no-string-literal
    expect(componentOne['animationStateId'])
      .toBeUndefined();

    // tslint:disable-next-line:no-string-literal
    componentOne['animationStateId'] = service.registerAnimationStates();

    // tslint:disable-next-line:no-string-literal
    expect(componentOne['animationStateId'])
      .toBeDefined();
  });

  // it('should trigger animation target', () => {
  //   componentOne.animationRootElem = fixtureOne.elementRef;
  //   // tslint:disable-next-line:no-string-literal
  //   componentOne['initializeAnimationRegistration']();
  //   // tslint:disable-next-line:no-string-literal
  //   componentOne['initializeAnimationElement']();
  //   // tslint:disable-next-line:no-string-literal
  //   componentTwo['initializeAnimationRegistration']();
  //   // tslint:disable-next-line:no-string-literal
  //   componentTwo['initializeAnimationElement']();

  //   service.triggerAnimationTarget(componentTwo.animateTarget);
  //   // tslint:disable-next-line:no-string-literal

  // });

});
