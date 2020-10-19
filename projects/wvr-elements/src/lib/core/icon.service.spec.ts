import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { APP_CONFIG } from '../shared/config/app-config';
import { testAppConfig } from '../shared/config/test-app-config';
import { IconService } from './icon.service';
import { metaReducers, ROOT_REDUCER } from './store';

describe('IconService', () => {
  let service: IconService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot(ROOT_REDUCER, { metaReducers })],
      providers: [{
        provide: APP_CONFIG,
        useValue: testAppConfig
      }]
    });
    service = TestBed.inject(IconService);
  });

  it('should be created', () => {
    expect(service)
      .toBeTruthy();
  });

});
