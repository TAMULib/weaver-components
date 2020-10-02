import { AfterContentInit, Component, ElementRef, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Theme } from '../../shared/theme.type';
import { WvrBaseComponent } from '../../shared/wvr-base.component';
import { WvrListComponent } from '../wvr-list.component';

@Component({
  selector: 'wvr-list-item-element',
  templateUrl: './wvr-list-item.component.html',
  styleUrls: ['./wvr-list-item.component.scss']
})
export class WvrListItemComponent extends WvrBaseComponent implements OnInit, AfterContentInit  {

  private parent: WvrListComponent;

  listType: string;

  @Input() description: string;

  @Input() context: Theme;

  @Input() customContentItemHeading: string;

  @Input() cusomContentHeadingSmallText: string;

  @Input() customContentSmallText: string;

  htmlId = `wvr-li-${this.id}`;

  @ViewChild('liWrapper') contentProjection: ElementRef<HTMLTemplateElement>;

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

  ngOnInit(): void {

    const listElem: HTMLElement = (this._eRef.nativeElement as HTMLElement).closest('wvr-list');

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
      console.warn('The wvr-list-item component must be contained within a wvr-list component.');
    }

  }

}
