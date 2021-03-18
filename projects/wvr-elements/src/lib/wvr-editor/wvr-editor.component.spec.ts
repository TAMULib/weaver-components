import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { APP_CONFIG, testAppConfig } from '../shared/config';

import { WvrEditorComponent } from './wvr-editor.component';

@Component({
  selector: 'wvr-editor-test-component',
  // tslint:disable-next-line:component-max-inline-declarations
  template: `<wvr-editor-component skin="oxide-dark" initial-value="Hello, World!"></wvr-editor-component>`
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

  it('should have output format defined', () => {
    expect(component.outputFormat)
      .toEqual('html');
    component.outputFormat = 'text';
    fixture.detectChanges();
    expect(component.outputFormat)
      .toEqual('text');
  });

  it('should have config property defined', () => {
    expect(component.config.base_url)
      .toEqual(component.baseUrl);
    component.baseUrl = 'assets/tinymce';
    fixture.detectChanges();

    expect(component.config.base_url)
      .toEqual('assets/tinymce');

    expect(component.config.menu)
    .toEqual(component.menu);

    expect(component.config.plugins)
    .toEqual(component.plugins);

    const plugins = ['preview anchor searchreplace visualblocks code', 'fullscreen insertdatetime media table paste', 'help wordcount print preview save'];
    component.plugins = plugins;
    fixture.detectChanges();

    expect(component.config.plugins)
      .toEqual(plugins);

    expect(component.config.skin)
    .toEqual(component.skin);

    expect(component.config.toolbar)
    .toEqual(component.toolbar);

    const toolbar = 'undo redo | formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table pagebreak | charmap codesample image | removeformat | help | cancel save';
    component.toolbar = toolbar;
    fixture.detectChanges();

    expect(component.config.toolbar)
      .toEqual(toolbar);

  });
});
