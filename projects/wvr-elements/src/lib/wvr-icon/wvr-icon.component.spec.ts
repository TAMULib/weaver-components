import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { metaReducers, ROOT_REDUCER } from '../core/store';
import { APP_CONFIG } from '../shared/config/app-config';
import { testAppConfig } from '../shared/config/test-app-config';
import { WvrIconComponent } from './wvr-icon.component';
import { initialState } from '../core/store';

@Component({
  selector: 'wvr-icon-host-component',
  // tslint:disable-next-line:component-max-inline-declarations
  template: '<wvr-icon-component></wvr-icon-component>'
})
class WvrIconHostComponent {
  @ViewChild(WvrIconComponent) icon: WvrIconComponent;
}

describe('WvrIconComponent', () => {
  let component: WvrIconComponent;
  let fixture: ComponentFixture<WvrIconComponent>;

  let hostComponent: WvrIconHostComponent;
  let hostFixture: ComponentFixture<WvrIconHostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(ROOT_REDUCER, { metaReducers })
      ],
      providers: [
        {
          provide: APP_CONFIG,
          useValue: testAppConfig
        },
        provideMockStore({initialState})
      ],
      declarations: [
        WvrIconComponent,
        WvrIconHostComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrIconComponent);
    component = fixture.componentInstance;

    hostFixture = TestBed.createComponent(WvrIconHostComponent);
    hostComponent = hostFixture.componentInstance;

    hostFixture.detectChanges();
    fixture.detectChanges();
  });

  it('should create', inject([HttpTestingController],
    (httpMock: HttpTestingController) => {
      expect(component)
        .toBeTruthy();
    })
  );

  it('should have as size as  "24px"', () => {
    expect(component.size)
      .toEqual('24px');
  });

});
