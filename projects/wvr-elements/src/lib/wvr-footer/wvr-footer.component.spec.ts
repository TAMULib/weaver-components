import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { metaReducers, ROOT_REDUCER } from '../core/store';
import { APP_CONFIG, testAppConfig } from '../shared/config';
import { WvrFooterComponent } from './wvr-footer.component';

@Component({
  selector: 'wvr-footer-component',
  // tslint:disable-next-line:component-max-inline-declarations
  template: `<wvr-footer-component></wvr-footer-component>`
})
class WvrFooterHostComponent {
  @ViewChild(WvrFooterComponent) footer: WvrFooterComponent;
}

describe('WvrFooterComponent', () => {
  let component: WvrFooterComponent;
  let fixture: ComponentFixture<WvrFooterComponent>;

  let hostComponent: WvrFooterHostComponent;
  let hostFixture: ComponentFixture<WvrFooterHostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        StoreModule.forRoot(ROOT_REDUCER, { metaReducers })
      ],
      providers: [{
        provide: APP_CONFIG,
        useValue: testAppConfig
      }],
      declarations: [WvrFooterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrFooterComponent);
    component = fixture.componentInstance;

    hostFixture = TestBed.createComponent(WvrFooterHostComponent);
    hostComponent = hostFixture.componentInstance;

    hostFixture.detectChanges();
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
