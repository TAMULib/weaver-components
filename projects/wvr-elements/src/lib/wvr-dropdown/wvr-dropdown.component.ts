import { ChangeDetectorRef, Component, ElementRef, HostBinding, HostListener, Input, ViewChild } from '@angular/core';
import { NgbDropdown, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { WvrAbstractBaseComponent } from '../shared/wvr-abstract-base.component';

@Component({
  selector: 'wvr-dropdown-element',
  templateUrl: './wvr-dropdown.component.html',
  styleUrls: ['./wvr-dropdown.component.scss']
})
export class WvrDropdownComponent extends WvrAbstractBaseComponent {

  /** Sets asside a reference to the NgbDropdown element. */
  @ViewChild(NgbDropdown) private dropdown: NgbDropdown;

  /** Allows for the visual customization of the dropdown menu activation button.  */
  @Input() btnType: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link' | 'plain' = 'plain';

  /** Configures the event type which will activate the dropdown menu. */
  @Input() toggleOn: 'click' | 'mouseover' = 'click';

  /** Binds the value of the animationspeed in seconds to the css variable `--wvr-dropdown-menu-animation-speed` */
  @HostBinding('style.--wvr-dropdown-menu-animation-speed') private _animationSpeedSeconds;

  /** A private reference to the animation speen in miliseconds for internal use */
  private _animationSpeedMili = 250;

  /** A setter which sets the speed to both `_animationSpeedMili` in miliseconds and `_animationSpeedSeconds` in seconds. */
  @Input() set menuAnimationSpeed(speed: number) {
    this._animationSpeedMili = speed;
    this._animationSpeedSeconds = `${speed / 1000}s`;
  }

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
   * This css variable is applied by both the `[wvr-dropdown-menu-item]` and the `wvr-dropdown-menu-item`
   * css rules to each item passed to the the dropdown menu.
   */
  @HostBinding('style.--wvr-dropdown-menu-item-margin') @Input() menuItemMargin;

  /**
   * A public access reference to the open/closed state of the dropdown menu. Used for
   * animations;
   */
  open = false;

  constructor(private cdRef: ChangeDetectorRef, private config: NgbDropdownConfig, private eRef: ElementRef) {
    super();
    config.autoClose = false;
  }

  /** A utility method for manually detecting state changes */
  detectChanges(): void {
    this.cdRef.detectChanges();
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
    if (this.toggleOn === 'mouseover') {
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
   * And the click occured off of the wvr-dropdown component.
   */
  @HostListener('document:click', ['$event']) clickout($event): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
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

  /** A methos for handeling the opening of the dropdown, and updating state. */
  private openDropdown(): void {
    this.open = true;
    this.cdRef.detectChanges();
    this.dropdown.open();
  }

  /** A methos for handeling the closing of the dropdown, and updating state. */
  private closeDropdown(): void {
    this.open = false;
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.dropdown.close();
    }, this._animationSpeedMili);
  }

}
