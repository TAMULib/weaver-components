import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { APP_CONFIG, testAppConfig } from '../shared/config';
import { WvrColorPreviewComponent } from './wvr-color-preview.component';

describe('ColorPreviewComponent', () => {
  const initialState = { theme: {
    themes: {}
  }};
  let component: WvrColorPreviewComponent;
  let fixture: ComponentFixture<WvrColorPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        LazyLoadImageModule
      ],
      providers: [
        {
          provide: APP_CONFIG,
          useValue: testAppConfig
        },
        provideMockStore({initialState})
      ],
      declarations: [ WvrColorPreviewComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrColorPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
