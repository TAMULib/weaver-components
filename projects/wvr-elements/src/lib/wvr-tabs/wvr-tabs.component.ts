import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { ThemeVariantName } from '../shared/theme';
import { WvrBaseComponent } from '../shared/wvr-base.component';
import { WvrTabComponent } from './wvr-tab/wvr-tab.component';

/**
 * The principle component for a a tabbed presentation.
 */
@Component({
  selector: 'wvr-tabs-component',
  templateUrl: './wvr-tabs.component.html',
  styleUrls: ['./wvr-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WvrTabsComponent extends WvrBaseComponent {

  /** Used to define the class type for wvr tabs component. */
  @Input() themeVariant: ThemeVariantName = 'success';

  /** The child WvrTabComponent contained within this tabs. */
  private readonly tabs = new Array<WvrTabComponent>();

  /**  The WvrTabComponent that is currently active (displayed) */
  activeTab: WvrTabComponent;

  /* A contructed identifier for the content section, derrived from the the component id and the prefix 'wvr-tab-content' */
  tabContentID = `wvr-tab-content-${this.id}`;

  /* SafeHtml to be injected into the active tab content. */
  activeTabContent = 'Tab Content';

  constructor(injector: Injector) {
    super(injector);
  }

  /* Places the incomming tab into the tabs array */
  addTab(tab: WvrTabComponent): void {
    if (!this.tabs.length) {
      tab.activate();
    }
    this.tabs.push(tab);
  }

  /* Sets the incomming tab to active and resets the active tab content to the content of the incomming tab. */
  activateTab(tab: WvrTabComponent): void {
    this.activeTab = tab;
    this.activeTabContent = tab.getTabContent();
  }

  /* Deactivates all tabs within the tabs array */
  deactivateTabs(): void {
    this.tabs.forEach(t => {
      t.deActivate();
    });
  }

}
