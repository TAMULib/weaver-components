import { Component, HostBinding, Injector, Input } from '@angular/core';
import { WvrBaseComponent } from '../shared/wvr-base.component';

/**
 * Provides a simple component to prove the basic functionality of the Weaver Components.
 */
@Component({
  selector: 'wvr-it-works-component',
  templateUrl: './wvr-it-works.component.html',
  styleUrls: ['./wvr-it-works.component.scss']
})
export class WvrItWorksComponent extends WvrBaseComponent {

  /** The text value to be displayed in the title. */
  title = 'it-works-component';

  /** The text value to be displayed in the title. */
  @Input() text = 'Weaver Components Work';

  /** Allows for the override of the --wvr-primary css variable. */
  @HostBinding('style.--wvr-primary') @Input() primary;

  constructor(injector: Injector) {
    super(injector);
  }

}
