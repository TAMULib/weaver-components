import { ChangeDetectionStrategy, Component, HostBinding, Injector, Input } from '@angular/core';
import { ThemeVariantName } from '../../shared/theme';
import { yiq } from '../../shared/utility/color.utlity';
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

  /** Used to define the class type of an wvr nav li component.  */
  @Input() themeVariant: ThemeVariantName = 'danger';

  /** A resolvable URI to to which this li will link, when provided. If no link is provided, the list element will not display as a link. */
  @Input() href: string;

  /** Allows for the override of the --wvr-nav-li-cursor css variable. Default: pointer. */
  @HostBinding('style.--wvr-nav-li-cursor') @Input() liCursor;

  /** Allows for the override of the --wvr-nav-li-height css variable. Default: 100%. */
  @HostBinding('style.--wvr-nav-li-height') @Input() liHeight;

  /** Allows for the override of the --wvr-nav-li-width css variable. Default: 140px. */
  @HostBinding('style.--wvr-nav-li-width') @Input() liWidth;

  /** Allows for the override of the --wvr-nav-link-font-size css variable. Defualt: inherit */
  @HostBinding('style.--wvr-nav-link-font-size') @Input() linkFontSize;

  /** Allows for the override of the --wvr-nav-link-font-weight css variable. Default: inherit */
  @HostBinding('style.--wvr-nav-link-font-weight') @Input() linkFontWeight;

  constructor(injector: Injector) {
    super(injector);
  }

  additionalNavLiClasses(): string {
    let textClass = '';
    textClass +=  this.themeService
                  .darkTextColorByContrast(this) ?
                  'text-dark' : 'text-white';

    return textClass;
  }

}
