import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed , waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { metaReducers, ROOT_REDUCER } from '../store';
import { ThemeService } from './theme.service';
import { APP_CONFIG, testAppConfig } from '../../shared/config';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, StoreModule.forRoot(ROOT_REDUCER, { metaReducers })],
      providers: [{
        provide: APP_CONFIG,
        useValue: testAppConfig
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents()
      .catch(err => { console.error(err); });
    service = TestBed.inject(ThemeService);
  }));

  it('should be created', () => {
    expect(service)
      .toBeTruthy();
  });

});
