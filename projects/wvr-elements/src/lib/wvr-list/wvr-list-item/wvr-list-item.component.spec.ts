import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../core/store';
import { APP_CONFIG, testAppConfig } from '../../shared/config';
import { WvrSharedModule } from '../../shared/wvr-shared.module';
import { WvrListItemComponent } from './wvr-list-item.component';

describe('WvrListItemComponent', () => {
  let component: WvrListItemComponent;
  let fixture: ComponentFixture<WvrListItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [WvrSharedModule],
      declarations: [WvrListItemComponent],
      providers: [
        {
          provide: APP_CONFIG,
          useValue: testAppConfig
        },
        provideMockStore({ initialState })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
