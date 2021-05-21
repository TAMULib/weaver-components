import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../core/store';
import { APP_CONFIG, testAppConfig } from '../shared/config';
import { WvrSharedModule } from '../shared/wvr-shared.module';
import { WvrThemeComponent } from './wvr-theme.component';

describe('WvrThemeComponent', () => {
  let component: WvrThemeComponent;
  let fixture: ComponentFixture<WvrThemeComponent>;

  beforeEach(waitForAsync(() => TestBed.configureTestingModule({
    imports: [WvrSharedModule],
    declarations: [WvrThemeComponent],
    providers: [
      {
        provide: APP_CONFIG,
        useValue: testAppConfig
      },
      provideMockStore({ initialState })
    ]
  }).compileComponents()));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
