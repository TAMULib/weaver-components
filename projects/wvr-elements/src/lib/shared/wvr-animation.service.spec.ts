import { TestBed } from '@angular/core/testing';

import { WvrAnimationService } from './wvr-animation.service';

describe('WvrAnimationService', () => {
  let service: WvrAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WvrAnimationService);
  });

  it('should be created', () => {
    expect(service)
      .toBeTruthy();
  });
});
