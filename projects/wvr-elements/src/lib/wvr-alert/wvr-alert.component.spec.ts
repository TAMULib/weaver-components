import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../core/store';
import { APP_CONFIG, testAppConfig } from '../shared/config';
import { WvrSharedModule } from '../shared/wvr-shared.module';
import { WvrAlertComponent } from './wvr-alert.component';

@Component({
  selector: 'wvr-alert-test-component',
  // tslint:disable-next-line:component-max-inline-declarations
  template: `<wvr-alert-component #versionOne [alertType]="'self-closing'" [closeTimer]="1"></wvr-alert-component>`
})
class WvrAlertHostComponent {
  @ViewChild(WvrAlertComponent) alert: WvrAlertComponent;
}

describe('WvrAlertComponent', () => {
  let component: WvrAlertComponent;
  let fixture: ComponentFixture<WvrAlertComponent>;

  let hostComponent: WvrAlertHostComponent;
  let hostFixture: ComponentFixture<WvrAlertHostComponent>;

  // tslint:disable-next-line: deprecation
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        WvrSharedModule
      ],
      declarations: [
        WvrAlertComponent,
        WvrAlertHostComponent
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
    TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrAlertComponent);
    component = fixture.componentInstance;

    hostFixture = TestBed.createComponent(WvrAlertHostComponent);
    hostComponent = hostFixture.componentInstance;

    hostFixture.detectChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it("should have as alert type as 'basic'", () => {
    expect(component.alertType)
      .toEqual('basic');
  });

  it('should close when close button is clicked', () => {
    component.alertType = 'custom';
    fixture.detectChanges();
    const alertElem = fixture.elementRef.nativeElement as HTMLElement;
    // tslint:disable-next-line: no-unnecessary-type-assertion
    const closeButton = alertElem.querySelector('button.close') as HTMLElement;
    expect(component.alertClosed)
      .toBeFalse();
    closeButton.dispatchEvent(new MouseEvent('click'));
    expect(component.alertClosed)
      .toBeTrue();
  });

  it('should auto close when alert-type="self-closing"', done => {
    setTimeout(() => {
      done();
      expect(hostComponent.alert
        .alertClosed)
        .toBeTrue();
    }, 100);
    expect(component)
      .toBeDefined();
  });

});
