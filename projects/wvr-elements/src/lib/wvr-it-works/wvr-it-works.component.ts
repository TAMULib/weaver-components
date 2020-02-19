import { Component, HostBinding, Input } from '@angular/core';

/**
 * Provides a simple component to prove the basic functionality of the Weaver Components.
 */
@Component({
  selector: 'wvr-it-works-element',
  templateUrl: './wvr-it-works.component.html',
  styleUrls: ['./wvr-it-works.component.scss']
})
export class WvrItWorksComponent {

  /** The text value to be displayed in the title. */
  title = 'it-works-component';

  /** The text value to be displayed in the title. */
  @Input() text = 'Weaver Components Work';

  /** Allows for the override of the --wvr-primary css variable. */
  @HostBinding('style.--wvr-primary') @Input() primary;

}
