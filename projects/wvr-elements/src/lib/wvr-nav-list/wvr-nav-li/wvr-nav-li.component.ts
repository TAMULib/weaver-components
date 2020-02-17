import { Component, HostBinding, Input } from '@angular/core';

/**
 * The WvrNavLi Component is the list element to be used with the wvr-nav-list element.
 */
@Component({
  selector: 'wvr-nav-li-element',
  templateUrl: './wvr-nav-li.component.html',
  styleUrls: ['./wvr-nav-li.component.scss']
})
export class WvrNavLiComponent {

  /** A resolvable URI to to which this li will link, when provided. If no link is provided, the list element will not display as a link. */
  @Input() href: string;

  /** Allows for the override of the --wvr-blue css variable. */
  @HostBinding('style.--wvr-blue') @Input() blue;

  /** Allows for the override of the --wvr-primary css variable. */
  @HostBinding('style.--wvr-primary') @Input() primary;

  /** Allows for the override of the --wvr-dark css variable. */
  @HostBinding('style.--wvr-dark') @Input() dark;

}
