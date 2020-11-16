import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { metaReducers, ROOT_REDUCER } from '../../core/store';
import { APP_CONFIG, testAppConfig } from '../../shared/config';
import { WvrTabsComponent } from '../wvr-tabs.component';

import { WvrTabComponent } from './wvr-tab.component';

describe('WvrTabComponent', () => {
  let component: WvrTabComponent;
  let fixture: ComponentFixture<WvrTabComponent>;

  let parentComponent: WvrTabsComponent;
  let parentFixture: ComponentFixture<WvrTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, StoreModule.forRoot(ROOT_REDUCER, { metaReducers })],
      declarations: [WvrTabsComponent, WvrTabComponent],
      providers: [{
        provide: APP_CONFIG,
        useValue: testAppConfig
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrTabComponent);
    component = fixture.componentInstance;

    parentFixture = TestBed.createComponent(WvrTabsComponent);
    parentComponent = parentFixture.componentInstance;
    component.parent = parentComponent;

    parentComponent.addTab(component);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it('should have unique id', () => {
    const tabElem = (fixture.elementRef.nativeElement as HTMLElement).querySelector('li a');
    expect(component.htmlId)
      .toEqual(tabElem.getAttribute('id'));
  });

  it('should have unique tab text', () => {
    const tabElem = (fixture.elementRef.nativeElement as HTMLElement).querySelector('li a');
    expect(component.tabText.trim())
      .toEqual(tabElem.innerHTML.trim());
  });

  it('should activate', () => {

    const secondFixture = TestBed.createComponent(WvrTabComponent);
    const secondComponent = secondFixture.componentInstance;
    secondComponent.parent = parentComponent;

    parentComponent.addTab(secondComponent);

    expect(secondComponent.active)
      .toBeFalse();
    secondComponent.clickActivation(new MouseEvent('click'));
    expect(secondComponent.active)
      .toBeTrue();

  });

});
