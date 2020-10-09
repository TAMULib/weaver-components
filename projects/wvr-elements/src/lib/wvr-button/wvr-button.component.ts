import { Component, HostBinding, Injector, Input } from '@angular/core';
import { Observable } from 'rxjs';
import * as ManifestActions from '../core/manifest/manifest.actions';
import * as rootStore from '../core/store';
import { WvrSelect } from '../shared/utility/decorators.utilty';
import { WvrBaseComponent } from '../shared/wvr-base.component';

@Component({
  selector: 'wvr-button-component',
  templateUrl: './wvr-button.component.html',
  styleUrls: ['./wvr-button.component.scss']
})
export class WvrButtonComponent extends WvrBaseComponent {

  /** Used to define the class type for button component.  */
  @Input() btnClass: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link' |
    'outline-primary' | 'outline-secondary' | 'outline-success' | 'outline-danger' | 'outline-warning' | 'outline-info' | 'outline-light' | 'outline-dark' | 'outline-link' = 'primary';

  /** Used to define the size for button component.  */
  @Input() btnSize: 'large' | 'small' | 'block';

  /** Used to define the type of a button.  */
  @Input() wvrBtnType: 'button' | 'checkbox' | 'radio' | 'reset' | 'submit' = 'button';

  /** Allows for the button component to be an anchor tag component if href property present. */
  @Input() href: string;

  /** Allows for the override of background */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvre-btn-primary-background')
  @HostBinding('style.--wvre-btn-outline-primary-background')
  @HostBinding('style.--wvre-btn-secondary-background')
  @HostBinding('style.--wvre-btn-outline-secondary-background')
  @HostBinding('style.--wvre-btn-success-background')
  @HostBinding('style.--wvre-btn-outline-success-background')
  @HostBinding('style.--wvre-btn-danger-background')
  @HostBinding('style.--wvre-btn-outline-danger-background')
  @HostBinding('style.--wvre-btn-warning-background')
  @HostBinding('style.--wvre-btn-outline-warning-background')
  @HostBinding('style.--wvre-btn-info-background')
  @HostBinding('style.--wvre-btn-outline-info-background')
  @HostBinding('style.--wvre-btn-light-background')
  @HostBinding('style.--wvre-btn-outline-light-background')
  @HostBinding('style.--wvre-btn-dark-background')
  @HostBinding('style.--wvre-btn-outline-dark-background')
  @HostBinding('style.--wvre-btn-link-background')
  @Input() background;

  /** Allows for the override of active background */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvre-btn-primary-active-background')
  @HostBinding('style.--wvre-btn-outline-primary-active-background')
  @HostBinding('style.--wvre-btn-secondary-active-background')
  @HostBinding('style.--wvre-btn-outline-secondary-active-background')
  @HostBinding('style.--wvre-btn-success-active-background')
  @HostBinding('style.--wvre-btn-outline-success-active-background')
  @HostBinding('style.--wvre-btn-danger-active-background')
  @HostBinding('style.--wvre-btn-outline-danger-active-background')
  @HostBinding('style.--wvre-btn-warning-active-background')
  @HostBinding('style.--wvre-btn-outline-warning-active-background')
  @HostBinding('style.--wvre-btn-info-active-background')
  @HostBinding('style.--wvre-btn-outline-info-active-background')
  @HostBinding('style.--wvre-btn-light-active-background')
  @HostBinding('style.--wvre-btn-outline-light-active-background')
  @HostBinding('style.--wvre-btn-dark-active-background')
  @HostBinding('style.--wvre-btn-outline-dark-active-background')
  @HostBinding('style.--wvre-btn-link-active-background')
  @Input() backgroundActive;

  /** Allows for the override of hover background */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvre-btn-primary-hover-background')
  @HostBinding('style.--wvre-btn-outline-primary-hover-background')
  @HostBinding('style.--wvre-btn-secondary-hover-background')
  @HostBinding('style.--wvre-btn-outline-secondary-hover-background')
  @HostBinding('style.--wvre-btn-success-hover-background')
  @HostBinding('style.--wvre-btn-outline-success-hover-background')
  @HostBinding('style.--wvre-btn-danger-hover-background')
  @HostBinding('style.--wvre-btn-outline-danger-hover-background')
  @HostBinding('style.--wvre-btn-warning-hover-background')
  @HostBinding('style.--wvre-btn-outline-warning-hover-background')
  @HostBinding('style.--wvre-btn-info-hover-background')
  @HostBinding('style.--wvre-btn-outline-info-hover-background')
  @HostBinding('style.--wvre-btn-light-hover-background')
  @HostBinding('style.--wvre-btn-outline-light-hover-background')
  @HostBinding('style.--wvre-btn-dark-hover-background')
  @HostBinding('style.--wvre-btn-outline-dark-hover-background')
  @HostBinding('style.--wvre-btn-link-hover-background')
  @Input() backgroundHover;

  /** Allows for the override of border */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvre-btn-primary-border')
  @HostBinding('style.--wvre-btn-outline-primary-border')
  @HostBinding('style.--wvre-btn-secondary-border')
  @HostBinding('style.--wvre-btn-outline-secondary-border')
  @HostBinding('style.--wvre-btn-success-border')
  @HostBinding('style.--wvre-btn-outline-success-border')
  @HostBinding('style.--wvre-btn-danger-border')
  @HostBinding('style.--wvre-btn-outline-danger-border')
  @HostBinding('style.--wvre-btn-warning-border')
  @HostBinding('style.--wvre-btn-outline-warning-border')
  @HostBinding('style.--wvre-btn-info-border')
  @HostBinding('style.--wvre-btn-outline-info-border')
  @HostBinding('style.--wvre-btn-light-border')
  @HostBinding('style.--wvre-btn-outline-light-border')
  @HostBinding('style.--wvre-btn-dark-border')
  @HostBinding('style.--wvre-btn-outline-dark-border')
  @HostBinding('style.--wvre-btn-link-border')
  @Input() borderColor;

  /** Allows for the override of active border */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvre-btn-primary-active-border')
  @HostBinding('style.--wvre-btn-outline-primary-active-border')
  @HostBinding('style.--wvre-btn-secondary-active-border')
  @HostBinding('style.--wvre-btn-outline-secondary-active-border')
  @HostBinding('style.--wvre-btn-success-active-border')
  @HostBinding('style.--wvre-btn-outline-success-active-border')
  @HostBinding('style.--wvre-btn-danger-active-border')
  @HostBinding('style.--wvre-btn-outline-danger-active-border')
  @HostBinding('style.--wvre-btn-warning-active-border')
  @HostBinding('style.--wvre-btn-outline-warning-active-border')
  @HostBinding('style.--wvre-btn-info-active-border')
  @HostBinding('style.--wvre-btn-outline-info-active-border')
  @HostBinding('style.--wvre-btn-light-active-border')
  @HostBinding('style.--wvre-btn-outline-light-active-border')
  @HostBinding('style.--wvre-btn-dark-active-border')
  @HostBinding('style.--wvre-btn-outline-dark-active-border')
  @HostBinding('style.--wvre-btn-link-active-border')
  @Input() borderActive;

  /** Allows for the override of hover border */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvre-btn-primary-hover-border')
  @HostBinding('style.--wvre-btn-outline-primary-hover-border')
  @HostBinding('style.--wvre-btn-secondary-hover-border')
  @HostBinding('style.--wvre-btn-outline-secondary-hover-border')
  @HostBinding('style.--wvre-btn-success-hover-border')
  @HostBinding('style.--wvre-btn-outline-success-hover-border')
  @HostBinding('style.--wvre-btn-danger-hover-border')
  @HostBinding('style.--wvre-btn-outline-danger-hover-border')
  @HostBinding('style.--wvre-btn-warning-hover-border')
  @HostBinding('style.--wvre-btn-outline-warning-hover-border')
  @HostBinding('style.--wvre-btn-info-hover-border')
  @HostBinding('style.--wvre-btn-outline-info-hover-border')
  @HostBinding('style.--wvre-btn-light-hover-border')
  @HostBinding('style.--wvre-btn-outline-light-hover-border')
  @HostBinding('style.--wvre-btn-dark-hover-border')
  @HostBinding('style.--wvre-btn-outline-dark-hover-border')
  @HostBinding('style.--wvre-btn-link-hover-border')
  @Input() borderHover;

  /** Allows for the override of button border in focus state */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvre-btn-primary-focus-border')
  @HostBinding('style.--wvre-btn-outline-primary-focus-border')
  @HostBinding('style.--wvre-btn-secondary-focus-border')
  @HostBinding('style.--wvre-btn-outline-secondary-focus-border')
  @HostBinding('style.--wvre-btn-success-focus-border')
  @HostBinding('style.--wvre-btn-outline-success-focus-border')
  @HostBinding('style.--wvre-btn-danger-focus-border')
  @HostBinding('style.--wvre-btn-outline-danger-focus-border')
  @HostBinding('style.--wvre-btn-warning-focus-border')
  @HostBinding('style.--wvre-btn-outline-warning-focus-border')
  @HostBinding('style.--wvre-btn-info-focus-border')
  @HostBinding('style.--wvre-btn-outline-info-focus-border')
  @HostBinding('style.--wvre-btn-light-focus-border')
  @HostBinding('style.--wvre-btn-outline-light-focus-border')
  @HostBinding('style.--wvre-btn-dark-focus-border')
  @HostBinding('style.--wvre-btn-outline-dark-focus-border')
  @HostBinding('style.--wvre-btn-link-focus-border')
  @Input() borderFocus;

  /** Allows for override of box-shadow propery when the button is in focus state */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvre-btn-primary-focus-box-shadow')
  @HostBinding('style.--wvre-btn-outline-primary-focus-box-shadow')
  @HostBinding('style.--wvre-btn-secondary-focus-box-shadow')
  @HostBinding('style.--wvre-btn-outline-secondary-focus-box-shadow')
  @HostBinding('style.--wvre-btn-success-focus-box-shadow')
  @HostBinding('style.--wvre-btn-outline-success-focus-box-shadow')
  @HostBinding('style.--wvre-btn-danger-focus-box-shadow')
  @HostBinding('style.--wvre-btn-outline-danger-focus-box-shadow')
  @HostBinding('style.--wvre-btn-warning-focus-box-shadow')
  @HostBinding('style.--wvre-btn-outline-warning-focus-box-shadow')
  @HostBinding('style.--wvre-btn-info-focus-box-shadow')
  @HostBinding('style.--wvre-btn-outline-info-focus-box-shadow')
  @HostBinding('style.--wvre-btn-light-focus-box-shadow')
  @HostBinding('style.--wvre-btn-outline-light-focus-box-shadow')
  @HostBinding('style.--wvre-btn-dark-focus-box-shadow')
  @HostBinding('style.--wvre-btn-outline-dark-focus-box-shadow')
  @HostBinding('style.--wvre-btn-link-focus-box-shadow')
  @Input() boxShadowFocus;

  /** Allows for the override of color */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvre-btn-primary-color')
  @HostBinding('style.--wvre-btn-outline-primary-color')
  @HostBinding('style.--wvre-btn-secondary-color')
  @HostBinding('style.--wvre-btn-outline-secondary-color')
  @HostBinding('style.--wvre-btn-success-color')
  @HostBinding('style.--wvre-btn-outline-success-color')
  @HostBinding('style.--wvre-btn-danger-color')
  @HostBinding('style.--wvre-btn-outline-danger-color')
  @HostBinding('style.--wvre-btn-warning-color')
  @HostBinding('style.--wvre-btn-outline-warning-color')
  @HostBinding('style.--wvre-btn-info-color')
  @HostBinding('style.--wvre-btn-outline-info-color')
  @HostBinding('style.--wvre-btn-light-color')
  @HostBinding('style.--wvre-btn-outline-light-color')
  @HostBinding('style.--wvre-btn-dark-color')
  @HostBinding('style.--wvre-btn-outline-dark-color')
  @HostBinding('style.--wvre-btn-link-color')
  @Input() color;

  /** Allows for the override of active color */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvre-btn-primary-active-color')
  @HostBinding('style.--wvre-btn-outline-primary-active-color')
  @HostBinding('style.--wvre-btn-secondary-active-color')
  @HostBinding('style.--wvre-btn-outline-secondary-active-color')
  @HostBinding('style.--wvre-btn-success-active-color')
  @HostBinding('style.--wvre-btn-outline-success-active-color')
  @HostBinding('style.--wvre-btn-danger-active-color')
  @HostBinding('style.--wvre-btn-outline-danger-active-color')
  @HostBinding('style.--wvre-btn-warning-active-color')
  @HostBinding('style.--wvre-btn-outline-warning-active-color')
  @HostBinding('style.--wvre-btn-info-active-color')
  @HostBinding('style.--wvre-btn-outline-info-active-color')
  @HostBinding('style.--wvre-btn-light-active-color')
  @HostBinding('style.--wvre-btn-outline-light-active-color')
  @HostBinding('style.--wvre-btn-dark-active-color')
  @HostBinding('style.--wvre-btn-outline-dark-active-color')
  @Input() colorActive;

  /** Allows for the override of hover color */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvre-btn-primary-hover-color')
  @HostBinding('style.--wvre-btn-outline-primary-hover-color')
  @HostBinding('style.--wvre-btn-secondary-hover-color')
  @HostBinding('style.--wvre-btn-outline-secondary-hover-color')
  @HostBinding('style.--wvre-btn-success-hover-color')
  @HostBinding('style.--wvre-btn-outline-success-hover-color')
  @HostBinding('style.--wvre-btn-danger-hover-color')
  @HostBinding('style.--wvre-btn-outline-danger-hover-color')
  @HostBinding('style.--wvre-btn-warning-hover-color')
  @HostBinding('style.--wvre-btn-outline-warning-hover-color')
  @HostBinding('style.--wvre-btn-info-hover-color')
  @HostBinding('style.--wvre-btn-outline-info-hover-color')
  @HostBinding('style.--wvre-btn-light-hover-color')
  @HostBinding('style.--wvre-btn-outline-light-hover-color')
  @HostBinding('style.--wvre-btn-dark-hover-color')
  @HostBinding('style.--wvre-btn-outline-dark-hover-color')
  @HostBinding('style.--wvre-btn-link-hover-color')
  @Input() colorHover;

  /** Allows for the override of button text-decoration property */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvre-btn-primary-text-decoration')
  @HostBinding('style.--wvre-btn-outline-primary-text-decoration')
  @HostBinding('style.--wvre-btn-secondary-text-decoration')
  @HostBinding('style.--wvre-btn-outline-secondary-text-decoration')
  @HostBinding('style.--wvre-btn-success-text-decoration')
  @HostBinding('style.--wvre-btn-outline-success-text-decoration')
  @HostBinding('style.--wvre-btn-danger-text-decoration')
  @HostBinding('style.--wvre-btn-outline-danger-text-decoration')
  @HostBinding('style.--wvre-btn-warning-text-decoration')
  @HostBinding('style.--wvre-btn-outline-warning-text-decoration')
  @HostBinding('style.--wvre-btn-info-text-decoration')
  @HostBinding('style.--wvre-btn-outline-info-text-decoration')
  @HostBinding('style.--wvre-btn-light-text-decoration')
  @HostBinding('style.--wvre-btn-outline-light-text-decoration')
  @HostBinding('style.--wvre-btn-dark-text-decoration')
  @HostBinding('style.--wvre-btn-outline-dark-text-decoration')
  @HostBinding('style.--wvre-btn-link-text-decoration')
  @Input() textDecoration;

  /** Allows for the override of button active text-decoration property */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvre-btn-primary-active-text-decoration')
  @HostBinding('style.--wvre-btn-outline-primary-active-text-decoration')
  @HostBinding('style.--wvre-btn-secondary-active-text-decoration')
  @HostBinding('style.--wvre-btn-outline-secondary-active-text-decoration')
  @HostBinding('style.--wvre-btn-success-active-text-decoration')
  @HostBinding('style.--wvre-btn-outline-success-active-text-decoration')
  @HostBinding('style.--wvre-btn-danger-active-text-decoration')
  @HostBinding('style.--wvre-btn-outline-danger-active-text-decoration')
  @HostBinding('style.--wvre-btn-warning-active-text-decoration')
  @HostBinding('style.--wvre-btn-outline-warning-active-text-decoration')
  @HostBinding('style.--wvre-btn-info-active-text-decoration')
  @HostBinding('style.--wvre-btn-outline-info-active-text-decoration')
  @HostBinding('style.--wvre-btn-light-active-text-decoration')
  @HostBinding('style.--wvre-btn-outline-light-active-text-decoration')
  @HostBinding('style.--wvre-btn-dark-active-text-decoration')
  @HostBinding('style.--wvre-btn-outline-dark-active-text-decoration')
  @HostBinding('style.--wvre-btn-link-active-text-decoration')
  @Input() textDecorationActive;

  /** Allows for the override of button hover text-decoration property */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvre-btn-primary-hover-text-decoration')
  @HostBinding('style.--wvre-btn-outline-primary-hover-text-decoration')
  @HostBinding('style.--wvre-btn-secondary-hover-text-decoration')
  @HostBinding('style.--wvre-btn-outline-secondary-hover-text-decoration')
  @HostBinding('style.--wvre-btn-success-hover-text-decoration')
  @HostBinding('style.--wvre-btn-outline-success-hover-text-decoration')
  @HostBinding('style.--wvre-btn-danger-hover-text-decoration')
  @HostBinding('style.--wvre-btn-outline-danger-hover-text-decoration')
  @HostBinding('style.--wvre-btn-warning-hover-text-decoration')
  @HostBinding('style.--wvre-btn-outline-warning-hover-text-decoration')
  @HostBinding('style.--wvre-btn-info-hover-text-decoration')
  @HostBinding('style.--wvre-btn-outline-info-hover-text-decoration')
  @HostBinding('style.--wvre-btn-light-hover-text-decoration')
  @HostBinding('style.--wvre-btn-outline-light-hover-text-decoration')
  @HostBinding('style.--wvre-btn-dark-hover-text-decoration')
  @HostBinding('style.--wvre-btn-outline-dark-hover-text-decoration')
  @HostBinding('style.--wvre-btn-link-hover-text-decoration')
  @Input() textDecorationHover;

  /** Allows for the override of button focus text-decoration property */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvre-btn-primary-focus-text-decoration')
  @HostBinding('style.--wvre-btn-outline-primary-focus-text-decoration')
  @HostBinding('style.--wvre-btn-secondary-focus-text-decoration')
  @HostBinding('style.--wvre-btn-outline-secondary-focus-text-decoration')
  @HostBinding('style.--wvre-btn-success-focus-text-decoration')
  @HostBinding('style.--wvre-btn-outline-success-focus-text-decoration')
  @HostBinding('style.--wvre-btn-danger-focus-text-decoration')
  @HostBinding('style.--wvre-btn-outline-danger-focus-text-decoration')
  @HostBinding('style.--wvre-btn-warning-focus-text-decoration')
  @HostBinding('style.--wvre-btn-outline-warning-focus-text-decoration')
  @HostBinding('style.--wvre-btn-info-focus-text-decoration')
  @HostBinding('style.--wvre-btn-outline-info-focus-text-decoration')
  @HostBinding('style.--wvre-btn-light-focus-text-decoration')
  @HostBinding('style.--wvre-btn-outline-light-focus-text-decoration')
  @HostBinding('style.--wvre-btn-dark-focus-text-decoration')
  @HostBinding('style.--wvre-btn-outline-dark-focus-text-decoration')
  @HostBinding('style.--wvre-btn-link-focus-text-decoration')
  @Input() textDecorationFocus;

  /** Allows for the override of button border radius */
  @HostBinding('style.--wvre-btn-border-radius') @Input() borderRadius;

  /** Allows for the override of button cursor property */
  @HostBinding('style.--wvre-btn-cursor') @Input() cursor;

  /** Allows for the override of button font family property */
  @HostBinding('style.--wvre-btn-font-family-sans-serif') @Input() fontFamily;

  /** Allows for the override of button font size property */
  @HostBinding('style.--wvre-btn-font-size') @Input() fontSize;

  /** Allows for the override of button font weight property */
  @HostBinding('style.--wvre-btn-font-weight') @Input() fontWeight;

  /** Allows for the override of button hover line height property */
  @HostBinding('style.--wvre-btn-line-height') @Input() lineHeight;

  /** Allows for the override of button padding property */
  @HostBinding('style.--wvre-btn-padding') @Input() padding;

  /** Allows for the override of button text align property */
  @HostBinding('style.--wvre-btn-text-align') @Input() textAlign;

  /** Allows for the override of button vertical align property */
  @HostBinding('style.--wvre-btn-vertical-align') @Input() verticalAlign;

  // tslint:disable-next-line:max-line-length
  // @WvrSelect({ selector: rootStore.selectManifestEntryResponse('Directory App', 'All Sorted') }) private sampleTestResponse: Observable<any>;

  constructor(injector: Injector) {
    super(injector);
  }

}
