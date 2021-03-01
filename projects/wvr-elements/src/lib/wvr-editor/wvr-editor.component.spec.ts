import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { APP_CONFIG, testAppConfig } from '../shared/config';

import { WvrEditorComponent } from './wvr-editor.component';

@Component({
  selector: 'wvr-editor-test-component',
  // tslint:disable-next-line:component-max-inline-declarations
  template: `<wvr-editor-component></wvr-editor-component>`
})
class WvrEditorHostComponent {
  @ViewChild(WvrEditorComponent) alert: WvrEditorComponent;
}

describe('WvrEditorComponent', () => {
  const initialState = {};

  let component: WvrEditorComponent;
  let fixture: ComponentFixture<WvrEditorComponent>;

  let hostComponent: WvrEditorHostComponent;
  let hostFixture: ComponentFixture<WvrEditorHostComponent>;

  let store: MockStore;
    // tslint:disable-next-line: deprecation
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          BrowserAnimationsModule
        ],
        providers: [
          {
            provide: APP_CONFIG,
            useValue: testAppConfig
          },
          provideMockStore({initialState})
        ],
        declarations: [
          WvrEditorHostComponent,
          WvrEditorComponent
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(WvrEditorComponent);
      component = fixture.componentInstance;

      hostFixture = TestBed.createComponent(WvrEditorHostComponent);
      hostComponent = hostFixture.componentInstance;

      hostFixture.detectChanges();
      fixture.detectChanges();
    });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
