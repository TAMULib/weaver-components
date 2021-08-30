import { Component, Injector, OnInit } from '@angular/core';
import { preserveContent, projectContent } from '../shared/utility/projection.utility';
import { WvrBaseComponent } from '../shared/wvr-base.component';

/**
 * The principle component for a tabbed presentation.
 */
@Component({
  selector: 'wvr-tabs-component',
  templateUrl: './wvr-tabs.component.html',
  styleUrls: ['./wvr-tabs.component.scss']
})
export class WvrTabsComponent extends WvrBaseComponent implements OnInit {

  tabContentID = `wvr-tab-content-${this.id}`;

  tabs: Array<HTMLElement>;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.tabs = Array.from(this.eRef.nativeElement.querySelectorAll('template[tab-content]'));

    let count = 0;
    let activeTab = false;

    this.tabs.forEach(tab => {
      if (!tab.id) {
        count += 1;
        tab.id = `tab-${count}`;
      }

      if (this.isTabActive(tab)) {
        this.activate(tab);
        activeTab = true;
      }
    });

    if (!activeTab) {
      if (this.tabs.length) {
        this.activate(this.tabs[0]);
      } else {
        console.error('No tabs defined!');
      }
    }
  }

  activate(tab: HTMLElement): boolean {
    this.tabs
      .filter(this.isTabActive)
      .forEach(t => {
        this.deactivate(t);
      });
    tab.setAttribute('active', '');
    projectContent(this.eRef, `template[tab-content]#${tab.id}`, 'div[active-tab]');

    return false;
  }

  trackTabById = (index, tab: HTMLElement): string => tab.id;

  private deactivate(tab: HTMLElement): void {
    preserveContent(this.eRef, `template[tab-content]#${tab.id}`, 'div[active-tab]');
    tab.removeAttribute('active');
  }

  private readonly isTabActive = (tab: HTMLElement): boolean => tab.hasAttribute('active');

}
