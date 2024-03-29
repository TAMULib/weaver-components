import { ChangeDetectionStrategy, Component, HostBinding, Injector, Input } from '@angular/core';
import { ThemeVariantName } from '../shared/theme';
import { WvrBaseComponent } from '../shared/wvr-base.component';

/**
 * Provides a simple component to prove the basic functionality of the Weaver Components.
 */
@Component({
  selector: 'wvr-it-works-component',
  templateUrl: './wvr-it-works.component.html',
  styleUrls: ['./wvr-it-works.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WvrItWorksComponent extends WvrBaseComponent {

  /** Used to define the class type for button component.  */
  @Input() themeVariant: ThemeVariantName = 'primary';

  /** The text value to be displayed in the title. */
  title = 'it-works-component';

  /** The text value to be displayed in the title. */
  @Input() text = 'Weaver Components';

  /** Allows for the override of the --wvr-primary css variable. */
  @HostBinding('style.--wvr-primary') @Input() primary;

  username = '';

  password = '';

  constructor(injector: Injector) {
    super(injector);
  }

}
