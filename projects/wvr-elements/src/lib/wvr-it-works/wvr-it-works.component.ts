import { Component, HostBinding, Input } from '@angular/core';
/**
 * This is the it-works component. This contains a text property.
 */
@Component({
  selector: 'wvr-it-works-element',
  templateUrl: './wvr-it-works.component.html',
  styleUrls: ['./wvr-it-works.component.scss']
})
export class WvrItWorksComponent {

  /** The text value to be displayed in the title property. */
  title = 'it-works-component';

  /** The text value to be displayed in the title. */
  @Input() text = 'Weaver Components Work';

  /** This field has hostbinding property bound to weaver --wvr-prinary styling variable  - equivalent of css color of primary shade */
  @HostBinding('style.--wvr-primary') @Input() primary;

}
