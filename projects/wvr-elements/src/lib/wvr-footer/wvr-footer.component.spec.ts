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

});
