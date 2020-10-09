import { AfterContentInit, Component, ElementRef, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Theme } from '../../shared/theme.type';
import { WvrBaseComponent } from '../../shared/wvr-base.component';
import { WvrListComponent } from '../wvr-list.component';

/**
 * A sub component to the WvrListComponent.
 */
@Component({
  selector: 'wvr-list-item-component',
  templateUrl: './wvr-list-item.component.html',
  styleUrls: ['./wvr-list-item.component.scss']
})
export class WvrListItemComponent extends WvrBaseComponent implements OnInit, AfterContentInit  {

  /** The WvrListComponent which contains this list item.  */
  private parent: WvrListComponent;

  /** The type of list which contains this list item. */
  listType: string;

  /** Attribute input used with descriptive lists as the text of the DT element. */
  @Input() description: string;

  /** The visual contextualization for this list item. */
  @Input() context: Theme;

  /** A heading to be displayed for list items with custom content. */
  @Input() customContentItemHeading: string;

  /** A subtext to be displayed beneath the heading for list items with custom content.   */
  @Input() customContentHeadingSmallText: string;

  /** A subtext to be displayed beneath the main content for list items with custom content.   */
  @Input() customContentSmallText: string;

  /** A contructed identifier dervied from this comonents id and the prefix `wvr-li` */
  htmlId = `wvr-li-${this.id}`;

  /** A view child reference to the html template contianing the projected content. */
  @ViewChild('liWrapper') contentProjection: ElementRef<HTMLTemplateElement>;

  /** A getter for the html content contined withing the `contentProjection` template */
  get htmlContent(): string {
    const elems = this.contentProjection.nativeElement.children;

    let htmlString = '';
    for (let i = 0; i < elems.length; i++) {
      const elem = elems.item(i);
      htmlString += elem.outerHTML;
    }

    return htmlString;
  }

  constructor(injector: Injector) {
    super(injector);
  }

  /** Registers this list item with the parent list. */
  ngOnInit(): void {

    const listElem: HTMLElement = (this._eRef.nativeElement as HTMLElement).closest('wvre-list');

    if (listElem) {
      this.parent = this.componentRegistry
      .getComponentByElement(listElem) as WvrListComponent;
      this.parent.addListItem(this);

      const listTypeAttribute = this.parent ? this.parent.listType : undefined;
      this.listType = listTypeAttribute ? listTypeAttribute : 'unordered';
      const parentTheme = this.parent ? this.parent.context : undefined;
      this.context = this.context ?
                    this.context :
                    parentTheme ?
                    parentTheme :
                    undefined;
    } else {
      console.warn('The wvre-list-item component must be contained within a wvre-list component.');
    }

  }

}
