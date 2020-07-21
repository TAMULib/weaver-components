import { ChangeDetectorRef, Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { WvrAbstractBaseComponent } from '../shared/wvr-abstract-base.component';
import { wvrComponentBaseProps } from '../shared/wvr-base-component-props';

@Component({
  selector: 'wvr-button-element',
  templateUrl: './wvr-button.component.html',
  styleUrls: ['./wvr-button.component.scss'],
  ...wvrComponentBaseProps
})
export class WvrButtonComponent extends WvrAbstractBaseComponent {

  /** Used to define the class type for button component.  */
  @Input() btnClass: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link' |
  'outline-primary' | 'outline-secondary' | 'outline-success' | 'outline-danger' | 'outline-warning' | 'outline-info' | 'outline-light' | 'outline-dark' | 'outline-link' = 'primary';

  /** Used to define the size for button component.  */
  @Input() btnSize: 'large' | 'small' | 'block';

  /** Used to define the type of a button.  */
  @Input() wvrBtnType: 'button' | 'checkbox' | 'radio' | 'reset' | 'submit' = 'button';

  /** Allows for the button component to be an anchor tag component if hrefUrl property present. */
  @Input() href: string;

  /** Allows for the override of background */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvr-btn-primary-background')
  @HostBinding('style.--wvr-btn-outline-primary-background')
  @HostBinding('style.--wvr-btn-secondary-background')
  @HostBinding('style.--wvr-btn-outline-secondary-background')
  @HostBinding('style.--wvr-btn-success-background')
  @HostBinding('style.--wvr-btn-outline-success-background')
  @HostBinding('style.--wvr-btn-danger-background')
  @HostBinding('style.--wvr-btn-outline-danger-background')
  @HostBinding('style.--wvr-btn-warning-background')
  @HostBinding('style.--wvr-btn-outline-warning-background')
  @HostBinding('style.--wvr-btn-info-background')
  @HostBinding('style.--wvr-btn-outline-info-background')
  @HostBinding('style.--wvr-btn-light-background')
  @HostBinding('style.--wvr-btn-outline-light-background')
  @HostBinding('style.--wvr-btn-dark-background')
  @HostBinding('style.--wvr-btn-outline-dark-background')
  @HostBinding('style.--wvr-btn-link-background')
  @Input() background;

  /** Allows for the override of active background */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvr-btn-primary-active-background')
  @HostBinding('style.--wvr-btn-outline-primary-active-background')
  @HostBinding('style.--wvr-btn-secondary-active-background')
  @HostBinding('style.--wvr-btn-outline-secondary-active-background')
  @HostBinding('style.--wvr-btn-success-active-background')
  @HostBinding('style.--wvr-btn-outline-success-active-background')
  @HostBinding('style.--wvr-btn-danger-active-background')
  @HostBinding('style.--wvr-btn-outline-danger-active-background')
  @HostBinding('style.--wvr-btn-warning-active-background')
  @HostBinding('style.--wvr-btn-outline-warning-active-background')
  @HostBinding('style.--wvr-btn-info-active-background')
  @HostBinding('style.--wvr-btn-outline-info-active-background')
  @HostBinding('style.--wvr-btn-light-active-background')
  @HostBinding('style.--wvr-btn-outline-light-active-background')
  @HostBinding('style.--wvr-btn-dark-active-background')
  @HostBinding('style.--wvr-btn-outline-dark-active-background')
  @HostBinding('style.--wvr-btn-link-active-background')
  @Input() backgroundActive;

  /** Allows for the override of hover background */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvr-btn-primary-hover-background')
  @HostBinding('style.--wvr-btn-outline-primary-hover-background')
  @HostBinding('style.--wvr-btn-secondary-hover-background')
  @HostBinding('style.--wvr-btn-outline-secondary-hover-background')
  @HostBinding('style.--wvr-btn-success-hover-background')
  @HostBinding('style.--wvr-btn-outline-success-hover-background')
  @HostBinding('style.--wvr-btn-danger-hover-background')
  @HostBinding('style.--wvr-btn-outline-danger-hover-background')
  @HostBinding('style.--wvr-btn-warning-hover-background')
  @HostBinding('style.--wvr-btn-outline-warning-hover-background')
  @HostBinding('style.--wvr-btn-info-hover-background')
  @HostBinding('style.--wvr-btn-outline-info-hover-background')
  @HostBinding('style.--wvr-btn-light-hover-background')
  @HostBinding('style.--wvr-btn-outline-light-hover-background')
  @HostBinding('style.--wvr-btn-dark-hover-background')
  @HostBinding('style.--wvr-btn-outline-dark-hover-background')
  @HostBinding('style.--wvr-btn-link-hover-background')
  @Input() backgroundHover;

  /** Allows for the override of border */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvr-btn-primary-border')
  @HostBinding('style.--wvr-btn-outline-primary-border')
  @HostBinding('style.--wvr-btn-secondary-border')
  @HostBinding('style.--wvr-btn-outline-secondary-border')
  @HostBinding('style.--wvr-btn-success-border')
  @HostBinding('style.--wvr-btn-outline-success-border')
  @HostBinding('style.--wvr-btn-danger-border')
  @HostBinding('style.--wvr-btn-outline-danger-border')
  @HostBinding('style.--wvr-btn-warning-border')
  @HostBinding('style.--wvr-btn-outline-warning-border')
  @HostBinding('style.--wvr-btn-info-border')
  @HostBinding('style.--wvr-btn-outline-info-border')
  @HostBinding('style.--wvr-btn-light-border')
  @HostBinding('style.--wvr-btn-outline-light-border')
  @HostBinding('style.--wvr-btn-dark-border')
  @HostBinding('style.--wvr-btn-outline-dark-border')
  @HostBinding('style.--wvr-btn-link-border')
  @Input() borderColor;

  /** Allows for the override of active border */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvr-btn-primary-active-border')
  @HostBinding('style.--wvr-btn-outline-primary-active-border')
  @HostBinding('style.--wvr-btn-secondary-active-border')
  @HostBinding('style.--wvr-btn-outline-secondary-active-border')
  @HostBinding('style.--wvr-btn-success-active-border')
  @HostBinding('style.--wvr-btn-outline-success-active-border')
  @HostBinding('style.--wvr-btn-danger-active-border')
  @HostBinding('style.--wvr-btn-outline-danger-active-border')
  @HostBinding('style.--wvr-btn-warning-active-border')
  @HostBinding('style.--wvr-btn-outline-warning-active-border')
  @HostBinding('style.--wvr-btn-info-active-border')
  @HostBinding('style.--wvr-btn-outline-info-active-border')
  @HostBinding('style.--wvr-btn-light-active-border')
  @HostBinding('style.--wvr-btn-outline-light-active-border')
  @HostBinding('style.--wvr-btn-dark-active-border')
  @HostBinding('style.--wvr-btn-outline-dark-active-border')
  @HostBinding('style.--wvr-btn-link-active-border')
  @Input() borderActive;

  /** Allows for the override of hover border */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvr-btn-primary-hover-border')
  @HostBinding('style.--wvr-btn-outline-primary-hover-border')
  @HostBinding('style.--wvr-btn-secondary-hover-border')
  @HostBinding('style.--wvr-btn-outline-secondary-hover-border')
  @HostBinding('style.--wvr-btn-success-hover-border')
  @HostBinding('style.--wvr-btn-outline-success-hover-border')
  @HostBinding('style.--wvr-btn-danger-hover-border')
  @HostBinding('style.--wvr-btn-outline-danger-hover-border')
  @HostBinding('style.--wvr-btn-warning-hover-border')
  @HostBinding('style.--wvr-btn-outline-warning-hover-border')
  @HostBinding('style.--wvr-btn-info-hover-border')
  @HostBinding('style.--wvr-btn-outline-info-hover-border')
  @HostBinding('style.--wvr-btn-light-hover-border')
  @HostBinding('style.--wvr-btn-outline-light-hover-border')
  @HostBinding('style.--wvr-btn-dark-hover-border')
  @HostBinding('style.--wvr-btn-outline-dark-hover-border')
  @HostBinding('style.--wvr-btn-link-hover-border')
  @Input() borderHover;

  /** Allows for the override of button border in focus state */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvr-btn-primary-focus-border')
  @HostBinding('style.--wvr-btn-outline-primary-focus-border')
  @HostBinding('style.--wvr-btn-secondary-focus-border')
  @HostBinding('style.--wvr-btn-outline-secondary-focus-border')
  @HostBinding('style.--wvr-btn-success-focus-border')
  @HostBinding('style.--wvr-btn-outline-success-focus-border')
  @HostBinding('style.--wvr-btn-danger-focus-border')
  @HostBinding('style.--wvr-btn-outline-danger-focus-border')
  @HostBinding('style.--wvr-btn-warning-focus-border')
  @HostBinding('style.--wvr-btn-outline-warning-focus-border')
  @HostBinding('style.--wvr-btn-info-focus-border')
  @HostBinding('style.--wvr-btn-outline-info-focus-border')
  @HostBinding('style.--wvr-btn-light-focus-border')
  @HostBinding('style.--wvr-btn-outline-light-focus-border')
  @HostBinding('style.--wvr-btn-dark-focus-border')
  @HostBinding('style.--wvr-btn-outline-dark-focus-border')
  @HostBinding('style.--wvr-btn-link-focus-border')
  @Input() borderFocus;

  /** Allows for override of box-shadow propery when the button is in focus state */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvr-btn-primary-focus-box-shadow')
  @HostBinding('style.--wvr-btn-outline-primary-focus-box-shadow')
  @HostBinding('style.--wvr-btn-secondary-focus-box-shadow')
  @HostBinding('style.--wvr-btn-outline-secondary-focus-box-shadow')
  @HostBinding('style.--wvr-btn-success-focus-box-shadow')
  @HostBinding('style.--wvr-btn-outline-success-focus-box-shadow')
  @HostBinding('style.--wvr-btn-danger-focus-box-shadow')
  @HostBinding('style.--wvr-btn-outline-danger-focus-box-shadow')
  @HostBinding('style.--wvr-btn-warning-focus-box-shadow')
  @HostBinding('style.--wvr-btn-outline-warning-focus-box-shadow')
  @HostBinding('style.--wvr-btn-info-focus-box-shadow')
  @HostBinding('style.--wvr-btn-outline-info-focus-box-shadow')
  @HostBinding('style.--wvr-btn-light-focus-box-shadow')
  @HostBinding('style.--wvr-btn-outline-light-focus-box-shadow')
  @HostBinding('style.--wvr-btn-dark-focus-box-shadow')
  @HostBinding('style.--wvr-btn-outline-dark-focus-box-shadow')
  @HostBinding('style.--wvr-btn-link-focus-box-shadow')
  @Input() boxShadowFocus;

  /** Allows for the override of color */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvr-btn-primary-color')
  @HostBinding('style.--wvr-btn-outline-primary-color')
  @HostBinding('style.--wvr-btn-secondary-color')
  @HostBinding('style.--wvr-btn-outline-secondary-color')
  @HostBinding('style.--wvr-btn-success-color')
  @HostBinding('style.--wvr-btn-outline-success-color')
  @HostBinding('style.--wvr-btn-danger-color')
  @HostBinding('style.--wvr-btn-outline-danger-color')
  @HostBinding('style.--wvr-btn-warning-color')
  @HostBinding('style.--wvr-btn-outline-warning-color')
  @HostBinding('style.--wvr-btn-info-color')
  @HostBinding('style.--wvr-btn-outline-info-color')
  @HostBinding('style.--wvr-btn-light-color')
  @HostBinding('style.--wvr-btn-outline-light-color')
  @HostBinding('style.--wvr-btn-dark-color')
  @HostBinding('style.--wvr-btn-outline-dark-color')
  @HostBinding('style.--wvr-btn-link-color')
  @Input() color;

  /** Allows for the override of active color */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvr-btn-primary-active-color')
  @HostBinding('style.--wvr-btn-outline-primary-active-color')
  @HostBinding('style.--wvr-btn-secondary-active-color')
  @HostBinding('style.--wvr-btn-outline-secondary-active-color')
  @HostBinding('style.--wvr-btn-success-active-color')
  @HostBinding('style.--wvr-btn-outline-success-active-color')
  @HostBinding('style.--wvr-btn-danger-active-color')
  @HostBinding('style.--wvr-btn-outline-danger-active-color')
  @HostBinding('style.--wvr-btn-warning-active-color')
  @HostBinding('style.--wvr-btn-outline-warning-active-color')
  @HostBinding('style.--wvr-btn-info-active-color')
  @HostBinding('style.--wvr-btn-outline-info-active-color')
  @HostBinding('style.--wvr-btn-light-active-color')
  @HostBinding('style.--wvr-btn-outline-light-active-color')
  @HostBinding('style.--wvr-btn-dark-active-color')
  @HostBinding('style.--wvr-btn-outline-dark-active-color')
  @Input() colorActive;

  /** Allows for the override of hover color */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvr-btn-primary-hover-color')
  @HostBinding('style.--wvr-btn-outline-primary-hover-color')
  @HostBinding('style.--wvr-btn-secondary-hover-color')
  @HostBinding('style.--wvr-btn-outline-secondary-hover-color')
  @HostBinding('style.--wvr-btn-success-hover-color')
  @HostBinding('style.--wvr-btn-outline-success-hover-color')
  @HostBinding('style.--wvr-btn-danger-hover-color')
  @HostBinding('style.--wvr-btn-outline-danger-hover-color')
  @HostBinding('style.--wvr-btn-warning-hover-color')
  @HostBinding('style.--wvr-btn-outline-warning-hover-color')
  @HostBinding('style.--wvr-btn-info-hover-color')
  @HostBinding('style.--wvr-btn-outline-info-hover-color')
  @HostBinding('style.--wvr-btn-light-hover-color')
  @HostBinding('style.--wvr-btn-outline-light-hover-color')
  @HostBinding('style.--wvr-btn-dark-hover-color')
  @HostBinding('style.--wvr-btn-outline-dark-hover-color')
  @HostBinding('style.--wvr-btn-link-hover-color')
  @Input() colorHover;

  /** Allows for the override of button text-decoration property */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvr-btn-primary-text-decoration')
  @HostBinding('style.--wvr-btn-outline-primary-text-decoration')
  @HostBinding('style.--wvr-btn-secondary-text-decoration')
  @HostBinding('style.--wvr-btn-outline-secondary-text-decoration')
  @HostBinding('style.--wvr-btn-success-text-decoration')
  @HostBinding('style.--wvr-btn-outline-success-text-decoration')
  @HostBinding('style.--wvr-btn-danger-text-decoration')
  @HostBinding('style.--wvr-btn-outline-danger-text-decoration')
  @HostBinding('style.--wvr-btn-warning-text-decoration')
  @HostBinding('style.--wvr-btn-outline-warning-text-decoration')
  @HostBinding('style.--wvr-btn-info-text-decoration')
  @HostBinding('style.--wvr-btn-outline-info-text-decoration')
  @HostBinding('style.--wvr-btn-light-text-decoration')
  @HostBinding('style.--wvr-btn-outline-light-text-decoration')
  @HostBinding('style.--wvr-btn-dark-text-decoration')
  @HostBinding('style.--wvr-btn-outline-dark-text-decoration')
  @HostBinding('style.--wvr-btn-link-text-decoration')
  @Input() textDecoration;

  /** Allows for the override of button active text-decoration property */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvr-btn-primary-active-text-decoration')
  @HostBinding('style.--wvr-btn-outline-primary-active-text-decoration')
  @HostBinding('style.--wvr-btn-secondary-active-text-decoration')
  @HostBinding('style.--wvr-btn-outline-secondary-active-text-decoration')
  @HostBinding('style.--wvr-btn-success-active-text-decoration')
  @HostBinding('style.--wvr-btn-outline-success-active-text-decoration')
  @HostBinding('style.--wvr-btn-danger-active-text-decoration')
  @HostBinding('style.--wvr-btn-outline-danger-active-text-decoration')
  @HostBinding('style.--wvr-btn-warning-active-text-decoration')
  @HostBinding('style.--wvr-btn-outline-warning-active-text-decoration')
  @HostBinding('style.--wvr-btn-info-active-text-decoration')
  @HostBinding('style.--wvr-btn-outline-info-active-text-decoration')
  @HostBinding('style.--wvr-btn-light-active-text-decoration')
  @HostBinding('style.--wvr-btn-outline-light-active-text-decoration')
  @HostBinding('style.--wvr-btn-dark-active-text-decoration')
  @HostBinding('style.--wvr-btn-outline-dark-active-text-decoration')
  @HostBinding('style.--wvr-btn-link-active-text-decoration')
  @Input() textDecorationActive;

  /** Allows for the override of button hover text-decoration property */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvr-btn-primary-hover-text-decoration')
  @HostBinding('style.--wvr-btn-outline-primary-hover-text-decoration')
  @HostBinding('style.--wvr-btn-secondary-hover-text-decoration')
  @HostBinding('style.--wvr-btn-outline-secondary-hover-text-decoration')
  @HostBinding('style.--wvr-btn-success-hover-text-decoration')
  @HostBinding('style.--wvr-btn-outline-success-hover-text-decoration')
  @HostBinding('style.--wvr-btn-danger-hover-text-decoration')
  @HostBinding('style.--wvr-btn-outline-danger-hover-text-decoration')
  @HostBinding('style.--wvr-btn-warning-hover-text-decoration')
  @HostBinding('style.--wvr-btn-outline-warning-hover-text-decoration')
  @HostBinding('style.--wvr-btn-info-hover-text-decoration')
  @HostBinding('style.--wvr-btn-outline-info-hover-text-decoration')
  @HostBinding('style.--wvr-btn-light-hover-text-decoration')
  @HostBinding('style.--wvr-btn-outline-light-hover-text-decoration')
  @HostBinding('style.--wvr-btn-dark-hover-text-decoration')
  @HostBinding('style.--wvr-btn-outline-dark-hover-text-decoration')
  @HostBinding('style.--wvr-btn-link-hover-text-decoration')
  @Input() textDecorationHover;

  /** Allows for the override of button focus text-decoration property */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvr-btn-primary-focus-text-decoration')
  @HostBinding('style.--wvr-btn-outline-primary-focus-text-decoration')
  @HostBinding('style.--wvr-btn-secondary-focus-text-decoration')
  @HostBinding('style.--wvr-btn-outline-secondary-focus-text-decoration')
  @HostBinding('style.--wvr-btn-success-focus-text-decoration')
  @HostBinding('style.--wvr-btn-outline-success-focus-text-decoration')
  @HostBinding('style.--wvr-btn-danger-focus-text-decoration')
  @HostBinding('style.--wvr-btn-outline-danger-focus-text-decoration')
  @HostBinding('style.--wvr-btn-warning-focus-text-decoration')
  @HostBinding('style.--wvr-btn-outline-warning-focus-text-decoration')
  @HostBinding('style.--wvr-btn-info-focus-text-decoration')
  @HostBinding('style.--wvr-btn-outline-info-focus-text-decoration')
  @HostBinding('style.--wvr-btn-light-focus-text-decoration')
  @HostBinding('style.--wvr-btn-outline-light-focus-text-decoration')
  @HostBinding('style.--wvr-btn-dark-focus-text-decoration')
  @HostBinding('style.--wvr-btn-outline-dark-focus-text-decoration')
  @HostBinding('style.--wvr-btn-link-focus-text-decoration')
  @Input() textDecorationFocus;

  /** Allows for the override of button border radius */
  @HostBinding('style.--wvr-btn-border-radius') @Input() borderRadius;

  /** Allows for the override of button cursor property */
  @HostBinding('style.--wvr-btn-cursor') @Input() cursor;

  /** Allows for the override of button font family property */
  @HostBinding('style.--wvr-btn-font-family-sans-serif') @Input() fontFamily;

  /** Allows for the override of button font size property */
  @HostBinding('style.--wvr-btn-font-size') @Input() fontSize;

  /** Allows for the override of button hover line height property */
  @HostBinding('style.--wvr-btn-line-height') @Input() lineHeight;

  /** Allows for the override of button padding property */
  @HostBinding('style.--wvr-btn-padding') @Input() padding;

  /** Allows for the override of button text align property */
  @HostBinding('style.--wvr-btn-text-align') @Input() textAlign;

  /** Allows for the override of button vertical align property */
  @HostBinding('style.--wvr-btn-vertical-align') @Input() verticalAlign;

  constructor(private cdRef: ChangeDetectorRef) {
    super();
  }

  onClick(): void {
    this.rotationState = this.rotationState === 'default' ? 'rotated' : 'default';
    this.cdRef.detectChanges();
    console.log(this.rotationState);
  }

}
