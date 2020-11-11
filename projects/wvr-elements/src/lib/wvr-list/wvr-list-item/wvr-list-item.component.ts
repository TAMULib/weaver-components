import { AfterViewInit, Component, Injector, Input, OnInit } from '@angular/core';
import { ThemeVariantName } from '../../shared/theme';
import { WvrBaseComponent } from '../../shared/wvr-base.component';

/**
 * A sub component to the WvrListComponent.
 */
@Component({
  selector: 'wvr-list-item-component',
  templateUrl: './wvr-list-item.component.html',
  styleUrls: ['./wvr-list-item.component.scss']
})
export class WvrListItemComponent extends WvrBaseComponent implements OnInit, AfterViewInit {

  /** The type of list which contains this list item. */
  listType: string;

  /** Attribute input used with descriptive lists as the text of the DT element. */
  @Input() description: string;

  /** The visual contextualization for this list item. */
  @Input() themeVariant: ThemeVariantName;

  /** A heading to be displayed for list items with custom content. */
  @Input() customContentItemHeading: string;

  /** A subtext to be displayed beneath the heading for list items with custom content.   */
  @Input() customContentHeadingSmallText: string;

  /** A subtext to be displayed beneath the main content for list items with custom content.   */
  @Input() customContentSmallText: string;

  /** A contructed identifier dervied from this comonents id and the prefix `wvr-li` */
  htmlId = `wvr-li-${this.id}`;

  constructor(injector: Injector) {
    super(injector);
  }

  /** Registers this list item with the parent list. */
  ngOnInit(): void {
    super.ngOnInit()
    const parent = this._eRef.nativeElement.parentNode.parentNode.parentNode;
    this.listType = parent.listType;
    this.themeVariant = this.themeVariant ? this.themeVariant : parent.themeVariant ? parent.themeVariant : undefined;
  }

  ngAfterViewInit(): void {
    // get the element's parent node
    const parent = this._eRef.nativeElement.parentNode;

    // move all children out of the element
    while (this._eRef.nativeElement.firstChild) {
      parent.insertBefore(this._eRef.nativeElement.firstChild, this._eRef.nativeElement);
    }
    // remove the empty element
    parent.removeChild(this._eRef.nativeElement);
  }

}
