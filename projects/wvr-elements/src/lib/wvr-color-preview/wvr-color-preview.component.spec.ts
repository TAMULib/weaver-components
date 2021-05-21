import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../core/store';
import { APP_CONFIG, testAppConfig } from '../shared/config';
import { WvrSharedModule } from '../shared/wvr-shared.module';
import { WvrColorPreviewComponent } from './wvr-color-preview.component';

describe('ColorPreviewComponent', () => {
  let component: WvrColorPreviewComponent;
  let fixture: ComponentFixture<WvrColorPreviewComponent>;

  beforeEach(waitForAsync(() => TestBed.configureTestingModule({
    imports: [WvrSharedModule],
    providers: [
      {
        provide: APP_CONFIG,
        useValue: testAppConfig
      },
      provideMockStore({ initialState })
    ],
    declarations: [WvrColorPreviewComponent]
  }).compileComponents()));

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
