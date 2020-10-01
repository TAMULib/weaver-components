import { AfterViewInit, Component, Injector, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { WvrBaseComponent } from '../../shared/wvr-base.component';
import { WvrTabsComponent } from '../wvr-tabs.component';

@Component({
  selector: 'wvr-tab-element',
  templateUrl: './wvr-tab.component.html',
  styleUrls: ['./wvr-tab.component.scss']
})
export class WvrTabComponent extends WvrBaseComponent implements AfterViewInit {

  parent: WvrTabsComponent;

  active = false;

  htmlId = `wvr-tab-link-${this.id}`;

  @Input() tabText = `Tab ${this.id}`;

  constructor(injector: Injector) {
    super(injector);
  }

  clickActivation($event: MouseEvent): void {
    $event.preventDefault();
    this.activate();
  }

  activate(): void {
    this.parent.deactivateTabs();
    this.active = true;
    this.parent.activateTab(this);
  }

  deActivate(): void {
    this.active = false;
  }

  ngAfterViewInit(): void {
    const tabsElements: HTMLElement = (this._eRef.nativeElement as HTMLElement).closest('wvr-tabs');
    this.parent = this.componentRegistry.getComponentByElement(tabsElements) as WvrTabsComponent;
    this.parent.addTab(this);
  }

  getTabContent(): SafeHtml {
    const elem = (this._eRef.nativeElement as HTMLElement);
    const contentTemplate = elem.querySelectorAll('template')[0];
    const safeHtml = this._domSanitizer.bypassSecurityTrustHtml(contentTemplate.querySelectorAll('.tab-content')[0].innerHTML);

    return safeHtml;
  }

}
