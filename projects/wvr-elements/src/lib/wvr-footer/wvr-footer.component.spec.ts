import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { metaReducers, ROOT_REDUCER } from '../core/store';
import { APP_CONFIG, testAppConfig } from '../shared/config';
import { WvrFooterComponent } from './wvr-footer.component';

describe('WvrFooterComponent', () => {
  let component: WvrFooterComponent;
  let fixture: ComponentFixture<WvrFooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, StoreModule.forRoot(ROOT_REDUCER, { metaReducers })],
      declarations: [WvrFooterComponent],
      providers: [{
        provide: APP_CONFIG,
        useValue: testAppConfig
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it("should have as isSticky 'false'", () => {
    expect(component.isSticky)
      .toBeFalse();
  });

  it('should positionSelf when window is resized', () => {
    const spyOnResize = spyOn(component, 'positionSelf');
    window.dispatchEvent(new Event('resize'));
    expect(spyOnResize)
      .toHaveBeenCalled();
  });

  it('should have isSticky feature to true', () => {
    expect(component.isSticky)
      .toBeFalse();
    window.resizeBy(300, 300);
    window.dispatchEvent(new Event('resize'));
    expect(component.isSticky)
      .toBeTruthy();
  });

});
