import { AfterViewInit, Component, Injector, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ThemeVariantName } from '../../shared/theme';
import { WvrBaseComponent } from '../../shared/wvr-base.component';
import { WvrTabsComponent } from '../wvr-tabs.component';

/**
 * The constituent component in a tabs interface.
 */
@Component({
  selector: 'wvr-tab-component',
  templateUrl: './wvr-tab.component.html',
  styleUrls: ['./wvr-tab.component.scss']
})
export class WvrTabComponent extends WvrBaseComponent implements AfterViewInit {

  /** Used to define the class type for wvr tab component. */
  @Input() themeVariant: ThemeVariantName = 'success';

  /* The WvrTabsComponent that contains this tab. */
  parent: WvrTabsComponent;

  /* Indicates the active/deactive state of this tab. */
  active = false;

  /* A constructed identifier derived from this tab's component id and the prefix `wvr-tab-link`. */
  htmlId = `wvr-tab-link-${this.id}`;

  /** The text to be displayed within the tab link */
  @Input() tabText = `Tab ${this.id}`;

  constructor(injector: Injector) {
    super(injector);
  }

  /** A handler method for the click event on the `nav-link`. */
  clickActivation($event: MouseEvent): void {
    $event.preventDefault();
    this.activate();
  }

  /** Deactivates any other tab and places this tab into the active state. */
  activate(): void {
    this.parent.deactivateTabs();
    this.active = true;
    this.parent.activateTab(this);
  }

  /** Updates the active/deactive state of this tab to deactive. */
  deActivate(): void {
    this.active = false;
  }

  /** Registers this tab with its parent as a child tab. */
  ngAfterViewInit(): void {
    const tabsElements: HTMLElement = (this._eRef.nativeElement as HTMLElement).closest('wvre-tabs, wvr-tabs-component');
    if (tabsElements) {
      this.parent = this.componentRegistry.getComponentByElement(tabsElements) as WvrTabsComponent;
      this.parent.addTab(this);
      this.themeVariant = this.themeVariant ? this.themeVariant : this.parent.themeVariant ? this.parent.themeVariant : undefined;
    } else {
      console.warn('The wvr-tab component must be contained within a wvre-tabs component.');
    }
  }

  /** Gets the html content for this tab. */
  getTabContent(): SafeHtml {
    const elem = (this._eRef.nativeElement as HTMLElement);
    const contentTemplate = elem.querySelectorAll('template')[0];
    const safeHtml = this._domSanitizer.bypassSecurityTrustHtml(contentTemplate.querySelectorAll('.tab-content')[0].innerHTML);

    return safeHtml;
  }

  additionalTabClasses(): string {
    let textClass = '';
    textClass +=  ((this.themeVariant === 'primary') || (this.themeVariant === 'secondary') ||
                  (this.themeVariant === 'danger') || this.themeVariant === 'dark') ?
                  'text-white' : 'text-dark';

    return textClass;
  }

}
