import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { metaReducers, ROOT_REDUCER } from '../core/store';
import { APP_CONFIG, testAppConfig } from '../shared/config';
import { WvrItWorksComponent } from './wvr-it-works.component';

describe('WvrItWorksComponent', () => {
  let component: WvrItWorksComponent;
  let fixture: ComponentFixture<WvrItWorksComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, StoreModule.forRoot(ROOT_REDUCER, { metaReducers })],
      declarations: [WvrItWorksComponent],
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
    fixture = TestBed.createComponent(WvrItWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it("should have as title 'it-works-component'", () => {
    expect(component.title)
      .toEqual('it-works-component');
  });

  it("should have as text 'Weaver Components Work'", () => {
    expect(component.text)
      .toEqual('Weaver Components Work');
  });

  it('should set is mobileAgent', () => {
    expect(component.isMobileAgent)
      .toBeFalse();
  });

});
