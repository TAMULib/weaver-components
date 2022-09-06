import { ChangeDetectionStrategy, Component, HostBinding, Injector, Input } from '@angular/core';
import { WvrBaseComponent } from '../../shared/wvr-base.component';

/**
 * The WvrNavLi Component is the list element to be used with the wvre-nav-list element.
 */
@Component({
  selector: 'wvr-nav-li-component',
  templateUrl: './wvr-nav-li.component.html',
  styleUrls: ['./wvr-nav-li.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WvrNavLiComponent extends WvrBaseComponent {

  /** A resolvable URI to to which this li will link, when provided. If no link is provided, the list element will not display as a link. */
  @Input() href: string;

  /** Allows for the override of the --wvr-nav-li-cursor css variable. Default: pointer. */
  @HostBinding('style.--wvr-nav-li-cursor') @Input() liCursor;

  /** Allows for the override of the --wvr-nav-li-height css variable. Default: 100%. */
  @HostBinding('style.--wvr-nav-li-height') @Input() liHeight;

  /** Allows for the override of the --wvr-nav-li-width css variable. Default: 140px. */
  @HostBinding('style.--wvr-nav-li-width') @Input() liWidth;

  /** Allows for the override of the --wvr-nav-link-background-hover css variable. Default: --wvr-primary */
  @HostBinding('style.--wvr-nav-link-background-hover') @Input() linkBackgroundHover;

  /** Allows for the override of the --wvr-nav-link-color-hover css variable. Default: --wvr-primary */
  @HostBinding('style.--wvr-nav-link-color-hover') @Input() linkColorHover;

  /** Allows for the override of the --wvr-nav-link-color css variable. --wvr-blue */
  @HostBinding('style.--wvr-nav-link-color') @Input() linkColor;

  /** Allows for the override of the --wvr-nav-link-font-size css variable. Defualt: inherit */
  @HostBinding('style.--wvr-nav-link-font-size') @Input() linkFontSize;

  /** Allows for the override of the --wvr-nav-link-font-weight css variable. Default: inherit */
  @HostBinding('style.--wvr-nav-link-font-weight') @Input() linkFontWeight;

  /** Allows for the override of the --wvr-nav-link-text-decoration-hover css variable. Default: none */
  @HostBinding('style.--wvr-nav-link-text-decoration-hover') @Input() linkTextDecorationHover;

  constructor(injector: Injector) {
    super(injector);
  }

  ngAfterViewInit(): void {
    const list = this.eRef.nativeElement.parentNode;

    Array.from(this.eRef.nativeElement.children)
      .forEach((elem: any) => {
        list.appendChild(elem);
      });

    list.parentNode.appendChild(this.eRef.nativeElement);
  }

}
