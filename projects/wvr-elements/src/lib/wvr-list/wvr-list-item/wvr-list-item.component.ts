import { Component, Injector, Input, OnInit } from '@angular/core';
import { Theme } from '../../shared/theme.type';
import { WvrBaseComponent } from '../../shared/wvr-base.component';

@Component({
  selector: 'wvr-list-item-element',
  templateUrl: './wvr-list-item.component.html',
  styleUrls: ['./wvr-list-item.component.scss']
})
export class WvrListItemComponent extends WvrBaseComponent implements OnInit {

  private _parent: HTMLElement;

  listType: string;

  @Input() description: string;

  @Input() context: Theme;

  @Input() customContentItemHeading: string;

  @Input() cusomContentHeadingSmallText: string;

  @Input() customContentSmallText: string;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this._parent = (this._eRef.nativeElement as HTMLElement).closest('wvr-list');

    const listTypeAttribute = this._parent ? this._parent.getAttribute('list-type') : undefined;
    this.listType = listTypeAttribute ? listTypeAttribute : 'unordered';

    const contextAttribute = this._parent ? (this._parent.getAttribute('context') as Theme) : undefined;
    this.context = contextAttribute ? contextAttribute : undefined;
  }

}
