import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { MobileService } from '../core/mobile.service';
import { APP_CONFIG } from '../shared/config/app-config';
import { testAppConfig } from '../shared/config/test-app-config';
import { WvrHeaderComponent } from './wvr-header.component';

@Component({
  selector: 'wvr-header-host-component',
  // tslint:disable-next-line:component-max-inline-declarations
  template: '<wvr-header-component></wvr-header-component>'
})
class WvrHeaderHostComponent {
  @ViewChild(WvrHeaderComponent) header: WvrHeaderComponent;
}

class MockMobileService {
  isMobileLayout = false;
}

describe('WvrHeaderComponent', () => {
  const initialState = { theme: {
    themes: {}
  }};
  let component: WvrHeaderComponent;
  let fixture: ComponentFixture<WvrHeaderComponent>;

  let hostComponent: WvrHeaderHostComponent;
  let hostFixture: ComponentFixture<WvrHeaderHostComponent>;

  let mockMobileService: MockMobileService;

  beforeEach(waitForAsync(() => {
    mockMobileService = new MockMobileService();
    TestBed.overrideProvider(MobileService, { useValue: mockMobileService });

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: APP_CONFIG,
          useValue: testAppConfig
        },
        provideMockStore({initialState})
      ],
      declarations: [
        WvrHeaderHostComponent,
        WvrHeaderComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents()
      .catch(err => { console.error(err); });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrHeaderComponent);
    component = fixture.componentInstance;

    hostFixture = TestBed.createComponent(WvrHeaderHostComponent);
    hostComponent = hostFixture.componentInstance;

    hostFixture.detectChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it('should have as logoText "Weaver Components"', () => {
    expect(component.logoText)
      .toEqual('Weaver Components');
  });

  it('should have as headerTitle "Weaver Header Component"', () => {
    expect(component.headerTitle)
      .toEqual('Weaver Header Component');
  });

  it('should have logoSrc defined', () => {
    expect(component.logoSrc)
      .toBeDefined();
  });

  it('should have as logoHref "#logo"', () => {
    expect(component.logoHref)
      .toEqual('#logo');
  });

  it('should have displayBottomNav as undefined', () => {
    expect(component.displayBottomNav)
      .toEqual(undefined);
  });

  it('should have bottom navigation toggle display', () => {
    const bottomNavElement = fixture.nativeElement.querySelector('.bottom-nav') as HTMLElement;

    component.displayBottomNav = 'true';
    fixture.detectChanges();

    expect(bottomNavElement.hasAttribute('hidden'))
      .toEqual(false);

    component.displayBottomNav = 'false';
    fixture.detectChanges();

    expect(bottomNavElement.hasAttribute('hidden'))
      .toEqual(true);

    component.displayBottomNav = undefined;
    fixture.detectChanges();

    expect(bottomNavElement.hasAttribute('hidden'))
      .toEqual(true);

    // creating mock children
    const wvrNavList = document.createElement('wvre-nav-list');
    const wvrNavLi = document.createElement('wvre-nav-li');

    // adding children to assert hidden attribute does not exist
    wvrNavList.appendChild(wvrNavLi);
    bottomNavElement.appendChild(wvrNavList);
    fixture.detectChanges();
    expect(bottomNavElement.hasAttribute('hidden'))
      .toEqual(false);

    // removing/replacing the children
    const wvrNavLiElement = document.createElement('wvr-nav-li-component');
    wvrNavList.replaceChild(wvrNavLiElement, wvrNavLi);
    fixture.detectChanges();
    expect(bottomNavElement.hasAttribute('hidden'))
      .toEqual(false);

  });

  it('should have toggle menu', () => {
    expect(component.mobileMenuClosed)
      .toBeTruthy();
    component.toggleMobileMenu();
    fixture.detectChanges();
    expect(component.mobileMenuClosed)
    .toBe(false);
  });

});
