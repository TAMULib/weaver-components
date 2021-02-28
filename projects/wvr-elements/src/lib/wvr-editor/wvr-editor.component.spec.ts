import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
  let component: WvrEditorComponent;
  let fixture: ComponentFixture<WvrEditorComponent>;

  let hostComponent: WvrEditorHostComponent;
  let hostFixture: ComponentFixture<WvrEditorHostComponent>;

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
          }
        ],
        declarations: [
          WvrEditorHostComponent,
          WvrEditorComponent
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
