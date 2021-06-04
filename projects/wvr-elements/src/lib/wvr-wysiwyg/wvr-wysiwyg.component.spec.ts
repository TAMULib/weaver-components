import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { APP_CONFIG, testAppConfig } from '../shared/config';
import { WvrSharedModule } from '../shared/wvr-shared.module';
import { WvrWysiwygComponent } from './wvr-wysiwyg.component';

// TODO: should be using the store's initial state but this is not currently working.
//import { initialState } from '../core/store';

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

  // tslint:disable-next-line: deprecation
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        WvrSharedModule
      ],
      declarations: [
        WvrWysiwygComponent,
        WvrWysiwygHostComponent
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

  it('should be able to set `baseUrl` ', () => {
    expect(component.baseUrl)
      // tslint:disable-next-line:no-string-literal
      .toEqual(`${component['appConfig'].assetsUrl}/tinymce`);
  });

  it('should be able to set skin', () => {
    expect(component.skin)
      .toEqual('oxide');
    component.skin = 'oxide-dark';
    fixture.detectChanges();
    expect(component.skin)
      .toEqual('oxide-dark');
  });

  it('should be able to set `menu`', () => {

    const editorMenu =
    {
      file: {
        title: 'File',
        items: 'newdocument | preview | print'
      },
      edit: {
        title: 'Edit',
        items: 'undo redo | cut copy paste | selectall | searchreplace'
      },
      view: {
        title: 'View',
        items: 'code | visualaid visualchars visualblocks | preview fullscreen'
      },
      insert: {
        title: 'Insert',
        items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime'
      },
      format: {
        title: 'Format',
        items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align lineheight | forecolor backcolor | removeformat'
      },
      tools: {
        title: 'Tools',
        items: 'code wordcount | cancel save'
      },
      table: {
        title: 'Table',
        items: 'inserttable | cell row column | tableprops deletetable'
      }
    };

    Object.keys(editorMenu).forEach(editorMenuKey => {
      Object.keys(component.menu).forEach(menuKey => {
        if (editorMenuKey === menuKey) {
          expect(JSON.stringify(editorMenu[editorMenuKey]) === JSON.stringify(component.menu[menuKey]))
            .toBe(true);
        }
      });
    });

  });
});
