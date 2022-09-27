import { ChangeDetectionStrategy, Component, HostBinding, Injector, Input } from '@angular/core';
import { projectContent } from '../shared/utility/projection.utility';
import { WvrBaseComponent } from '../shared/wvr-base.component';

/**
 * A fullwidth footer component which attaches to the bottom of the document body.
 */
@Component({
  selector: 'wvr-footer-component',
  templateUrl: './wvr-footer.component.html',
  styleUrls: ['./wvr-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WvrFooterComponent extends WvrBaseComponent {

  @HostBinding('style.--footer-color') get cardBodyColor(): string {
    return this.themeVariant ? `var(--${this.themeVariant}-button-color)` : 'var(--light-button-color)';
  }

  /** Allows for the override of the --footer-height css variable. */
  @HostBinding('style.--footer-height') @Input() height;

  /** Allows for the override of the --footer-padding css variable. */
  @HostBinding('style.--footer-padding') @Input() padding;

  variantTypes = ['default'];

  /**
   * The weaver footer component constructor
   */
  constructor(injector: Injector) {
    super(injector);
    this.themeVariant = 'light';
  }

  /** Called after the view has been intialized. Handles the rendering of the projected content. */
  ngAfterViewInit(): void {
    projectContent(this.eRef, 'template[footer-content]', 'div[footer-content]');
  }

}
