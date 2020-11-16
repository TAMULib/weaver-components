import { Component, HostBinding, HostListener, Injector, Input, ViewChild } from '@angular/core';
import { NgbDropdown, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ThemeVariantName } from '../shared/theme';
import { WvrBaseComponent } from '../shared/wvr-base.component';

/**
 * A dropdown with button and contextualized styling.
 */
@Component({
  selector: 'wvr-dropdown-component',
  templateUrl: './wvr-dropdown.component.html',
  styleUrls: ['./wvr-dropdown.component.scss']
})
export class WvrDropdownComponent extends WvrBaseComponent {

  /** Sets asside a reference to the NgbDropdown element. */
  @ViewChild(NgbDropdown) dropdown: NgbDropdown;

  /** Binds the value of the animationspeed in seconds to the css variable `--wvr-dropdown-menu-animation-speed` */
  @HostBinding('style.--wvr-dropdown-menu-animation-speed') private _animationSpeedSeconds;

  /** A private reference to the animation speen in miliseconds for internal use */
  private _animationSpeedMili = 250;

  /** A setter which sets the speed to both `_animationSpeedMili` in miliseconds and `_animationSpeedSeconds` in seconds. */
  @Input() set menuAnimationSpeed(speed: number) {
    this._animationSpeedMili = speed;
    this._animationSpeedSeconds = `${speed / 1000}s`;
  }

  /** Allows for override of button background value. */
  @Input() btnBackground: string;

  /** Allows for override of button background value in active state. */
  @Input() btnBackgroundActive: string;

  /** Allows for override of button background value in hover state. */
  @Input() btnBackgroundHover: string;

  /** Allows for override of button border value in active state. */
  @Input() btnBorderActive: string;

  /** Allows for override of button border color. */
  @Input() btnBorderColor: string;

  /** Allows for override of button border value in focus state. */
  @Input() btnBorderFocus: string;

  /** Allows for override of button border value in hover state. */
  @Input() btnBorderHover: string;

  /** Allows for override the button color. */
  @Input() btnColor: string;

  /** Allows for override the button color in active state. */
  @Input() btnColorActive: string;

  /** Allows for override the button color in hover state. */
  @Input() btnColorHover: string;

  /** Allows for override the button radius. */
  @Input() btnBorderRadius: string;

  /** Allows for override the button box shadow in focus state. */
  @Input() btnBoxShadowFocus: string;

  /** Allows for override the button cursor. */
  @Input() btnCursor: string;

  /** Allows for override the button font family. */
  @Input() btnFontFamily: string;

  /** Allows for override the button font size. */
  @Input() btnFontSize: string;

  /** Allows for override the button font weight. */
  @Input() btnFontWeight: string;

  /** Allows for override the button line height. */
  @Input() btnLineHeight: string;

  /** Allows for override the button line height. */
  @Input() btnPadding: string;

  /** Allows for override the button line height. */
  @Input() btnTextAlign: string;

  /** Allows for override the button line height. */
  @Input() btnVerticalAlign: string;

  /** Allows for override of button href value. */
  @Input() btnHref = '';

  /** Allows for override of button size.  */
  @Input() btnSize = '';

  /** Allows for the visual customization of the dropdown menu activation button.  */
  @Input() themeVariant: ThemeVariantName = 'secondary';

  /** Binds the input from `menuBackground` to the css variable `--wvr-dropdown-menu-background` */
  @HostBinding('style.--wvr-dropdown-menu-background') @Input() menuBackground;

  /** Binds the input from `menu-border` to the css variable `--wvr-dropdown-menu-border` */
  @HostBinding('style.--wvr-dropdown-menu-border') @Input() menuBorder;

  /** Binds the input from `menu-border-radius` to the css variable `--wvr-dropdown-menu-border-radius` */
  @HostBinding('style.--wvr-dropdown-menu-border-radius') @Input() menuBorderRadius;

  /** Binds the input from `menu-border-display` to the css variable `--wvr-dropdown-menu-display` */
  @HostBinding('style.--wvr-dropdown-menu-display') @Input() menuBorderDisplay;

  /** Binds the input from `menu-border-flexDirection` to the css variable `--wvr-dropdown-menu-flex-direction` */
  @HostBinding('style.--wvr-dropdown-menu-flex-direction') @Input() menuFlexDirection;

  /** Binds the input from `menu-padding` to the css variable `--wvr-dropdown-menu-padding` */
  @HostBinding('style.--wvr-dropdown-menu-padding') @Input() menuPadding;

  /** Binds the input from `menu-width` to the css variable `--wvr-dropdown-menu-width` */
  @HostBinding('style.--wvr-dropdown-menu-width') @Input() menuWidth;

  /**
   * Binds the input from `menu-x-offset` to the css variable `--wvr-dropdown-x-offset`.
   * This css variable is applied by `left` css rule to the menu.
   */
  @HostBinding('style.--wvr-dropdown-menu-x-offset') @Input() menuXOffset;

  /**
   * Binds the input from `menu-y-offset` to the css variable `--wvr-dropdown-y-offset`.
   * This css variable is applied by `margin-top` css rule to the menu.
   */
  @HostBinding('style.--wvr-dropdown-menu-y-offset') @Input() menuYOffset;

  /**
   * Binds the input from `item-margin` to the css variable `--wvr-dropdown-item-margin`.
   * This css variable is applied by both the `[wvre-dropdown-menu-item]` and the `wvre-dropdown-menu-item`
   * css rules to each item passed to the the dropdown menu.
   */
  @HostBinding('style.--wvr-dropdown-menu-item-margin') @Input() menuItemMargin;

  /** Configures the event type which will activate the dropdown menu. */
  @Input() toggleOn: 'click' | 'mouseover' = 'click';

  /** Allows for override the button text decoration. */
  private _btnTextDecoration: string;

  @Input() set btnTextDecoration(value: string) {
    this._btnTextDecoration = value;
  }

  get btnTextDecoration(): string {
    return this._btnTextDecoration ?
    this._btnTextDecoration :
    `var(--wvr-btn-${this.themeVariant}-text-decoration-default)`;
  }

  /** Allows for override the button text decoration. */
  private _btnTextDecorationActive: string;

  @Input() set btnTextDecorationActive(value: string) {
    this._btnTextDecorationActive = value;
  }

  get btnTextDecorationActive(): string {
    return this._btnTextDecorationActive ?
    this._btnTextDecorationActive :
    `var(--wvr-btn-${this.themeVariant}-active-text-decoration-default)`;
  }

  // text-decoration-focus
  private _btnTextDecorationFocus: string;

  @Input() set btnTextDecorationFocus(value: string) {
    this._btnTextDecorationFocus = value;
  }

  get btnTextDecorationFocus(): string {
    return this._btnTextDecorationFocus ?
      this._btnTextDecorationFocus :
      `var(--wvr-btn-${this.themeVariant}-focus-text-decoration-default)`;
  }

  private _btnTextDecorationHover: string;

  @Input() set btnTextDecorationHover(value: string) {
    this._btnTextDecorationHover = value;
  }

  get btnTextDecorationHover(): string {
    return this._btnTextDecorationHover ?
    this._btnTextDecorationHover :
    `var(--wvr-btn-${this.themeVariant}-hover-text-decoration-default)`;
  }

  @Input() placement = 'top-right';

  /**
   * A public access reference to the open/closed state of the dropdown menu. Used for
   * animations;
   */
  open = false;

  /**
   * Indicates that the dropdown is in the process of closing.
   */
  // tslint:disable-next-line: prefer-readonly
  private closing = false;

  @Input() dropdownMenuDisplay = 'dynamic';

  variantTypes = ['dropdown'];

  constructor(injector: Injector, config: NgbDropdownConfig) {
    super(injector);
    config.autoClose = false;
  }

  /** An access method to expose the `isOpen` utility method from `NgbDropdown` */
  isOpen(): boolean {
    return this.dropdown ? this.dropdown.isOpen() : false;
  }

  /**
   * A handler method for the `mouseenter` event.
   * Opens the dropdown if `toggleOn` is set to `mouseover`.
   */
  @HostListener('mouseenter', ['$event']) hoverOpen($event: Event): void {
    if (this.toggleOn === 'mouseover' && !this.closing) {
      this.openDropdown();
    }
  }

  /**
   * A handler method for the `mouseleave` event.
   * Closes the dropdown if `toggleOn` is set to `mouseover`.
   */
  @HostListener('mouseleave', ['$event']) hoverClose($event: Event): void {
    if (this.toggleOn === 'mouseover') {
      this.closeDropdown();
    }
  }

  /**
   * A handler method for the `document:click` event.
   * Closes the dropdown if `toggleOn` is set to `click`
   * And the click occured off of the wvre-dropdown component.
   */
  @HostListener('document:click', ['$event']) clickout($event): void {
    const path = $event.composedPath();
    if (!this._eRef.nativeElement.contains(path[0])) {
     this.closeDropdown();
    }
  }

  /**
   * A handler method for a click event fired from the template.
   * Toggles the open state of the dropdown.
   */
  clickOpen($event: Event): void {
    if (this.toggleOn === 'click') {
      this.isOpen() ? this.closeDropdown() : this.openDropdown();
    }
  }

  /** Handles the opening of the dropdown, and updating state. */
  private openDropdown(): void {
    if (!this.isMobileLayout) {
      // document.querySelector('body')
      // .click();
      // setTimeout(() => {
      //   this.open = true;
      //   this.dropdown.open();
      // }, this._animationSpeedMili);

      this.open = true;
      this.dropdown.open();
    }
  }

  /** Handles the closing of the dropdown, and updating state. */
  private closeDropdown(): void {
    // this.closing = true;
    this.open = false;
    this.dropdown.close();
    // setTimeout(() => {
    //   this.dropdown.close();
    //   this.closing = false;
    // }, this._animationSpeedMili);
  }

  // tslint:disable-next-line:max-file-line-count
}
