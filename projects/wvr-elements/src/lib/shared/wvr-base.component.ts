import { AfterContentInit, Directive, ElementRef, EventEmitter, HostBinding, Injector, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import * as JSON5 from 'json5';
import { Observable } from 'rxjs';
import { MobileService } from '../core/mobile.service';
import { RootState, selectManifestEntryResponse } from '../core/store';
import { WvrAnimationService } from '../core/wvr-animation.service';
import * as ManifestActions from '../core/manifest/manifest.actions';
import { filter } from 'rxjs/operators';
import * as Handlebars from 'handlebars';
import { ComponentRegistryService } from '../core/component-registry.service';

interface WvrDataSelect {
  manifest: string;
  entry: string;
  as: string;
}

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class WvrBaseComponent implements AfterContentInit, OnInit, OnDestroy {

  readonly id: number;

  static readonly HTML_ID_BASE = 'wvr-component';

  data: {[as: string]: Observable<any>} = {};

  @Input() private wvrData: string;

  @HostBinding('class.wvr-bootstrap') wvrBootstrap = true;

  private _animationSettings: any = {};

  @Input() set animate(value: string) {
    this._animationSettings = JSON5.parse(value);
  }

  private _animationConfig: any = {};
  @Input() set animateConfig(value: string) {
    this._animationConfig = JSON5.parse(value);
  }

  private animationStateId: number;

  @Input() animateId: string;

  @Input() animateTarget: string;

  @ViewChild('animationRoot') animationRootElem: ElementRef;

  get isMobileLayout(): boolean {
    return this.mobileService.isMobileLayout;
  }

  get isMobileAgent(): boolean {
    const agent = navigator.userAgent || navigator.vendor || (window as any).opera;

    // tslint:disable-next-line:max-line-length
    return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(agent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(agent.substr(0, 4)));
  }

  protected readonly store: Store<RootState>;
  protected readonly componentRegistry: ComponentRegistryService;

  protected readonly _animationService: WvrAnimationService;

  protected readonly _domSanitizer: DomSanitizer;

  protected readonly _eRef: ElementRef;

  private readonly mobileService: MobileService;

  @HostBinding('class.wvr-hidden') private get _hiddenInMobile(): boolean {
    return this.mobileService.isMobileLayout && this.hiddenInMobile;
  }

  @Input() hiddenInMobile = false;

  @Output() protected readonly animationEventTrigger = new EventEmitter<Event>();

  constructor(injector: Injector) {
    this.componentRegistry = injector.get(ComponentRegistryService);
    this._animationService = injector.get(WvrAnimationService);
    this._domSanitizer = injector.get(DomSanitizer);
    this._eRef = injector.get(ElementRef);
    this.mobileService = injector.get(MobileService);
    this.store = injector.get<Store<RootState>>(Store);
    this.id = this.componentRegistry.register(this);

    Handlebars.registerHelper('repeat', (n, block) => {
        let accum = '';
        for (let i = 0; i < n; i += 1) {
            block.data.index = i;
            block.data.first = i === 0;
            block.data.last = i === (n - 1);
            accum += block.fn(this);
        }

        return accum;
    });
    Handlebars.registerHelper('json', context => JSON.stringify(context));

    const element = (this._eRef.nativeElement as HTMLElement);
    const htmlIDAttrName = element.hasAttribute('id') ? 'wvr-id' : 'id';
    element.setAttribute(htmlIDAttrName, `${WvrBaseComponent.HTML_ID_BASE}-${this.id}`);
  }

  ngOnInit(): void {
    this.processAnimations();
    this.processData();
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this._animationService
        .initializeAnimationElement(this.animationStateId, this._animationConfig, this.animationRootElem);
    }, 1);
    this.parseProjectedContent();
  }

  ngOnDestroy(): void {
    this.componentRegistry.unRegisterComponent(this.id);
  }

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

  private onEvent($event): void {
    this.triggerAnimations($event.type);
  }

  private processAnimations(): void {
    const animationEvents = Object.keys(this._animationSettings);
    if (animationEvents.length) {
      if (this.animateId) {
        this._animationService.registerAnimationTargets(this.animateId, this);
      }
      this.animationStateId = this._animationService.registerAnimationStates();
      animationEvents.forEach(eventName => {
        if (eventName !== 'animationTrigger') {
          (this._eRef.nativeElement as HTMLElement).addEventListener(eventName, this.onEvent.bind(this));
        }
      });
    }
  }

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

  private parseProjectedContent(): void {

    if (!this.wvrData) {
      return;
    }

    setTimeout(() => {
      const elem = (this._eRef.nativeElement as HTMLElement);
      const projectedContentElem = elem.querySelector('wvr-template');

      if (!projectedContentElem) {
        return;
      }

      const valueParsed = JSON5.parse(this.wvrData);
      const wvrDataSelects: Array<any> = Array.isArray(valueParsed) ? valueParsed : [valueParsed];

      wvrDataSelects
        .filter((s: WvrDataSelect) => !!s.manifest && !!s.entry && !!s.as)
        .forEach((s: WvrDataSelect) => {
          this.data[s.as].subscribe(d => {
            const data = {};
            data[s.as] = d;
            const compiledContent = Handlebars.compile(projectedContentElem.innerHTML)(data);
            elem.innerHTML = elem.innerHTML
              .replace(projectedContentElem.outerHTML, compiledContent
                .replace('<!--', '')
                .replace('-->', ''));
          });
        });

    }, 0);

  }
}
