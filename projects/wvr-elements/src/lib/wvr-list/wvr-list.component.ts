import { AfterContentInit, AfterViewInit, Component, ElementRef, Injector, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
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
export class WvrListComponent extends WvrBaseComponent implements AfterContentInit {

  /** All WvrListItemComponent contained within this list. */
  private readonly listItems: Array<WvrListItemComponent>;

  /** Specifies the display format of this list.  */
  @Input() listType = 'unordered';

  /** Specifies the display style of this list.  */
  @Input() context: Theme;

  @ViewChild('animationRoot') renderRoot: ElementRef<HTMLElement>;

  /** The raw combined html for each list item. */
  listItemsHtml: string;

  constructor(injector: Injector) {
    super(injector);
    this.listItems = new Array<WvrListItemComponent>();
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.renderList();
    });
  }

  /** Registers the incoming WvrListItemComponent as a child list item of this list.  */
  addListItem(listItem: WvrListItemComponent): void {
    this.listItems.push(listItem);
    this.asyncRenderList();
  }

  /** A debounced and discrinimate call to renderList.  */
  @debounce(25) private asyncRenderList(): void {
    const listElem = (this.renderRoot.nativeElement as HTMLElement).querySelector('ul, ol, dl');
    if (listElem && listElem.childElementCount !== this.listItems.length) {
      this.renderList();
    }
  }

  /** Combine HTML into a single string for display  */
  private renderList(): void {
    this.listItemsHtml = this.listItems
        .map(li => li.htmlContent)
        .join('\n');
  }

}
