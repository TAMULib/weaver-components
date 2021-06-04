import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../core/store';
import { APP_CONFIG, testAppConfig } from '../../shared/config';
import { WvrSharedModule } from '../../shared/wvr-shared.module';
import { WvrNavLiComponent } from './wvr-nav-li.component';

describe('WvrNavLiComponent', () => {
  let component: WvrNavLiComponent;
  let fixture: ComponentFixture<WvrNavLiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        WvrSharedModule
      ],
      declarations: [WvrNavLiComponent],
      providers: [
        {
          provide: APP_CONFIG,
          useValue: testAppConfig
        },
        provideMockStore({ initialState })
      ]
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
