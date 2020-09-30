import { Component } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { WvrBaseComponent } from '../shared/wvr-base.component';
import { WvrTabComponent } from './wvr-tab/wvr-tab.component';

@Component({
  selector: 'wvr-wvr-tabs-element',
  templateUrl: './wvr-tabs.component.html',
  styleUrls: ['./wvr-tabs.component.scss']
})
export class WvrTabsComponent extends WvrBaseComponent {

  private tabs = new Array<WvrTabComponent>();

  activeTabContent: SafeHtml = 'Tab Content';

  addTab(tab: WvrTabComponent): void {
    if (!this.tabs.length) {
      tab.activate();
    }
    this.tabs.push(tab);
  }

  deactivateTabs(): void {
    this.tabs.forEach(t => t.deActivate());
  }

}
