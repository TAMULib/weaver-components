import { AfterContentInit, AfterViewInit, Component, Injector, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Theme } from '../shared/theme.type';
import { WvrBaseComponent } from '../shared/wvr-base.component';
import { WvrListItemComponent } from './wvr-list-item/wvr-list-item.component';

@Component({
  selector: 'wvr-list-element',
  templateUrl: './wvr-list.component.html',
  styleUrls: ['./wvr-list.component.scss']
})
export class WvrListComponent extends WvrBaseComponent implements AfterContentInit {

  private readonly listItems: Array<WvrListItemComponent>;

  @Input() listType = 'unordered';

  @Input() context: Theme;

  private _htmlString: string;

  get listItemsHtml(): SafeHtml {
    return this._htmlString;
  }

  constructor(injector: Injector) {
    super(injector);
    this.listItems = new Array<WvrListItemComponent>();
  }

  addListItem(listItem: WvrListItemComponent): void {
    this.listItems.push(listItem);
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this._htmlString = this.listItems
        .map(li => li.htmlContent)
        .join('\n');
    }, 0);
  }

}
