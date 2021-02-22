import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { APP_CONFIG, testAppConfig } from '../shared/config';
import { WvrModalComponent } from './wvr-modal.component';


@Component({
  selector: 'wvr-modal-host-component',
  // tslint:disable-next-line:component-max-inline-declarations
  template: `<wvr-modal-component>
            </wvr-modal-component>`
})
class WvrModalHostComponent {
  @ViewChild(WvrModalComponent) modal: WvrModalComponent;
}
describe('WvrModalComponent', () => {
  const initialState = { theme: {
    themes: {}
  }};

  let component: WvrModalComponent;
  let fixture: ComponentFixture<WvrModalComponent>;

  let hostComponent: WvrModalHostComponent;
  let hostFixture: ComponentFixture<WvrModalHostComponent>;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: APP_CONFIG,
          useValue: testAppConfig
        },
        provideMockStore({initialState})
      ],
      declarations: [
        WvrModalHostComponent,
        WvrModalComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    hostFixture = TestBed.createComponent(WvrModalHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have themeVariant defined', () => {
    expect(component.themeVariant)
      .toEqual('primary');
  });
});
