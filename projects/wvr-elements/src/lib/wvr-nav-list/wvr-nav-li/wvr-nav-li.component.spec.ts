import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { APP_CONFIG, testAppConfig } from '../../shared/config';
import { WvrNavLiComponent } from './wvr-nav-li.component';

describe('WvrNavLiComponent', () => {
  const initialState = { theme: {
    themes: {}
  }};
  let component: WvrNavLiComponent;
  let fixture: ComponentFixture<WvrNavLiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        LazyLoadImageModule
      ],
      declarations: [WvrNavLiComponent],
      providers: [
        {
          provide: APP_CONFIG,
          useValue: testAppConfig
        },
        provideMockStore({initialState})
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents()
      .catch(err => { console.error(err); });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrNavLiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

});
