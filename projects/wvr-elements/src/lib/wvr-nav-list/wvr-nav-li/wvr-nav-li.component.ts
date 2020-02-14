import { Component, HostBinding, Input } from '@angular/core';
/**
 * The WvrNavLi Component contains the href property of the list.
 */
@Component({
  selector: 'wvr-nav-li-element',
  templateUrl: './wvr-nav-li.component.html',
  styleUrls: ['./wvr-nav-li.component.scss']
})
export class WvrNavLiComponent {

  /** This property contains the href value of the list element. */
  @Input() href: string;

  /** This field has hostbinding property bound to weaver --wvr-blue styling variable  - equivalent of css color of blue shade */
  @HostBinding('style.--wvr-blue') @Input() blue;

  /** This field has hostbinding property bound to weaver --wvr-prinary styling variable  - equivalent of css color of primary shade */
  @HostBinding('style.--wvr-primary') @Input() primary;

  /** This field has hostbinding property bound to weaver --wvr-dark styling variable  - equivalent of css color of {gray-900} shade */
  @HostBinding('style.--wvr-dark') @Input() dark;

}
