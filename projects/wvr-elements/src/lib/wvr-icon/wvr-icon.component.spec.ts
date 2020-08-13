import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_CONFIG } from '../shared/config/app-config';
import { testAppConfig } from '../shared/config/test-app-config';
import { WvrIconComponent } from './wvr-icon.component';

describe('WvrIconComponent', () => {
  let component: WvrIconComponent;
  let fixture: ComponentFixture<WvrIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [WvrIconComponent],
      providers: [{
        provide: APP_CONFIG,
        useValue: testAppConfig
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', inject([HttpTestingController],
    (httpMock: HttpTestingController) => {
      expect(component)
        .toBeTruthy();
    })
  );

});
