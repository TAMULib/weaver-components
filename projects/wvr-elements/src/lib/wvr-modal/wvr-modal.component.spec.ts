import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { APP_CONFIG, testAppConfig } from '../shared/config';
import { WvrSharedModule } from '../shared/wvr-shared.module';
import { WvrModalComponent } from './wvr-modal.component';

// TODO: should be using the store's initial state but this is not currently working.
//import { initialState } from '../core/store';

describe('WvrModalComponent', () => {
  let component: WvrModalComponent;
  let fixture: ComponentFixture<WvrModalComponent>;
  const initialState = {};

  beforeEach(waitForAsync(() => TestBed.configureTestingModule({
    imports: [WvrSharedModule],
    declarations: [WvrModalComponent],
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
    fixture = TestBed.createComponent(WvrModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it('should have `btnVisible` defined', () => {
    expect(component.btnVisible)
      .toEqual('true');
    component.btnVisible = 'false';
    fixture.detectChanges();
    expect(component.btnVisible)
      .toEqual('false');
  });

});
