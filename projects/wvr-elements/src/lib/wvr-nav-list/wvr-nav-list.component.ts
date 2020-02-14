import { Component, Input } from '@angular/core';
import { Alignment } from '../shared/alignment.enum';
/**
 * The WvrNavList Component contains the aligned and vertical properties that describe the positioning of the ul list.
 */
@Component({
  selector: 'wvr-nav-list-element',
  templateUrl: './wvr-nav-list.component.html',
  styleUrls: ['./wvr-nav-list.component.scss']
})
export class WvrNavListComponent {

  /** The aligned property describing the positioning of the list elements. */
  @Input() aligned = Alignment.LEFT;

  /** This boolean vertical property describing if the list can be displayed horizontally or vertically. */
  @Input() vertical: 'true' | 'false' = 'false';

}
