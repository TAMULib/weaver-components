import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { metaReducers, ROOT_REDUCER } from '../core/store';
import { WvrHeaderComponent } from './wvr-header.component';
import { APP_CONFIG } from '../shared/config/app-config';
import { testAppConfig } from '../shared/config/test-app-config';

describe('WvrHeaderComponent', () => {
  let component: WvrHeaderComponent;
  let fixture: ComponentFixture<WvrHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule, StoreModule.forRoot(ROOT_REDUCER, { metaReducers }) ],
      declarations: [
        WvrHeaderComponent
      ],
      providers: [{
        provide: APP_CONFIG,
        useValue: testAppConfig
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents()
      .catch(err => { console.error(err); });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrHeaderComponent);
    component = fixture.componentInstance;
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

  it('should have logoSrc as "http://localhost:4200/assets/icons/custom/weaver-w.svg"', () => {
    expect(component.logoSrc)
      .toEqual(`${testAppConfig.assetsUrl}/icons/custom/weaver-w.svg`);
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

    // creating mock childres
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
