import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { APP_CONFIG, testAppConfig } from '../shared/config';

import { WvrWysiwygComponent } from './wvr-wysiwyg.component';

@Component({
  selector: 'wvr-wysiwyg-test-component',
  // tslint:disable-next-line:component-max-inline-declarations
  template: `<wvr-wysiwyg-component skin="oxide-dark" initial-value="Hello, World!"></wvr-wysiwyg-component>`
})
class WvrWysiwygHostComponent {
  @ViewChild(WvrWysiwygComponent) alert: WvrWysiwygComponent;
}

describe('WvrWysiwygComponent', () => {
  const initialState = {
    wysiwygs: {
      id: [],
      entities: {}
    }
  };

  let component: WvrWysiwygComponent;
  let fixture: ComponentFixture<WvrWysiwygComponent>;

  let hostComponent: WvrWysiwygHostComponent;
  let hostFixture: ComponentFixture<WvrWysiwygHostComponent>;

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
          WvrWysiwygHostComponent,
          WvrWysiwygComponent
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(WvrWysiwygComponent);
      component = fixture.componentInstance;

      hostFixture = TestBed.createComponent(WvrWysiwygHostComponent);
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
    // base_url
    expect(component.config.base_url)
      .toEqual(component.baseUrl);
    component.baseUrl = 'tinymce';
    fixture.detectChanges();

    expect(component.config.base_url)
      .toEqual('tinymce');
    expect(component.config.menu)
    .toEqual(component.menu);

    expect(component.config.plugins)
    .toEqual(component.plugins);

    const plugins = ['preview anchor searchreplace visualblocks code',
                    'fullscreen insertdatetime media table paste', 'help wordcount print preview save'];
    component.plugins = plugins;
    fixture.detectChanges();

    expect(component.config.plugins)
      .toEqual(plugins);

    //skin
    expect(component.config.skin)
    .toEqual(component.skin);

    //toolbar
    expect(component.config.toolbar)
    .toEqual(component.toolbar);

    const toolbar = 'undo redo | formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table pagebreak | charmap codesample image | removeformat | help | cancel save';
    component.toolbar = toolbar;
    fixture.detectChanges();

    expect(component.config.toolbar)
      .toEqual(toolbar);
  });
});
