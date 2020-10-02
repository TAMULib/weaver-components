import { Component, Injector, Input } from '@angular/core';
import { Theme } from '../shared/theme.type';
import { WvrBaseComponent } from '../shared/wvr-base.component';
import { WvrListItemComponent } from './wvr-list-item/wvr-list-item.component';

@Component({
  selector: 'wvr-list-element',
  templateUrl: './wvr-list.component.html',
  styleUrls: ['./wvr-list.component.scss']
})
export class WvrListComponent extends WvrBaseComponent {

  private readonly listItems: Array<WvrListItemComponent>;

  @Input() listType = 'unordered';

  @Input() context: Theme;

  get ariaOwns(): string {
    return this.listItems
      .map(li => li.htmlId)
      .join(',');
  }

  constructor(injector: Injector) {
    super(injector);
    this.listItems = new Array<WvrListItemComponent>();
  }

  addListItem(listItem: WvrListItemComponent): void {
    this.listItems.push(listItem);
  }

}
