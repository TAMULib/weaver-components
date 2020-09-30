import { AfterViewInit, Component, Input } from '@angular/core';
import { WvrBaseComponent } from '../../shared/wvr-base.component';
import { WvrTabsComponent } from '../wvr-tabs.component';

@Component({
  selector: 'wvr-wvr-tab',
  templateUrl: './wvr-tab.component.html',
  styleUrls: ['./wvr-tab.component.scss']
})
export class WvrTabComponent extends WvrBaseComponent implements AfterViewInit {

  parent: WvrTabsComponent;

  active = false;

  @Input() tabText = `Tab ${this.id}`;

  clickActivation($event: MouseEvent): void {
    $event.preventDefault();
    this.activate();
  }

  activate(): void {
    this.parent.deactivateTabs();
    this.active = true;
    const elem = (this._eRef.nativeElement as HTMLElement);
    const contentTemplate = elem.querySelectorAll('template')[0];
    const safeHtml = this._domSanitizer.bypassSecurityTrustHtml(contentTemplate.querySelectorAll('.tab-content')[0].innerHTML);
    this.parent.activeTabContent = safeHtml;
  }

  deActivate(): void {
    this.active = false;
  }

  ngAfterViewInit(): void {
    const tabsElements: HTMLElement = (this._eRef.nativeElement as HTMLElement).closest('wvr-tabs');
    this.parent = this.componentRegistry.getComponentByElement(tabsElements) as WvrTabsComponent;
    this.parent.addTab(this);
  }

}
