import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { APP_CONFIG, testAppConfig } from '../shared/config';
import { WvrButtonComponent } from './wvr-button.component';

@Component({
  selector: 'wvr-button-component',
  template:  `<wvr-button-component class="btn btn-secondary" [btnType]="'button'" [btnSize]="'small'"><wvre-text value="Button"></wvr-button-component>`
})
class WvrButtonHostComponent {
  @ViewChild(WvrButtonComponent) wvrButtonComponent: WvrButtonComponent;
}

describe('WvrButtonComponent', () => {
  const initialState = { theme: {
    themes: {}
  }};
  let component: WvrButtonComponent;
  let fixture: ComponentFixture<WvrButtonComponent>;

  let hostComponent: WvrButtonHostComponent;
  let hostFixture: ComponentFixture<WvrButtonHostComponent>;

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
        WvrButtonHostComponent,
        WvrButtonComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrButtonComponent);
    component = fixture.componentInstance;

    hostFixture = TestBed.createComponent(WvrButtonHostComponent);
    hostComponent = hostFixture.componentInstance;

    hostFixture.detectChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it("should have as themeVariant 'primary'", () => {
    expect(component.themeVariant)
      .toEqual('primary');
  });

  it("should have as themeVariant as 'button'", () => {
    expect(component.btnType)
      .toEqual('button');
  });

});
