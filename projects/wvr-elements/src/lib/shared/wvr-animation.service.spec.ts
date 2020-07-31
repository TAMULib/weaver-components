import { TestBed } from '@angular/core/testing';

import { WvrAnimationService } from './wvr-animation.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('WvrAnimationService', () => {
  let service: WvrAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule]
    });
    service = TestBed.inject(WvrAnimationService);
  });

  it('should be created', () => {
    expect(service)
      .toBeTruthy();
  });
});
