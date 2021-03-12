import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Injector, Input, Output } from '@angular/core';
import { ThemeVariantName } from '../shared/theme';
import { WvrBaseComponent } from '../shared/wvr-base.component';
import * as JSON5 from 'json5';
import { actions } from '../core/actions';

@Component({
  selector: 'wvr-button-component',
  templateUrl: './wvr-button.component.html',
  styleUrls: ['./wvr-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WvrButtonComponent extends WvrBaseComponent {

  /** Used to define the class type for button component.  */
  @Input() themeVariant: ThemeVariantName = 'primary';

  /** Used to define the size for button component.  */
  @Input() btnSize: 'large' | 'small' | 'block';

  /** Used to define the type of a button.  */
  @Input() btnType: 'button' | 'checkbox' | 'radio' | 'reset' | 'submit' | 'link' = 'button';

  /** Allows for the button component to be an anchor tag component if href property present. */
  @Input() href: string;

  /** Allows for the override of background */
  @Input() set background(value: string) {
    this.applyThemeOverride(`--${this.themeVariant}-button-bg`, value);
  }

  /** Allows for the override of active background */
  @Input() set backgroundActive(value: string) {
    this.applyThemeOverride(`--${this.themeVariant}-button-active-bg`, value);
  }

  /** Allows for the override of hover background */
  @Input() set backgroundHover(value: string) {
    this.applyThemeOverride(`--${this.themeVariant}-button-hover-bg`, value);
  }

  /** Allows for the override of border */
  @Input() set borderColor(value: string) {
    this.applyThemeOverride(`--${this.themeVariant}-button-border`, value);
  }

  /** Allows for the override of active border */
  @Input() set borderActive(value: string) {
    this.applyThemeOverride(`--${this.themeVariant}-button-active-border`, value);
  }

  /** Allows for the override of hover border */
  @Input() set borderHover(value: string) {
    this.applyThemeOverride(`--${this.themeVariant}-button-hover-border`, value);
  }

  /** Allows for the override of button border in focus state */
  @Input() set borderFocus(value: string) {
    this.applyThemeOverride(`--${this.themeVariant}-button-focus-border`, value);
  }

  /** Allows for override of box-shadow propery when the button is in focus state */
  @Input() set boxShadowFocus(value: string) {
    this.applyThemeOverride(`--${this.themeVariant}-button-focus-box-shadow`, value);
  }

  /** Allows for the override of color */
  @Input() set color(value: string) {
    this.applyThemeOverride(`--${this.themeVariant}-button-color`, value);
  }

  /** Allows for the override of active color */
  @Input() set colorActive(value: string) {
    this.applyThemeOverride(`--${this.themeVariant}-button-active-color`, value);
  }

  /** Allows for the override of hover color */
  @Input() set colorHover(value: string) {
    this.applyThemeOverride(`--${this.themeVariant}-button-hover-color`, value);
  }

  /** Allows for the override of button border radius */
  @HostBinding('style.--wvr-btn-border-radius') @Input() borderRadius;

  /** Allows for the override of button cursor property */
  @HostBinding('style.--wvr-btn-cursor') @Input() cursor;

  /** Allows for the override of button font family property */
  @HostBinding('style.--wvr-btn-font-family-sans-serif') @Input() fontFamily;

  /** Allows for the override of button font size property */
  @HostBinding('style.--wvr-btn-font-size') @Input() fontSize;

  /** Allows for the override of button font weight property */
  @HostBinding('style.--wvr-btn-font-weight') @Input() fontWeight;

  /** Allows for the override of button hover line height property */
  @HostBinding('style.--wvr-btn-line-height') @Input() lineHeight;

  /** Allows for the override of button padding property */
  @HostBinding('style.--wvr-btn-padding') @Input() padding;

  /** Allows for the override of button text align property */
  @HostBinding('style.--wvr-btn-text-align') @Input() textAlign;

  /** Allows for the override of button vertical align property */
  @HostBinding('style.--wvr-btn-vertical-align') @Input() verticalAlign;

  @Input() actionType: string;

  @Input() actionName: string;

  @Input() actionProps: string;

  @Input() btnTxt: string;

  @HostListener('click', ['$event']) click($event: MouseEvent): void {
    if (this.actionType && this.actionName) {
      this.store.dispatch(actions[this.actionType][this.actionName](
        JSON5.parse(this.actionProps)
      ));
    }
  }

  variantTypes = ['button'];

  constructor(injector: Injector) {
    super(injector);
  }

}
