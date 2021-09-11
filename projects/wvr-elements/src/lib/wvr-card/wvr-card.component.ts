import { ChangeDetectionStrategy, Component, HostBinding, Injector, Input } from '@angular/core';
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
export class WvrCardComponent extends WvrBaseComponent {

  /** Allows for the override of the default 'wvre' sufix for psudo components. */
  @Input() selectorPrefix = 'wvre';

  /** Toggles the centering of header and footer texts. */
  @Input() textCenter = false;

  /** Used to describe the type of card. */
  @Input() themeVariant: ThemeVariantName;

  /** Used to describe the format of card. */
  @Input() panelFormat: 'solid' | 'outlined' | 'mixed';

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
