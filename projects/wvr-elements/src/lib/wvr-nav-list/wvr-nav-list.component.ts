import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { Alignment } from '../shared/alignment.enum';
import { WvrBaseComponent } from '../shared/wvr-base.component';

/**
 * The WvrNavList Component presents a navigation list.
 * Elements within this list must be wvre-nav-li elements and can be either links of action elements.
 */
@Component({
  selector: 'wvr-nav-list-component',
  templateUrl: './wvr-nav-list.component.html',
  styleUrls: ['./wvr-nav-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WvrNavListComponent extends WvrBaseComponent {

  /** The aligned property describing the positioning of the list elements. */
  @Input() aligned = Alignment.LEFT;

  /** Toggles the display of the list horizontally or vertically. */
  @Input() vertical: 'true' | 'false' = 'false';

  constructor(injector: Injector) {
    super(injector);
  }

}
