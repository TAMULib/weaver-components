import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WvrHeaderComponent } from './wvr-header.component';

describe('WvrHeaderComponent', () => {
  let component: WvrHeaderComponent;
  let fixture: ComponentFixture<WvrHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule ],
      declarations: [
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
    const wvrNavLiElement = document.createElement('wvre-nav-li-component');
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
