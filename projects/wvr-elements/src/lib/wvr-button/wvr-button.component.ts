import { ChangeDetectorRef, Component, ElementRef, HostBinding, Input } from '@angular/core';
import { WvrAbstractBaseComponent } from '../shared/wvr-abstract-base.component';

@Component({
  selector: 'wvr-button-element',
  templateUrl: './wvr-button.component.html',
  styleUrls: ['./wvr-button.component.scss']
})
export class WvrButtonComponent extends WvrAbstractBaseComponent {

  /** Used to define the class type for button component.  */
  @Input() btnClass: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link' |
  'outline-primary' | 'outline-secondary' | 'outline-success' | 'outline-danger' | 'outline-warning' | 'outline-info' | 'outline-light' | 'outline-dark' | 'outline-link' = 'primary';

  /** Used to define the size for button component.  */
  @Input() btnSize: 'large' | 'small' | 'block' = 'large';

  /** Used to define the type of a button.  */
  @Input() wvrBtnType: 'button' | 'checkbox' | 'radio' | 'reset' | 'submit' = 'button';

  /** Allows for the button component to be an anchor tag component if hrefUrl property present. */
  @Input() href: string;

  /** Used internally to set the disabled state of the button component. */
  // @Input() isDisabled = true;

  /** Allows for the override of background */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvr-btn-primary-background')
  @HostBinding('style.--wvr-btn-primary-active-background')
  @HostBinding('style.--wvr-btn-primary-hover-background')
  @HostBinding('style.--wvr-btn-outline-primary-background')
  @HostBinding('style.--wvr-btn-outline-primary-active-background')
  @HostBinding('style.--wvr-btn-outline-primary-hover-background')
  @HostBinding('style.--wvr-btn-secondary-background')
  @HostBinding('style.--wvr-btn-secondary-active-background')
  @HostBinding('style.--wvr-btn-secondary-hover-background')
  @HostBinding('style.--wvr-btn-outline-secondary-background')
  @HostBinding('style.--wvr-btn-outline-secondary-active-background')
  @HostBinding('style.--wvr-btn-outline-secondary-hover-background')
  @HostBinding('style.--wvr-btn-success-background')
  @HostBinding('style.--wvr-btn-success-active-background')
  @HostBinding('style.--wvr-btn-success-hover-background')
  @HostBinding('style.--wvr-btn-outline-success-background')
  @HostBinding('style.--wvr-btn-outline-success-active-background')
  @HostBinding('style.--wvr-btn-outline-success-hover-background')
  @HostBinding('style.--wvr-btn-danger-background')
  @HostBinding('style.--wvr-btn-danger-active-background')
  @HostBinding('style.--wvr-btn-danger-hover-background')
  @HostBinding('style.--wvr-btn-outline-danger-background')
  @HostBinding('style.--wvr-btn-outline-danger-active-background')
  @HostBinding('style.--wvr-btn-outline-danger-hover-background')
  @HostBinding('style.--wvr-btn-warning-background')
  @HostBinding('style.--wvr-btn-warning-active-background')
  @HostBinding('style.--wvr-btn-warning-hover-background')
  @HostBinding('style.--wvr-btn-outline-warning-background')
  @HostBinding('style.--wvr-btn-outline-warning-active-background')
  @HostBinding('style.--wvr-btn-outline-warning-hover-background')
  @HostBinding('style.--wvr-btn-info-background')
  @HostBinding('style.--wvr-btn-info-active-background')
  @HostBinding('style.--wvr-btn-info-hover-background')
  @HostBinding('style.--wvr-btn-outline-info-background')
  @HostBinding('style.--wvr-btn-outline-info-active-background')
  @HostBinding('style.--wvr-btn-outline-info-hover-background')
  @HostBinding('style.--wvr-btn-light-background')
  @HostBinding('style.--wvr-btn-light-active-background')
  @HostBinding('style.--wvr-btn-light-hover-background')
  @HostBinding('style.--wvr-btn-outline-light-background')
  @HostBinding('style.--wvr-btn-outline-light-active-background')
  @HostBinding('style.--wvr-btn-outline-light-hover-background')
  @HostBinding('style.--wvr-btn-dark-background')
  @HostBinding('style.--wvr-btn-dark-active-background')
  @HostBinding('style.--wvr-btn-dark-hover-background')
  @HostBinding('style.--wvr-btn-outline-dark-background')
  @HostBinding('style.--wvr-btn-outline-dark-active-background')
  @HostBinding('style.--wvr-btn-outline-dark-hover-background')
  @HostBinding('style.--wvr-btn-link-background')
  @HostBinding('style.--wvr-btn-link-hover-background')
  @Input() background = 'var(--wvr-btn-primary-background)';

  /** Allows for the override of border */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvr-btn-primary-border')
  @HostBinding('style.--wvr-btn-primary-active-border')
  @HostBinding('style.--wvr-btn-primary-hover-border')
  @HostBinding('style.--wvr-btn-outline-primary-border')
  @HostBinding('style.--wvr-btn-outline-primary-active-border')
  @HostBinding('style.--wvr-btn-outline-primary-hover-border')
  @HostBinding('style.--wvr-btn-secondary-border')
  @HostBinding('style.--wvr-btn-secondary-active-border')
  @HostBinding('style.--wvr-btn-secondary-hover-border')
  @HostBinding('style.--wvr-btn-outline-secondary-border')
  @HostBinding('style.--wvr-btn-outline-secondary-active-border')
  @HostBinding('style.--wvr-btn-outline-secondary-hover-border')
  @HostBinding('style.--wvr-btn-success-border')
  @HostBinding('style.--wvr-btn-success-active-border')
  @HostBinding('style.--wvr-btn-success-hover-border')
  @HostBinding('style.--wvr-btn-outline-success-border')
  @HostBinding('style.--wvr-btn-outline-success-active-border')
  @HostBinding('style.--wvr-btn-outline-success-hover-border')
  @HostBinding('style.--wvr-btn-danger-border')
  @HostBinding('style.--wvr-btn-danger-active-border')
  @HostBinding('style.--wvr-btn-danger-hover-border')
  @HostBinding('style.--wvr-btn-outline-danger-border')
  @HostBinding('style.--wvr-btn-outline-danger-active-border')
  @HostBinding('style.--wvr-btn-outline-danger-hover-border')
  @HostBinding('style.--wvr-btn-warning-border')
  @HostBinding('style.--wvr-btn-warning-active-border')
  @HostBinding('style.--wvr-btn-warning-hover-border')
  @HostBinding('style.--wvr-btn-outline-warning-border')
  @HostBinding('style.--wvr-btn-outline-warning-active-border')
  @HostBinding('style.--wvr-btn-outline-warning-hover-border')
  @HostBinding('style.--wvr-btn-info-border')
  @HostBinding('style.--wvr-btn-info-active-border')
  @HostBinding('style.--wvr-btn-info-hover-border')
  @HostBinding('style.--wvr-btn-outline-info-border')
  @HostBinding('style.--wvr-btn-outline-info-active-border')
  @HostBinding('style.--wvr-btn-outline-info-hover-border')
  @HostBinding('style.--wvr-btn-light-border')
  @HostBinding('style.--wvr-btn-light-active-border')
  @HostBinding('style.--wvr-btn-light-hover-border')
  @HostBinding('style.--wvr-btn-outline-light-border')
  @HostBinding('style.--wvr-btn-outline-light-active-border')
  @HostBinding('style.--wvr-btn-outline-light-hover-border')
  @HostBinding('style.--wvr-btn-dark-border')
  @HostBinding('style.--wvr-btn-dark-active-border')
  @HostBinding('style.--wvr-btn-dark-hover-border')
  @HostBinding('style.--wvr-btn-outline-dark-border')
  @HostBinding('style.--wvr-btn-outline-dark-active-border')
  @HostBinding('style.--wvr-btn-outline-dark-hover-border')
  @HostBinding('style.--wvr-btn-link-border')
  @HostBinding('style.--wvr-btn-link-hover-border')
  @Input() borderColor = 'var(--wvr-btn-primary-border)';

  /** Allows for the override of color */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvr-btn-primary-color')
  @HostBinding('style.--wvr-btn-primary-active-color')
  @HostBinding('style.--wvr-btn-primary-hover-color')
  @HostBinding('style.--wvr-btn-outline-primary-color')
  @HostBinding('style.--wvr-btn-outline-primary-active-color')
  @HostBinding('style.--wvr-btn-outline-primary-hover-color')
  @HostBinding('style.--wvr-btn-secondary-color')
  @HostBinding('style.--wvr-btn-secondary-active-color')
  @HostBinding('style.--wvr-btn-secondary-hover-color')
  @HostBinding('style.--wvr-btn-outline-secondary-color')
  @HostBinding('style.--wvr-btn-outline-secondary-active-color')
  @HostBinding('style.--wvr-btn-outline-secondary-hover-color')
  @HostBinding('style.--wvr-btn-success-color')
  @HostBinding('style.--wvr-btn-success-active-color')
  @HostBinding('style.--wvr-btn-success-hover-color')
  @HostBinding('style.--wvr-btn-outline-success-color')
  @HostBinding('style.--wvr-btn-outline-success-active-color')
  @HostBinding('style.--wvr-btn-outline-success-hover-color')
  @HostBinding('style.--wvr-btn-danger-color')
  @HostBinding('style.--wvr-btn-danger-active-color')
  @HostBinding('style.--wvr-btn-danger-hover-color')
  @HostBinding('style.--wvr-btn-outline-danger-color')
  @HostBinding('style.--wvr-btn-outline-danger-active-color')
  @HostBinding('style.--wvr-btn-outline-danger-hover-color')
  @HostBinding('style.--wvr-btn-warning-color')
  @HostBinding('style.--wvr-btn-warning-active-color')
  @HostBinding('style.--wvr-btn-warning-hover-color')
  @HostBinding('style.--wvr-btn-outline-warning-color')
  @HostBinding('style.--wvr-btn-outline-warning-active-color')
  @HostBinding('style.--wvr-btn-outline-warning-hover-color')
  @HostBinding('style.--wvr-btn-info-color')
  @HostBinding('style.--wvr-btn-info-active-color')
  @HostBinding('style.--wvr-btn-info-hover-color')
  @HostBinding('style.--wvr-btn-outline-info-color')
  @HostBinding('style.--wvr-btn-outline-info-active-color')
  @HostBinding('style.--wvr-btn-outline-info-hover-color')
  @HostBinding('style.--wvr-btn-light-color')
  @HostBinding('style.--wvr-btn-light-active-color')
  @HostBinding('style.--wvr-btn-light-hover-color')
  @HostBinding('style.--wvr-btn-outline-light-color')
  @HostBinding('style.--wvr-btn-outline-light-active-color')
  @HostBinding('style.--wvr-btn-outline-light-hover-color')
  @HostBinding('style.--wvr-btn-dark-color')
  @HostBinding('style.--wvr-btn-dark-active-color')
  @HostBinding('style.--wvr-btn-dark-hover-color')
  @HostBinding('style.--wvr-btn-outline-dark-color')
  @HostBinding('style.--wvr-btn-outline-dark-active-color')
  @HostBinding('style.--wvr-btn-outline-dark-hover-color')
  @HostBinding('style.--wvr-btn-link-color')
  @HostBinding('style.--wvr-btn-link-hover-color')
  @Input() color = 'var(--wvr-btn-primary-color)';

  /**
   * The weaver footer component constructor
   * @param elementRef: ElementRef - a reference to the button element.
   * @param cdRef: ChangeDetectorRef - utilized for change detection.
   */
  constructor(private readonly cdRef: ChangeDetectorRef, private readonly elementRef: ElementRef) {
    super();
  }

}