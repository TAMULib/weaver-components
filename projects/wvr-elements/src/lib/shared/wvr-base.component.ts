import { AfterContentInit, Directive, ElementRef, EventEmitter, HostBinding, Injector, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as JSON5 from 'json5';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AnimationService } from '../core/animation.service';
import { ComponentRegistryService } from '../core/component-registry.service';
import { WvrDataSelect } from '../core/data-select';
import * as ManifestActions from '../core/manifest/manifest.actions';
import { MobileService } from '../core/mobile.service';
import { RootState, selectManifestEntryResponse } from '../core/store';
import { TemplateService } from '../core/template.service';
import { ThemeService } from '../core/theme/theme.service';
import { AppConfig, APP_CONFIG } from './config';
import { ThemeVariantName } from './theme';
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

  /** An accessor which uses the mobileService to determine if the current layout mode is mobile. */
  get isMobileLayout(): boolean {
    return this._mobileService.isMobileLayout;
  }

  /** An accessor which determines if the current userAgent mode is mobile. */
  get isMobileAgent(): boolean {
    const agent = navigator.userAgent || navigator.vendor || (window as any).opera;

    // tslint:disable-next-line:max-line-length
    return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(agent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(agent.substr(0, 4)));
  }

  /** A reference to the AnimationService */
  private readonly _animationService: AnimationService<WvrBaseComponent>;

  /** A reference to the MobileService */
  private readonly _mobileService: MobileService;

  /** A reference to the TemplateService */
  private readonly _templateService: TemplateService<WvrBaseComponent>;

  /** A reference to the ThemeService */
  private readonly themeService: ThemeService;

  /** A host bound accessor which applies the wvr-hidden class if both isMobileLayout and hiddenInMobile evaluate to true.  */
  @HostBinding('class.wvr-hidden') private get _hiddenInMobile(): boolean {
    return this._mobileService.isMobileLayout && this.hiddenInMobile;
  }

  /** An attribute input specifying if this component should be hidden in the mobile layout. */
  @Input() hiddenInMobile = false;

  /** An Output biding used for triggering animations. */
  @Output() protected readonly animationEventTrigger = new EventEmitter<Event>();

  constructor(injector: Injector) {
    this.componentRegistry = injector.get(ComponentRegistryService);
    this.id = this.componentRegistry.register(this);

    this.eRef = injector.get(ElementRef);
    this.appConfig = injector.get(APP_CONFIG);
    this.store = injector.get<Store<RootState>>(Store);

    this._animationService = injector.get(AnimationService);
    this._mobileService = injector.get(MobileService);
    this._templateService = injector.get(TemplateService);
    this.themeService = injector.get(ThemeService);

    const element = (this.eRef.nativeElement as HTMLElement);
    const htmlIDAttrName = element.hasAttribute('id') ? 'wvr-id' : 'id';
    element.setAttribute(htmlIDAttrName, `${ComponentRegistryService.HTML_ID_BASE}-${this.id}`);
  }

  /** Used to setup this component for animating. */
  ngOnInit(): void {
    this.processData();
    this.initializeAnimationRegistration();
    this.themeService.registerComponent(this.id, this);
    this._templateService.parseProjectedContent(this, this.eRef.nativeElement);
  }

  // TODO: fix this
  /** Used for post content initialization animation setup. */
  ngAfterContentInit(): void {
    this.initializeAnimationElement();
  }

  /** Handles the the unregistering of this component with the component registry. */
  ngOnDestroy(): void {
    this.componentRegistry.unRegisterComponent(this.id);
    this.themeService.unRegisterComponent(this.id);
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

}
