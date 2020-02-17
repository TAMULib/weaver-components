import { Component, Input } from '@angular/core';

/**
 * The Weaver Text Component allows for a node based textual entry. This will support i18n in the future.
 */
@Component({
  selector: 'wvr-text-element',
  templateUrl: './wvr-text.component.html',
  styleUrls: ['./wvr-text.component.scss']
})
export class WvrTextComponent {

  /** The text value to be displayed in the text node. */
  @Input() value: string;

}
