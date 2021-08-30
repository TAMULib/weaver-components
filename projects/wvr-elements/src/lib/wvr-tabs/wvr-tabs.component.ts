import { Component, Injector, TemplateRef, ViewChild } from '@angular/core';
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
export class WvrTabsComponent extends WvrBaseComponent {

  tabContentID = `wvr-tab-content-${this.id}`;

  tabs: Array<HTMLElement>;

  constructor(injector: Injector) {
    super(injector);
  }

  ngAfterContentInit() {

  }

  ngOnInit() {
    super.ngOnInit();

    this.tabs = Array.from(this.eRef.nativeElement.querySelectorAll('wvre-tab'));

    let count = 0;
    let activeTab = false;

    this.tabs.forEach(tab => {
      if (!tab.id) {
        tab.id = `tab-${++count}`;
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
        console.error('no tabs defined!');
      }
    }
  }

  isTabActive(tab: HTMLElement): boolean {
    return tab.hasAttribute('active');
  }

  getTabText(tab: HTMLElement): string {
    return tab.getAttribute('tab-text');
  }

  activate(tab: HTMLElement): boolean {
    this.tabs
      .filter(this.isTabActive)
      .forEach(tab => this.deactivate(tab));
    tab.setAttribute('active', '');
    projectContent(this.eRef, `#${tab.id} > template[tab-content]`, 'div[active-tab]');

    return false;
  }

  deactivate(tab: HTMLElement): void {
    preserveContent(this.eRef, `#${tab.id} > template[tab-content]`, 'div[active-tab]');
    tab.removeAttribute('active');
  }

}
