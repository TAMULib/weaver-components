import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../core/store';
import { APP_CONFIG, testAppConfig } from '../shared/config';
import { WvrSharedModule } from '../shared/wvr-shared.module';
import { WvrFooterComponent } from './wvr-footer.component';

@Component({
  selector: 'wvr-footer-host-component',
  // tslint:disable-next-line:component-max-inline-declarations
  template: '<wvr-footer-component></wvr-footer-component>'
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
        WvrSharedModule
      ],
      declarations: [
        WvrFooterComponent,
        WvrFooterHostComponent
      ],
      providers: [
        {
          provide: APP_CONFIG,
          useValue: testAppConfig
        },
        provideMockStore({ initialState })
      ]
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

    // save the height to restore after test.
    const originalHeight = window.innerHeight;

    // The resize must be pre-dispatcehd before making changes to the window height.
    window.dispatchEvent(new Event('resize'));

    // This overwrites the value to the desired height.
    (<any>window).innerHeight = 1;

    // Another dispatch is needed to trigger the desired change.
    window.dispatchEvent(new Event('resize'));

    expect(component.isSticky)
      .toBeTruthy();

    // The window does not get restored after the change, so manually restore it.
    (<any>window).innerHeight = originalHeight;
  });

  it('should have isSticky feature to false', () => {
    expect(component.isSticky)
      .toBeFalse();

    // save the height to restore after test.
    const originalHeight = window.innerHeight;

    // The resize must be pre-dispatcehd before making changes to the window height.
    window.dispatchEvent(new Event('resize'));

    // This overwrites the value to the desired height.
    (<any>window).innerHeight = 1000;

    // Another dispatch is needed to trigger the desired change.
    window.dispatchEvent(new Event('resize'));

    expect(component.isSticky)
      .toBeFalsy();

    // The window does not get restored after the change, so manually restore it.
    (<any>window).innerHeight = originalHeight;
  });

});
