import { AfterContentInit, AfterViewInit, Component, Injector, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Theme } from '../shared/theme.type';
import { WvrBaseComponent } from '../shared/wvr-base.component';
import { WvrListItemComponent } from './wvr-list-item/wvr-list-item.component';

/**
 * A stylable list.
 */
@Component({
  selector: 'wvr-list-element',
  templateUrl: './wvr-list.component.html',
  styleUrls: ['./wvr-list.component.scss']
})
export class WvrListComponent extends WvrBaseComponent implements AfterContentInit {

  /** All WvrListItemComponent contained within this list. */
  private readonly listItems: Array<WvrListItemComponent>;

  /** Specifies the display format of this list.  */
  @Input() listType = 'unordered';

  /** Specifies the display style of this list.  */
  @Input() context: Theme;

  /** The raw combined html for each list item. */
  private _htmlString: string;

  /** A SafeHtml represntation of the `_htmlString`. */
  get listItemsHtml(): SafeHtml {
    return this._htmlString;
  }

  constructor(injector: Injector) {
    super(injector);
    this.listItems = new Array<WvrListItemComponent>();
  }

  /** Registers the incoming WvrListItemComponent as a child list item of this list.  */
  addListItem(listItem: WvrListItemComponent): void {
    this.listItems.push(listItem);
  }

  /** Contstructs the `_htmlString` from the combined html content of each list item contained within this list. */
  ngAfterContentInit(): void {
    setTimeout(() => {
      this._htmlString = this.listItems
        .map(li => li.htmlContent)
        .join('\n');
    }, 0);
  }

}
