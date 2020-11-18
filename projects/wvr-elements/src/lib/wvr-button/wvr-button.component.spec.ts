import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { APP_CONFIG, testAppConfig } from '../shared/config';
import { WvrButtonComponent } from './wvr-button.component';

@Component({
  selector: 'wvr-button-host-component',
  // tslint:disable-next-line: component-max-inline-declarations
  template:  `<wvr-button-component [themeVariant]="'primary'" [btnType]="button" [btnSize]="small" [background]="'magenta'"
                [backgroundActive]="yellow" [backgroundHover]="green" [borderColor]="'black'" [borderActive]="'black'"
                [borderHover]="'red'" [borderFocus]="'black'" [boxShadowFocus]="teal">
              </wvr-button-component>
              `})
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

  it('should set background', () => {
    const elem = component._eRef.nativeElement;
    component.applyThemeOverride('--primary-button-bg', 'magenta');
    expect(component.themeOverrides[elem.style[0]])
    .toEqual(elem.style.getPropertyValue('--primary-button-bg'));
    hostComponent.wvrButtonComponent.applyThemeOverride('--primary-button-bg', 'yellow');
    expect(hostComponent.wvrButtonComponent.themeOverrides[hostComponent.wvrButtonComponent._eRef.nativeElement.style[0]])
    .toEqual('yellow');
  });

  it('should set active background', () => {
    const elem = component._eRef.nativeElement;
    component.applyThemeOverride('--primary-button-active-bg', 'yellow');
    expect(component.themeOverrides[elem.style[0]])
    .toEqual(elem.style.getPropertyValue('--primary-button-active-bg'));
  });

  it('should set hover background', () => {
    const elem = component._eRef.nativeElement;
    component.applyThemeOverride('--primary-button-hover-bg', 'green');
    expect(component.themeOverrides[elem.style[0]])
    .toEqual(elem.style.getPropertyValue('--primary-button-hover-bg'));
  });

  it('should set border color', () => {
    const elem = component._eRef.nativeElement;
    component.applyThemeOverride('--primary-button-border', 'black');
    expect(component.themeOverrides[elem.style[0]])
    .toEqual(elem.style.getPropertyValue('--primary-button-border'));
  });

  it('should set border color in active state', () => {
    const elem = component._eRef.nativeElement;
    component.applyThemeOverride('--primary-button-active-border', 'black');
    expect(component.themeOverrides[elem.style[0]])
    .toEqual(elem.style.getPropertyValue('--primary-button-active-border'));
  });

  it('should set button border color in hover state', () => {
    const elem = component._eRef.nativeElement;
    component.applyThemeOverride('--primary-button-hover-border', 'red');
    expect(component.themeOverrides[elem.style[0]])
    .toEqual(elem.style.getPropertyValue('--primary-button-hover-border'));
  });

  it('should set button border in focus state', () => {
    const elem = component._eRef.nativeElement;
    component.applyThemeOverride('--primary-button-focus-border', 'black');
    expect(component.themeOverrides[elem.style[0]])
    .toEqual(elem.style.getPropertyValue('--primary-button-focus-border'));
  });

  it('should set box shadow color in focus state', () => {
    const elem = component._eRef.nativeElement;
    component.applyThemeOverride('--primary-button-focus-box-shadow', 'teal');
    expect(component.themeOverrides[elem.style[0]])
    .toEqual(elem.style.getPropertyValue('--primary-button-focus-box-shadow'));
  });

  it('should set button color', () => {
    const elem = component._eRef.nativeElement;
    component.applyThemeOverride('--primary-button-color', 'green');
    expect(component.themeOverrides[elem.style[0]])
    .toEqual(elem.style.getPropertyValue('--primary-button-color'));
  });

  it('should set button color in active state', () => {
    const elem = component._eRef.nativeElement;
    component.applyThemeOverride('--primary-button-active-color', 'yellow');
    expect(component.themeOverrides[elem.style[0]])
    .toEqual(elem.style.getPropertyValue('--primary-button-active-color'));
  });

  it('should set button color in hover state', () => {
    const elem = component._eRef.nativeElement;
    component.applyThemeOverride('--primary-button-hover-color', 'yellow');
    expect(component.themeOverrides[elem.style[0]])
    .toEqual(elem.style.getPropertyValue('--primary-button-hover-color'));
  });

});
