import { Component, HostBinding, Input } from '@angular/core';
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

  /** Used to define the type of a button.  */
  @Input() wvrBtnType: 'button' | 'checkbox' | 'radio' | 'reset' | 'submit' = 'button';

  /** Allows for the button component to be an anchor tag component if hrefUrl property present. */
  @Input() href: string;

  /** Used internally to set the disabled state of the button component. */
  @Input() isDisabled = true;

  /** Allows for the override of background for the primary button */
  // tslint:disable-next-line: prefer-inline-decorator
  @HostBinding('style.--wvr-btn-primary-background')
  @HostBinding('style.--wvr-btn-secondary-background')
  @HostBinding('style.--wvr-btn-info-background')
  @Input() background;
}
