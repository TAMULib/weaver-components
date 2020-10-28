import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { MobileService } from './mobile.service';
import { metaReducers, ROOT_REDUCER } from './store';

describe('MobileService', () => {
  let service: MobileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, StoreModule.forRoot(ROOT_REDUCER, { metaReducers })]
    });
    service = TestBed.inject(MobileService);
  });

  it('should be created', () => {
    expect(service)
      .toBeTruthy();
  });
});
