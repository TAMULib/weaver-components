import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Injector, Input, OnInit } from '@angular/core';
import { ThemeVariantName } from '../shared/theme';
import { WvrBaseComponent } from '../shared/wvr-base.component';

/**
 * A component wrapper for the bootstrap card element.
 */
@Component({
  selector: 'wvr-card-component',
  templateUrl: './wvr-card.component.html',
  styleUrls: ['./wvr-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WvrCardComponent extends WvrBaseComponent implements OnInit {

  /** Allows for the override of the default 'wvre' sufix for psudo components. */
  @Input() selectorPrefix = 'wvre';

  /** Toggles the centering of header and footer texts. */
  @Input() textCenter = false;

  /** Used to describe the type of card. */
  @Input() themeVariant: ThemeVariantName;

  /** Used to describe the format of card. */
  @Input() panelFormat: 'solid' | 'outlined' | 'mixed';

  /** Designate how to expand/collapse. */
  @Input() collapseMethod: 'click' | 'none';

  /** Designate the initial expanded/collapsed state. */
  @Input() startCollapsed: boolean;

  /** The collapsed/uncollapsed state. */
  @HostBinding('attr.collapsed') _collapsed: 'true' | 'false';

  /** Update the element attribute when the boolean changes */
  @Input() set collapsed(value: 'true' | 'false') {
    this._collapsed = value;
  }

  @HostBinding('style.--card-header-color') get cardHeaderColor(): string {
    return this.panelFormat === 'outlined' ? 'var(--light-default-color)' : `var(--${this.themeVariant}-default-color)`;
  }

  @HostBinding('style.--card-body-color') get cardBodyColor(): string {
    return this.panelFormat === 'solid' ? `var(--${this.themeVariant}-default-color)` : 'var(--light-default-color)';
  }

  /**
   * The weaver card component constructor
   */
  constructor(injector: Injector) {
    super(injector);
    this.themeVariant = 'primary';
    this.collapseMethod = 'none';
  }

  /**
   * Initialize properties dependent on @Input.
   */
  ngOnInit(): void {
    super.ngOnInit();
    this._collapsed = !!this.startCollapsed ? 'true' : 'false';
  }

  /**
   * A handler method for when the enter key is down.
   */
  @HostListener('keydown.enter', ['$event']) enterKeyDown($event: Event): void {
    $event.stopPropagation();
    $event.preventDefault();

    this.toggleCollapsibleClick();
  }

  /**
   * A handler method for when the space key is down.
   */
  @HostListener('keydown.space', ['$event']) spaceKeyDown($event: Event): void {
    $event.stopPropagation();
    $event.preventDefault();

    this.toggleCollapsibleClick();
  }

  /**
   * Toggle the collapsible state when clicked, if allowed.
   */
  toggleCollapsibleClick(): void {
    if (this.collapseMethod === 'click') {
      this._collapsed = this._collapsed === 'true' ? 'false' : 'true';
    }
  }

  get additionalCardClasses(): string {
    let additionalClasses = '';
    additionalClasses += ((!this.panelFormat || this.panelFormat === 'mixed') || this.panelFormat === 'outlined') ?
      ` border-${this.themeVariant} ` : '';

    additionalClasses += this.panelFormat === 'solid' ? ` bg-${this.themeVariant}` : '';

    return additionalClasses;
  }

  get additionalHeaderClasses(): string {
    let additionalClasses = '';
    additionalClasses += ((!this.panelFormat || this.panelFormat === 'mixed') || this.panelFormat === 'outlined') ?
      ` border-${this.themeVariant} ` : '';

    additionalClasses += (this.panelFormat === 'solid' || this.panelFormat === 'mixed') ? ` bg-${this.themeVariant}` : '';

    return additionalClasses;
  }

}
