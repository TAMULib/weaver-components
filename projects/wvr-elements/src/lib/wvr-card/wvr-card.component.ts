import { ChangeDetectionStrategy, Component, HostBinding, Injector, Input, OnInit } from '@angular/core';
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
  collapsed: boolean;

  /** Update the boolean when the element attribute changes. */
  @HostBinding('attr.collapsed') get getCollapsed(): string {
    return this.collapsed ? 'true' : 'false';
  }

  /** Update the element attribute when the boolean changes */
  @Input('collapsed') set setCollapsed(value: string) {
    this.collapsed = value === 'true';
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
    this.collapsed = !!this.startCollapsed;
  }

  /**
   * Toggle the collapsible state when clicked, if allowed.
   */
  toggleCollapsibleClick(): void {
    if (this.collapseMethod === 'click') {
      this.collapsed = !this.collapsed;
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
