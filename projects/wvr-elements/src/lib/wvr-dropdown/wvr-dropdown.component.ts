import { AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, HostListener, Injector, Input, ViewChild } from '@angular/core';
import { NgbDropdown, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ThemeVariantName } from '../shared/theme';
import { projectContent } from '../shared/utility/projection.utility';
import { WvrBaseComponent } from '../shared/wvr-base.component';

/**
 * A dropdown with button and contextualized styling.
 */
@Component({
  selector: 'wvr-dropdown-component',
  templateUrl: './wvr-dropdown.component.html',
  styleUrls: ['./wvr-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WvrDropdownComponent extends WvrBaseComponent implements AfterViewInit {

  /** Sets asside a reference to the NgbDropdown element. */
  @ViewChild(NgbDropdown) dropdown: NgbDropdown;

  /** Binds the value of the animationspeed in seconds to the css variable `--wvr-dropdown-menu-animation-speed` */
  @HostBinding('style.--wvr-dropdown-menu-animation-speed') animationSpeedSeconds;

  /**
   * This establishes a delay in milliseconds before the dropdown is displayed.
   *
   * Do not set this too low as there may be problems with the focusIn and click events (click event may trigger or be triggered by a focusIn).
   */
  @Input() openDelay = 150;

  private _openDelayTimer: NodeJS.Timeout;

  /** A setter which sets the speed to `_animationSpeedSeconds` in seconds. */
  @Input() set menuAnimationSpeed(speed: number) {
    this.animationSpeedSeconds = `${speed / 1000}s`;
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

  /** Allows for override the button type. */
  @Input() btnType: string;

  /** Allows for override the button line height. */
  @Input() btnVerticalAlign: string;

  /** Allows for override of button href value. */
  @Input() btnHref = '';

  /** Allows for override of button size.  */
  @Input() btnSize = '';

  /** Allows for the visual customization of the dropdown menu activation button.  */
  @Input() themeVariant: ThemeVariantName = 'secondary';

  /** Binds the input from `menuBackground` to the css variable `--wvr-dropdown-menu-background` */
  @Input() menuThemeVariant: ThemeVariantName;

  /** Allows for override of role value (such as setting role="menu"). */
  @Input() role: string;

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
   * A state used to represent that focus is on or within the element.
   * Used for button navigation decisions.
   */
  focus = false;

  /**
   * Designate that a close has been requested.
   *
   * Used to inform that the popup should be closed while the popup is still in the process of opening up.
   */
  private requestClose = false;

  @Input() dropdownMenuDisplay = 'dynamic';

  constructor(injector: Injector, config: NgbDropdownConfig) {
    super(injector);
    config.autoClose = false;
  }

  /** Called after the view has been intialized. Handles the rendering of the projected content. */
  ngAfterViewInit(): void {
    projectContent(this.eRef, 'template[dropdown-button]', 'span[button-content]');
    projectContent(this.eRef, 'template[dropdown-menu]', 'div[dropdown-menu]');
  }

  /** An access method to expose the `isOpen` utility method from `NgbDropdown` */
  isOpen(): boolean {
    return this.dropdown ? this.dropdown.isOpen() : false;
  }

  /**
   * A handler method for the `focus` event.
   */
  @HostListener('focusin', ['$event']) focusIn($event: Event): void {
    if (this.eRef.nativeElement.contains($event.target)) {
      if (!this.focus) {
        $event.stopPropagation();
        $event.preventDefault();

        this.giveFocus();
      }
    } else {
      this.takeFocus();
    }
  }

  /**
   * A handler method for the `focus` event.
   *
   * The 'relatedTarget' may be null if the focus lost is due to the focus leaving the web browser itself rather than the element within the page.
   * In this case, do not remove focus because the what goes on outside of the page should not affect what goes inside the page.
   */
  @HostListener('focusout', ['$event']) focusOut($event: Event): void {
    if ($event['relatedTarget'] !== null) {
      if (!this.eRef.nativeElement.contains($event['relatedTarget'])) {
        this.takeFocus();
      }
    }
  }

  /**
   * A handler method for the `mouseenter` event.
   *
   * Opens the dropdown if `toggleOn` is set to `mouseover`.
   */
  @HostListener('mouseenter', ['$event']) hoverOpen($event: Event): void {
    if (this.toggleOn === 'mouseover') {
      this.giveFocus();
    }
  }

  /**
   * A handler method for the `mouseleave` event.
   *
   * Closes the dropdown if `toggleOn` is set to `mouseover`.
   */
  @HostListener('mouseleave', ['$event']) hoverClose($event: Event): void {
    if (this.toggleOn === 'mouseover') {
      this.takeFocus();
    }
  }

  /**
   * A handler method for the `document:mousedown` event.
   *
   * Closes the dropdown if `toggleOn` is set to `click`
   * And the click occured off of the wvre-dropdown component.
   *
   * The 'mousedown' is used instead of 'click' to avoid bubbling problems.
   * The 'click' does not happen before 'focusin' and there is a race condition between the two.
   * When 'mousedown' is used, it happens before 'focusin' and the bubbling can be blocked to avoid a race condition.
   */
  @HostListener('document:mousedown', ['$event']) documentClick($event: Event): void {
    if (this.eRef.nativeElement.contains($event.target)) {
      if (this.toggleOn === 'click') {
        $event.stopPropagation();
        $event.preventDefault();

        if (this.isOpen()) {
          this.takeFocus();
        } else {
          this.giveFocus();
        }
      }
    } else {
      this.takeFocus();
    }
  }

  /**
   * A single handler method for when the any key is down while associated with the host element.
   */
  @HostListener('keydown', ['$event']) keyDown($event): void {
    const lowerKey = $event.key.toLowerCase();

    if (lowerKey == "escape") {
      if (this.isOpen()) {
        const list = this.eRef.nativeElement.querySelector('.dropdown-menu > *');

        $event.stopPropagation();
        $event.preventDefault();

        if (!!list && list.contains($event.target)) {
          this.focusToToggle();
        } else {
          this.takeFocus();
        }
      }
    }
    else if (lowerKey == "space") {
      const list = this.eRef.nativeElement.querySelector('.dropdown-menu > *');

      if (!!list && list.contains($event.target)) {
        // @todo
      } else {
        $event.stopPropagation();
        $event.preventDefault();

        if (this.isOpen()) {
          this.takeFocus();
        } else {
          this.giveFocus();
        }
      }
    }
    else if (lowerKey == "arrowup" || lowerKey == "arrowdown") {
      const list = this.eRef.nativeElement.querySelector('.dropdown-menu > *');

      if (!!list) {
        const up = lowerKey == "arrowup";

        $event.stopPropagation();
        $event.preventDefault();

        if (list.contains($event.target)) {
          let focused = list.children.length;

          for (let i = 0; i < list.children.length; i++) {
            if ($event.target == list.children[i]) {
              focused = i;
            }
          }

          this.focusToChild(focused, up, list);
        }
        else if (list.children.length > 0) {
          const focused = up ? list.children.length - 1 : -1;

          this.focusToChild(focused, up, list);
        }
      }
    }
  }

  /** Change focus to the drop down toggle that exists outside of the drop down list. */
  private focusToToggle() {
    const dropdown = this.eRef.nativeElement.querySelector('.dropdown .dropdown-toggle .wvr-button');

    if (!!dropdown) {
      dropdown.focus();
    }
  }

  /** Change focus to a non-disabled child based on the current focused position within the list. */
  private focusToChild(focused: number, up: boolean, list: any): void {
    if (focused == list.children.length || up && focused == 0 || !up && focused == list.children.length) {
      this.focusToToggle();
    } else {
      let i = up ? focused - 1 : focused + 1;

      // Select the first non-disabled child.
      if (up) {
        for (; i >= 0; i--) {
          if (!list.children[i].hasAttribute('disabled')) {
            break;
          }

          // There is no available child to move to, so set out of range.
          if (i == 0) {
            i = list.children.length;
            break;
          }
        }
      } else {
        for (; i < list.children.length; i++) {
          if (!list.children[i].hasAttribute('disabled')) {
            break;
          }
        }
      }

      if (i == list.children.length) {
        this.focusToToggle();
      } else {
        list.children[i].focus();
      }
    }
  }

  /**
   * If focus is not set, then set focus.
   *
   * Does open dropdown, if it is closed and not already in the process of opening.
   */
  private giveFocus(): void {
    if (!this._openDelayTimer && !this.focus) {
      this.focus = true;
      this.requestClose = false;

      this._openDelayTimer = setTimeout(() => {
        if (this.focus) {
          if (!this.requestClose && !this.isMobileLayout) {
            this.open = true;
            this.dropdown.open();
          }

          this._openDelayTimer = undefined;
        }

        this.requestClose = false;
      }, this.openDelay);
    }
  };

  /**
   * If focus is set, then unset focus.
   *
   * Does close dropdown, if it is open.
   */
  private takeFocus(): void {
    if (!!this._openDelayTimer) {
      this.requestClose = true;
    } else if (this.focus) {
      this.focus = false;

      if (this.isOpen()) {
        this.open = false;
        this.dropdown.close();
      }
    }
  };
}
