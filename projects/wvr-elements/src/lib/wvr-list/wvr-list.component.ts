import { AfterContentInit, AfterViewInit, Component, Injector, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Theme } from '../shared/theme.type';
import { debounce } from '../shared/utility';
import { WvrBaseComponent } from '../shared/wvr-base.component';
import { WvrListItemComponent } from './wvr-list-item/wvr-list-item.component';

/**
 * A stylable list.
 */
@Component({
  selector: 'wvr-list-component',
  templateUrl: './wvr-list.component.html',
  styleUrls: ['./wvr-list.component.scss']
})
export class WvrListComponent extends WvrBaseComponent {

  /** All WvrListItemComponent contained within this list. */
  private readonly listItems: Array<WvrListItemComponent>;

  /** Specifies the display format of this list.  */
  @Input() listType = 'unordered';

  /** Specifies the display style of this list.  */
  @Input() context: Theme;

  /** The raw combined html for each list item. */
  listItemsHtml: string;

  constructor(injector: Injector) {
    super(injector);
    this.listItems = new Array<WvrListItemComponent>();
  }

  /** Registers the incoming WvrListItemComponent as a child list item of this list.  */
  addListItem(listItem: WvrListItemComponent): void {
    this.listItems.push(listItem);
    this.renderList();
  }

  @debounce() private renderList(): void {
    this.listItemsHtml = this.listItems
        .map(li => li.htmlContent)
        .join('\n');
  }

}
