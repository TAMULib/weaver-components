import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { APP_CONFIG, testAppConfig } from '../shared/config';
// TODO: should be using the store's initial state but this is not currently working.
//import { initialState } from '../core/store';
import { WvrModalComponent } from './wvr-modal.component';

describe('WvrModalComponent', () => {
  let component: WvrModalComponent;
  let fixture: ComponentFixture<WvrModalComponent>;
  const initialState = {};

  beforeEach(waitForAsync(() => TestBed.configureTestingModule({
    declarations: [WvrModalComponent],
    imports: [
      BrowserAnimationsModule
    ],
    providers: [
      {
        provide: APP_CONFIG,
        useValue: testAppConfig
      },
      provideMockStore({ initialState })
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  }).compileComponents()));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it('should have `btnVisible` defined', () => {
    expect(component.btnVisible)
      .toEqual('true');
    component.btnVisible = 'false';
    fixture.detectChanges();
    expect(component.btnVisible)
      .toEqual('false');
  });

});
