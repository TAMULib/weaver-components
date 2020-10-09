import { Component, HostBinding, HostListener, Injector, Input, ViewChild } from '@angular/core';
import { NgbDropdown, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { WvrBaseComponent } from '../shared/wvr-base.component';

/**
 * A dropdown with button and contextualized styling.
 */
@Component({
  selector: 'wvr-dropdown-element',
  templateUrl: './wvr-dropdown.component.html',
  styleUrls: ['./wvr-dropdown.component.scss']
})
export class WvrDropdownComponent extends WvrBaseComponent {

  /** Sets asside a reference to the NgbDropdown element. */
  @ViewChild(NgbDropdown) dropdown: NgbDropdown;

  /** Binds the value of the animationspeed in seconds to the css variable `--wvre-dropdown-menu-animation-speed` */
  @HostBinding('style.--wvre-dropdown-menu-animation-speed') private _animationSpeedSeconds;

  /** A private reference to the animation speen in miliseconds for internal use */
  private _animationSpeedMili = 250;

  /** A setter which sets the speed to both `_animationSpeedMili` in miliseconds and `_animationSpeedSeconds` in seconds. */
  @Input() set menuAnimationSpeed(speed: number) {
    this._animationSpeedMili = speed;
    this._animationSpeedSeconds = `${speed / 1000}s`;
  }

  /** Allows for override of button background value. */
  private _btnBackground: string;

  @Input() set btnBackground(value: string) {
    this._btnBackground = value;
  }

  /** An accessor for the assigned background of this dropdowns button. */
  get btnBackground(): string {
    return this._btnBackground ? this._btnBackground : `var(--wvre-btn-${this.btnType}-background-default)`;
  }

  /** Allows for override of button background value in active state. */
  private _btnBackgroundActive: string;

  @Input() set btnBackgroundActive(value: string) {
    this._btnBackgroundActive = value;
  }

  get btnBackgroundActive(): string {
    return this._btnBackgroundActive ? this._btnBackgroundActive : `var(--wvre-btn-${this.btnType}-active-background-default)`;
  }

  /** Allows for override of button background value in hover state. */
  private _btnBackgroundHover: string;

  @Input() set btnBackgroundHover(value: string) {
    this._btnBackgroundHover = value;
  }

  get btnBackgroundHover(): string {
    return this._btnBackgroundHover ? this._btnBackgroundHover : `var(--wvre-btn-${this.btnType}-hover-background-default)`;
  }

  /** Allows for override of button border value in active state. */
  private _btnBorderActive: string;

  @Input() set btnBorderActive(value: string) {
    this._btnBorderActive = value;
  }

  get btnBorderActive(): string {
    return this._btnBorderActive ? this._btnBorderActive : `var(--wvre-btn-${this.btnType}-active-border-default)`;
  }

  /** Allows for override of button border color. */
  private _btnBorderColor: string;

  @Input() set btnBorderColor(value: string) {
    this._btnBorderColor = value;
  }

  get btnBorderColor(): string {
    return this._btnBorderColor ? this._btnBorderColor : `var(--wvre-btn-${this.btnType}-border-default)`;
  }

  /** Allows for override of button border value in focus state. */
  private _btnBorderFocus: string;

  @Input() set btnBorderFocus(value: string) {
    this._btnBorderFocus = value;
  }

  get btnBorderFocus(): string {
    return this._btnBorderFocus ? this._btnBorderFocus : `var(--wvre-btn-${this.btnType}-focus-border-default)`;
  }

  /** Allows for override of button border value in hover state. */
  private _btnBorderHover: string;

  @Input() set btnBorderHover(value: string) {
    this._btnBorderHover = value;
  }

  get btnBorderHover(): string {
    return this._btnBorderHover ? this._btnBorderHover : `var(--wvre-btn-${this.btnType}-hover-border-default)`;
  }

  /** Allows for override the button color. */
  private _btnColor: string;

  @Input() set btnColor(value: string) {
    this._btnColor = value;
  }

  get btnColor(): string {
    return this._btnColor ? this._btnColor : `var(--wvre-btn-${this.btnType}-color-default)`;
  }

  /** Allows for override the button color in active state. */
  private _btnColorActive: string;

  @Input() set btnColorActive(value: string) {
    this._btnColorActive = value;
  }

  get btnColorActive(): string {
    return this._btnColorActive ? this._btnColorActive : `var(--wvre-btn-${this.btnType}-active-color-default)`;
  }

  /** Allows for override the button color in hover state. */
  private _btnColorHover: string;

  @Input() set btnColorHover(value: string) {
    this._btnColorHover = value;
  }

  get btnColorHover(): string {
    return this._btnColorHover ? this._btnColorHover : `var(--wvre-btn-${this.btnType}-hover-color-default)`;
  }

  /** Allows for override the button radius. */
  private _btnBorderRadius: string;

  @Input() set btnBorderRadius(value: string) {
    this._btnBorderRadius = value;
  }

  get btnBorderRadius(): string {
    return this._btnBorderRadius ? this._btnBorderRadius : 'var(--wvre-btn-border-radius)';
  }

  /** Allows for override the button box shadow in focus state. */
  private _btnBoxShadowFocus: string;

  @Input() set btnBoxShadowFocus(value: string) {
    this._btnBoxShadowFocus = value;
  }

  get btnBoxShadowFocus(): string {
    return this._btnBoxShadowFocus ? this._btnBoxShadowFocus : `var(--wvre-btn-${this.btnType}-focus-box-shadow-default)`;
  }

  /** Allows for override the button cursor. */
  private _btnCursor: string;

  @Input() set btnCursor(value: string) {
    this._btnCursor = value;
  }

  get btnCursor(): string {
    return this._btnCursor ? this._btnCursor : 'var(--wvre-btn-cursor-default)';
  }

  /** Allows for override the button font family. */
  private _btnFontFamily: string;

  @Input() set btnFontFamily(value: string) {
    this._btnFontFamily = value;
  }

  get btnFontFamily(): string {
    return this._btnFontFamily ? this._btnFontFamily : 'var(--wvre-btn-font-family-sans-serif-default)';
  }

  /** Allows for override the button font size. */
  private _btnFontSize: string;

  @Input() set btnFontSize(value: string) {
    this._btnFontSize = value;
  }

  get btnFontSize(): string {
    return this._btnFontSize ? this._btnFontSize : 'var(--wvre-btn-font-size-default)';
  }

  /** Allows for override the button font weight. */
  private _btnFontWeight: string;

  @Input() set btnFontWeight(value: string) {
    this._btnFontWeight = value;
  }

  get btnFontWeight(): string {
    return this._btnFontWeight ? this._btnFontWeight : 'var(--wvre-btn-font-weight-default)';
  }

  /** Allows for override the button line height. */
  private _btnLineHeight: string;

  @Input() set btnLineHeight(value: string) {
    this._btnLineHeight = value;
  }

  get btnLineHeight(): string {
    return this._btnLineHeight ? this._btnLineHeight : 'var(--wvre-btn-line-height-default)';
  }

  /** Allows for override the button line height. */
  private _btnPadding: string;

  @Input() set btnPadding(value: string) {
    this._btnPadding = value;
  }

  get btnPadding(): string {
    return this._btnPadding ? this._btnPadding : 'var(--wvre-btn-padding-default)';
  }

  /** Allows for override the button line height. */
  private _btnTextAlign: string;

  @Input() set btnTextAlign(value: string) {
    this._btnTextAlign = value;
  }

  get btnTextAlign(): string {
    return this._btnTextAlign ? this._btnTextAlign : 'var(--wvre-btn-text-align-default)';
  }

  /** Allows for override the button line height. */
  private _btnVerticalAlign: string;

  @Input() set btnVerticalAlign(value: string) {
    this._btnVerticalAlign = value;
  }

  get btnVerticalAlign(): string {
    return this._btnVerticalAlign ? this._btnVerticalAlign : 'var(--wvre-btn-vertical-align-default)';
  }

  /** Allows for override of button href value. */
  @Input() btnHref = '';

  /** Allows for override of button size.  */
  @Input() btnSize = '';

  /** Allows for the visual customization of the dropdown menu activation button.  */
  @Input() btnType: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link' | 'plain' = 'plain';

  /** Binds the input from `menuBackground` to the css variable `--wvre-dropdown-menu-background` */
  @HostBinding('style.--wvre-dropdown-menu-background') @Input() menuBackground;

  /** Binds the input from `menu-border` to the css variable `--wvre-dropdown-menu-border` */
  @HostBinding('style.--wvre-dropdown-menu-border') @Input() menuBorder;

  /** Binds the input from `menu-border-radius` to the css variable `--wvre-dropdown-menu-border-radius` */
  @HostBinding('style.--wvre-dropdown-menu-border-radius') @Input() menuBorderRadius;

  /** Binds the input from `menu-border-display` to the css variable `--wvre-dropdown-menu-display` */
  @HostBinding('style.--wvre-dropdown-menu-display') @Input() menuBorderDisplay;

  /** Binds the input from `menu-border-flexDirection` to the css variable `--wvre-dropdown-menu-flex-direction` */
  @HostBinding('style.--wvre-dropdown-menu-flex-direction') @Input() menuFlexDirection;

  /** Binds the input from `menu-padding` to the css variable `--wvre-dropdown-menu-padding` */
  @HostBinding('style.--wvre-dropdown-menu-padding') @Input() menuPadding;

  /** Binds the input from `menu-width` to the css variable `--wvre-dropdown-menu-width` */
  @HostBinding('style.--wvre-dropdown-menu-width') @Input() menuWidth;

  /**
   * Binds the input from `menu-x-offset` to the css variable `--wvre-dropdown-x-offset`.
   * This css variable is applied by `left` css rule to the menu.
   */
  @HostBinding('style.--wvre-dropdown-menu-x-offset') @Input() menuXOffset;

  /**
   * Binds the input from `menu-y-offset` to the css variable `--wvre-dropdown-y-offset`.
   * This css variable is applied by `margin-top` css rule to the menu.
   */
  @HostBinding('style.--wvre-dropdown-menu-y-offset') @Input() menuYOffset;

  /**
   * Binds the input from `item-margin` to the css variable `--wvre-dropdown-item-margin`.
   * This css variable is applied by both the `[wvre-dropdown-menu-item]` and the `wvre-dropdown-menu-item`
   * css rules to each item passed to the the dropdown menu.
   */
  @HostBinding('style.--wvre-dropdown-menu-item-margin') @Input() menuItemMargin;

  /** Configures the event type which will activate the dropdown menu. */
  @Input() toggleOn: 'click' | 'mouseover' = 'click';

  /** Allows for override the button text decoration. */
  private _btnTextDecoration: string;

  @Input() set btnTextDecoration(value: string) {
    this._btnTextDecoration = value;
  }

  get btnTextDecoration(): string {
    return this._btnTextDecoration ? this._btnTextDecoration : `var(--wvre-btn-${this.btnType}-text-decoration-default)`;
  }

  /** Allows for override the button text decoration. */
  private _btnTextDecorationActive: string;

  @Input() set btnTextDecorationActive(value: string) {
    this._btnTextDecorationActive = value;
  }

  get btnTextDecorationActive(): string {
    return this._btnTextDecorationActive ? this._btnTextDecorationActive : `var(--wvre-btn-${this.btnType}-active-text-decoration-default)`;
  }

  // text-decoration-focus
  private _btnTextDecorationFocus: string;

  @Input() set btnTextDecorationFocus(value: string) {
    this._btnTextDecorationFocus = value;
  }

  get btnTextDecorationFocus(): string {
    return this._btnTextDecorationFocus ? this._btnTextDecorationFocus : `var(--wvre-btn-${this.btnType}-focus-text-decoration-default)`;
  }

  private _btnTextDecorationHover: string;

  @Input() set btnTextDecorationHover(value: string) {
    this._btnTextDecorationHover = value;
  }

  get btnTextDecorationHover(): string {
    return this._btnTextDecorationHover ? this._btnTextDecorationHover : `var(--wvre-btn-${this.btnType}-hover-text-decoration-default)`;
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
  private closing = false;

  @Input() dropdownMenuDisplay = 'dynamic';

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
    if (!this._eRef.nativeElement.contains($event.target)) {
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
      document.querySelector('body')
      .click();
      setTimeout(() => {
        this.open = true;
        this.dropdown.open();
      }, this._animationSpeedMili);
    }
  }

  /** Handles the closing of the dropdown, and updating state. */
  private closeDropdown(): void {
    this.closing = true;
    this.open = false;
    setTimeout(() => {
      this.dropdown.close();
      this.closing = false;
    }, this._animationSpeedMili);
  }

  // tslint:disable-next-line:max-file-line-count
}
