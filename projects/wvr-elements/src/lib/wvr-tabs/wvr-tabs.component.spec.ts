import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../core/store';
import { APP_CONFIG, testAppConfig } from '../shared/config';
import { WvrSharedModule } from '../shared/wvr-shared.module';
import { WvrTabsComponent } from './wvr-tabs.component';

describe('WvrTabsComponent', () => {
  let component: WvrTabsComponent;
  let fixture: ComponentFixture<WvrTabsComponent>;

  beforeEach(waitForAsync(() => TestBed.configureTestingModule({
    imports: [
      BrowserAnimationsModule,
      WvrSharedModule
    ],
    declarations: [WvrTabsComponent],
    providers: [
      {
        provide: APP_CONFIG,
        useValue: testAppConfig
      },
      provideMockStore({ initialState })
    ]
  })
    .compileComponents()));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  // it('should have unique tab content id', () => {
    
  // });

  // it('should have an active tab content', () => {
    
  // });

  // it('should have an option to add tab', () => {
    
  // });

});
