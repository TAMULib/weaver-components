import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { WvrItWorksComponent } from '../wvr-it-works/wvr-it-works.component';
import { WvrDataSelect } from './data-select';
import { metaReducers, ROOT_REDUCER } from './store';

import { TemplateService } from './template.service';

describe('TemplateService', () => {
  let service: TemplateService;
  let component: WvrItWorksComponent;
  let projectedContent: HTMLElement;
  let fixture: ComponentFixture<WvrItWorksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, StoreModule.forRoot(ROOT_REDUCER, { metaReducers })],
      declarations: [WvrItWorksComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    service = TestBed.inject(TemplateService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrItWorksComponent);
    component = fixture.componentInstance;
    projectedContent = document.createElement('wvr-template');
    projectedContent.innerHTML = '<!--<p>{{data.test}}</p>-->';

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
