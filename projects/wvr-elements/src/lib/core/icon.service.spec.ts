import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IconService } from './icon.service';
import { APP_CONFIG } from './app-config';

describe('IconService', () => {
  let service: IconService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: APP_CONFIG, useValue: {
          baseUrl: 'http://localhost:4200',
          assetUrl: 'http://localhost:4200/assets'
        }
      }]
    });
    service = TestBed.inject(IconService);
  });

  it('should be created', () => {
    expect(service)
      .toBeTruthy();
  });

});
