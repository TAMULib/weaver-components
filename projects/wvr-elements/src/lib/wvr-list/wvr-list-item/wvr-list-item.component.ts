import { Component, HostBinding, Injector, Input, OnInit } from '@angular/core';
import { Theme } from '../../shared/theme.type';
import { WvrBaseComponent } from '../../shared/wvr-base.component';
import { WvrListComponent } from '../wvr-list.component';

@Component({
  selector: 'wvr-list-item-element',
  templateUrl: './wvr-list-item.component.html',
  styleUrls: ['./wvr-list-item.component.scss']
})
export class WvrListItemComponent extends WvrBaseComponent implements OnInit {

  private parent: WvrListComponent;

  listType: string;

  @Input() description: string;

  @Input() context: Theme;

  @Input() customContentItemHeading: string;

  @Input() cusomContentHeadingSmallText: string;

  @Input() customContentSmallText: string;

  htmlId = `wvr-li-${this.id}`;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.parent = this.componentRegistry
      .getComponentByElement((this._eRef.nativeElement as HTMLElement).closest('wvr-list')) as WvrListComponent;

    const listTypeAttribute = this.parent ? this.parent.listType : undefined;
    this.listType = listTypeAttribute ? listTypeAttribute : 'unordered';
    const parentTheme = this.parent ? this.parent.context : undefined;
    this.context = this.context ?
                   this.context :
                   parentTheme ?
                   parentTheme :
                   undefined;

    this.parent.addListItem(this);
  }

}
