import { AfterContentInit, ChangeDetectorRef, Directive, ElementRef, EventEmitter, HostBinding, Injector, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as JSON5 from 'json5';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AnimationService } from '../core/animation.service';
import { ComponentRegistryService } from '../core/component-registry.service';
import { WvrDataSelect } from '../core/data-select';
import * as ManifestActions from '../core/manifest/manifest.actions';
import { NgBindingsService, RefBindingSubject } from '../core/ng-bindings.service';
import { RootState, selectIsMobileLayout, selectManifestEntryResponse } from '../core/store';
import { ThemeService } from '../core/theme/theme.service';
import { AppConfig, APP_CONFIG } from './config';
import { ThemeVariantName } from './theme';
import { wvrParseProjectedContent } from './utility';
import { WvrAnimationComponent } from './wvr-animation.component';
import { WvrDataComponent } from './wvr-data.component';
import { WvrThemeableComponent } from './wvr-themeable.component';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class WvrBaseComponent implements AfterContentInit, OnInit, OnDestroy, WvrAnimationComponent, WvrDataComponent, WvrThemeableComponent {

  /** A reference to the ComponentRegistryService */
  readonly componentRegistry: ComponentRegistryService<WvrBaseComponent>;

  /** A generated unique identifier for this comonent. */
  readonly id: number;

  /** A reference to the ElementRef */
  readonly eRef: ElementRef;

  /** A reference to the ChangeDetectorRef */
  readonly cdRef: ChangeDetectorRef;

  /** A reference to the AppConfig */
  readonly appConfig: AppConfig;

  /** A reference to the Store */
  readonly store: Store<RootState>;

  data: { [as: string]: Observable<any> } = {};

  // tslint:disable-next-line: prefer-readonly
  @Input() private wvrData: string;

  themeOverrides = {};

  /** Allows for the override of theme for the particular component.  */
  @Input() set wvrTheme(themeName: string) {
    this.themeService.applyThemeByName(themeName, this);
  }

  /** Used to define the class type of an alert component.  */
  @Input() themeVariant: ThemeVariantName;

  /** A host binding used to ensure the presense of the `wvr-bootstrap` class. */
  @HostBinding('class.wvr-bootstrap') wvrBootstrap = true;

  @HostBinding('style') style;

  variantTypes = [];

  /** An object representation of the animation instructions for this component. */
  private _animationSettings: any = {};

  /** A setter which parses a json string describing animation instructions and stores the derived object in `_animationSettings`. */
  @Input() set animate(value: string) {
    this._animationSettings = JSON5.parse(value);
  }

  /** An object representation of the settings specifying the specific behavior of the animation for this component. */
  private _animationConfig: any = {};

  /** A setter which parses a json string describing animation setting and stores the derived object in `_animationConfig`. */
  @Input() set animateConfig(value: string) {
    this._animationConfig = JSON5.parse(value);
  }

  /** An identifier used to access the animation state for this component. */
  private animationStateId: number;

  /** An attribute input allowing for the designation of an animation identifier for the purpose of animation targeting. */
  @Input() animateId: string;

  /** An attribute input allowing for the designation of an animation target for animation events. */
  @Input() animateTarget: string;

  /** A view child of the template element containing the #animationRoot identifier. */
  @ViewChild('animationRoot') animationRootElem: ElementRef;

  /** A reference to the AnimationService */
  private readonly _animationService: AnimationService<WvrBaseComponent>;

  /** A reference to the ThemeService */
  private readonly themeService: ThemeService;

  /** A reference to the NgBindingsService */
  private readonly ngBindingsService: NgBindingsService;

  /** A host bound accessor which applies the wvr-hidden class if both isMobileLayout and hiddenInMobile evaluate to true.  */
  @HostBinding('class.wvr-hidden') private get _hiddenInMobile(): boolean {
    return this.isMobileLayout && this.hiddenInMobile;
  }

  /** An attribute input specifying if this component should be hidden in the mobile layout. */
  @Input() hiddenInMobile = false;

  /** An Output biding used for triggering animations. */
  @Output() protected readonly animationEventTrigger = new EventEmitter<Event>();

  isMobileLayout: boolean;

  private _ngBindings: { [key: string]: string };

  @Input() set ngBindings(value: string) {
    this._ngBindings = JSON5.parse(value);
  }

  isMobile: Observable<boolean>;

  protected subscriptions: Array<Subscription>;

  constructor(injector: Injector) {
    this.subscriptions = [];
    this.componentRegistry = injector.get(ComponentRegistryService);
    this.id = this.componentRegistry.register(this);

    this.eRef = injector.get(ElementRef);
    this.cdRef = injector.get(ChangeDetectorRef);
    this.appConfig = injector.get(APP_CONFIG);
    this.store = injector.get<Store<RootState>>(Store);

    this._animationService = injector.get(AnimationService);
    this.themeService = injector.get(ThemeService);

    this.ngBindingsService = injector.get(NgBindingsService);

    const element = (this.eRef.nativeElement as HTMLElement);
    const htmlIDAttrName = element.hasAttribute('id') ? 'wvr-id' : 'id';
    element.setAttribute(htmlIDAttrName, `${ComponentRegistryService.HTML_ID_BASE}-${this.id}`);
  }

  /** Used to setup this component for animating. */
  ngOnInit(): void {
    this.processData();
    this.initializeAnimationRegistration();
    this.themeService.registerComponent(this.id, this);
    wvrParseProjectedContent(this, this.eRef.nativeElement, this.subscriptions);

    this.isMobile = this.store.pipe(select(selectIsMobileLayout));

    this.subscriptions.push(this.isMobile.subscribe((isMobile: boolean) => {
      this.isMobileLayout = isMobile;
    }));
  }

  // TODO: fix this
  /** Used for post content initialization animation setup. */
  ngAfterContentInit(): void {
    this.initializeAnimationElement();
    this.bootstrapNgBindings();
  }

  /** Handles the the unregistering of this component with the component registry. */
  ngOnDestroy(): void {
    this.componentRegistry.unRegisterComponent(this.id);
    this.themeService.unRegisterComponent(this.id);

    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  bootstrapNgBindings(): void {
    if (!!this._ngBindings) {
      const win = window as any;
      let elem = this.eRef.nativeElement;

      for (const [k, v] of Object.entries(this._ngBindings)) {
        let ngScope;

        while (!ngScope && elem.tagName !== 'BODY') {
          const ngElem = win.angular.element(elem);
          if (ngElem.scope() && ngElem.scope()
            .hasOwnProperty(k)) {
            ngScope = ngElem.scope();
            break;
          }
          elem = elem.parentElement;
          if (elem.tagName === 'BODY') {
            console.warn(`${k} not found on ng scope`);
          }
        }

        if (!!ngScope) {
          const subject = new BehaviorSubject<any>(ngScope[k]);

          const references = this.ngBindingsService.putSubject(k, {
            subject,
            cdRef: this.cdRef,
            eRef: this.eRef
          });

          const attribute = this.kebabize(k);

          if (references.length === 1) {
            Object.defineProperty(ngScope, k, {
              get: () => subject.getValue(),
              set: (value: any) => {
                references.forEach((sub: RefBindingSubject) => {
                  const subElem = sub.eRef.nativeElement as HTMLElement;
                  if (!value || value === 'undefined' || value === 'null') {
                    subElem.removeAttribute(attribute);
                  } else {
                    subElem.setAttribute(attribute, value);
                  }
                });
              }
            });
          }

          Object.defineProperty(this, v, {
            get: () => subject.getValue(),
            set: (value: any): void => {
              if (value !== subject.getValue()) {
                subject.next(value);
                ngScope.$apply();
              }
            }
          });
        }
      }
    }
  }

  applyThemeOverride(customProperty: string, value: string): void {
    this.themeOverrides[customProperty] = value;
    this.eRef.nativeElement.style.setProperty(customProperty, value);
  }

  /** Plays the animation specified by the incoming animation trigger.  */
  /* istanbul ignore next */
  triggerAnimations(animationTriggerType: string): void {
    const animations: Array<string> = Array.isArray(this._animationSettings[animationTriggerType])
      ? this._animationSettings[animationTriggerType]
      : [this._animationSettings[animationTriggerType]];
    animations.forEach(an => {
      if (an === 'animationTrigger') {
        this._animationService.triggerAnimationTarget(this.animateTarget);
      } else {
        this._animationService
          .playAnimation(this.animationStateId, an, this._animationConfig, this.animationRootElem.nativeElement);
      }
    });
  }

  hasWvrData(): boolean {
    return !!this.wvrData;
  }

  getWvrData(): string {
    return this.wvrData;
  }

  /* istanbul ignore next */
  initializeAnimationElement(): void {
    this._animationService
      .initializeAnimationElement(this.animationStateId, this._animationConfig, this.animationRootElem);
  }

  /* istanbul ignore next */
  initializeAnimationRegistration(): void {
    const animationEvents = Object.keys(this._animationSettings);
    if (animationEvents.length) {
      if (this.animateId) {
        this._animationService.registerAnimationTargets(this.animateId, this);
      }
      this.animationStateId = this._animationService.registerAnimationStates();
      animationEvents.forEach(eventName => {
        if (eventName !== 'animationTrigger') {
          (this.eRef.nativeElement as HTMLElement).addEventListener(eventName, this.onAnimationEvent.bind(this));
        }
      });
    }
  }

  /** Trigger's the animation specified by the incoming event. */
  /* istanbul ignore next */
  onAnimationEvent($event: Event): void {
    this.triggerAnimations($event.type);
  }

  /* istanbul ignore next */
  private processData(): void {

    if (!this.wvrData) {
      return;
    }

    const valueParsed = JSON5.parse(this.wvrData);
    // tslint:disable-next-line:max-line-length
    const wvrDataSelects: Array<any> = Array.isArray(valueParsed) ? valueParsed : [valueParsed];

    wvrDataSelects
      .filter((s: WvrDataSelect) => !!s.manifest && !!s.entry && !!s.as)
      .forEach(s => {
        this.data[s.as] = this.store.pipe(
          select(selectManifestEntryResponse(s.manifest, s.entry)),
          filter(r => !!r)
        );
        this.store.dispatch(ManifestActions.submitRequest({
          request: {
            manifestName: s.manifest,
            entryName: s.entry
          }
        }));
      });
  }

  private readonly kebabize = (attribute: string) => attribute.split('')
    .map((letter, idx) => letter.toUpperCase() === letter ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}` : letter)
      .join('');

}
