import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../core/store';
import { APP_CONFIG, testAppConfig } from '../shared/config';
import { WvrSharedModule } from '../shared/wvr-shared.module';
import { WvrTabComponent } from './wvr-tab/wvr-tab.component';
import { WvrTabsComponent } from './wvr-tabs.component';

describe('WvrTabsComponent', () => {
  let component: WvrTabsComponent;
  let fixture: ComponentFixture<WvrTabsComponent>;
  let wvrTabComponent: WvrTabComponent;
  let tabFixture: ComponentFixture<WvrTabComponent>;

  beforeEach(waitForAsync(() => TestBed.configureTestingModule({
    imports: [WvrSharedModule],
    declarations: [WvrTabsComponent],
    providers: [
      {
        provide: APP_CONFIG,
        useValue: testAppConfig
      },
      provideMockStore({ initialState })
    ]
  }).compileComponents()));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrTabsComponent);
    component = fixture.componentInstance;
    tabFixture = TestBed.createComponent(WvrTabComponent);
    wvrTabComponent = tabFixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it('should have unique tab content id', () => {
    const tabContentElem = (fixture.elementRef.nativeElement as HTMLElement).querySelector('tab-content');
    expect(component.tabContentID)
      .toEqual(tabContentElem.getAttribute('id'));
  });

  it('should have an active tab content', () => {
    const tabContentElem = (fixture.elementRef.nativeElement as HTMLElement).querySelector('tab-content');
    expect(component.activeTabContent)
      .toEqual(tabContentElem.innerHTML);
  });

  it('should have an option to add tab', () => {
    wvrTabComponent.parent = component;
    // tslint:disable-next-line: no-string-literal
    const tabs = component['tabs'];
    expect(tabs.length)
      .toEqual(0);
    expect(wvrTabComponent.active)
      .toBeFalse();
    component.addTab(wvrTabComponent);
    expect(tabs.length)
      .toEqual(1);
    expect(wvrTabComponent.active)
      .toBeTrue();
  });

});
