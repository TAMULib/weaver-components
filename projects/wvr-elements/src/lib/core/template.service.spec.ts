import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { APP_CONFIG, testAppConfig } from '../shared/config';
import { WvrBaseComponent } from '../shared/wvr-base.component';
import { WvrItWorksComponent } from '../wvr-it-works/wvr-it-works.component';
import { WvrDataSelect } from './data-select';
import { metaReducers, ROOT_REDUCER } from './store';

import { TemplateService } from './template.service';

describe('TemplateService', () => {
  let service: TemplateService<WvrBaseComponent>;
  let component: WvrItWorksComponent;
  let projectedContent: HTMLElement;
  let fixture: ComponentFixture<WvrItWorksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, StoreModule.forRoot(ROOT_REDUCER, { metaReducers })],
      declarations: [WvrItWorksComponent],
      providers: [{
        provide: APP_CONFIG,
        useValue: testAppConfig
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    service = TestBed.inject(TemplateService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrItWorksComponent);
    component = fixture.componentInstance;
    projectedContent = document.createElement('template');
    projectedContent.setAttribute('wvr-compile', 'true');
    projectedContent.innerHTML = '<p>{{data.test}}</p>';

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(service)
      .toBeTruthy();
  });

  it('should compile a template', () => {
    const testData = {test: 'foo'};
    const testSelect: WvrDataSelect = {
      as: 'data',
      entry: undefined,
      manifest: undefined
    };
    const elem = fixture.elementRef.nativeElement as HTMLElement;
    elem.appendChild(projectedContent);
    service.compile(testData, testSelect, elem, projectedContent);
    expect(elem.querySelector('p').innerHTML)
      .toEqual('foo');
  });

});
