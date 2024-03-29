import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { select } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { filter } from 'rxjs/operators';
import { actions } from '../core/actions';
import { selectThemeState } from '../core/store';
import { APP_CONFIG, testAppConfig } from '../shared/config';
import { WvrSharedModule } from '../shared/wvr-shared.module';
import { WvrButtonComponent } from './wvr-button.component';

// TODO: should be using the store's initial state but this is not currently working.
//import { initialState } from '../core/store';

@Component({
  selector: 'wvr-button-host-component',
  // tslint:disable-next-line: component-max-inline-declarations
  template: `
    <wvr-button-component
      [themeVariant]="'primary'"
      [btnType]="button"
      [btnSize]="small"
      [background]="'magenta'"
      [backgroundActive]="yellow"
      [backgroundHover]="green"
      [borderColor]="'black'"
      [borderActive]="'black'"
      [borderHover]="'red'"
      [borderFocus]="'black'"
      [boxShadowFocus]="teal"
      [color]="green"
      [colorActive]="yellow"
      [colorHover]="brown">
    </wvr-button-component>`
})
class WvrButtonHostComponent {
  @ViewChild(WvrButtonComponent) wvrButtonComponent: WvrButtonComponent;
}

describe('WvrButtonComponent', () => {
  const initialState = {
    theme: {
      themes: {}
    }
  };
  let component: WvrButtonComponent;
  let fixture: ComponentFixture<WvrButtonComponent>;

  let hostComponent: WvrButtonHostComponent;
  let hostFixture: ComponentFixture<WvrButtonHostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        WvrSharedModule
      ],
      declarations: [
        WvrButtonComponent,
        WvrButtonHostComponent
      ],
      providers: [
        {
          provide: APP_CONFIG,
          useValue: testAppConfig
        },
        provideMockStore({ initialState })
      ]
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
    const elem = component.eRef.nativeElement;
    component.applyThemeOverride('--primary-button-bg', 'magenta');
    expect(component.themeOverrides[elem.style[0]])
      .toEqual(elem.style.getPropertyValue('--primary-button-bg'));
    hostComponent.wvrButtonComponent.applyThemeOverride('--primary-button-bg', 'yellow');
    expect(hostComponent.wvrButtonComponent.themeOverrides[hostComponent.wvrButtonComponent.eRef.nativeElement.style[0]])
      .toEqual('yellow');
  });

  it('should set active background', () => {
    const elem = component.eRef.nativeElement;
    component.applyThemeOverride('--primary-button-active-bg', 'yellow');
    expect(component.themeOverrides[elem.style[0]])
      .toEqual(elem.style.getPropertyValue('--primary-button-active-bg'));
  });

  it('should set hover background', () => {
    const elem = component.eRef.nativeElement;
    component.applyThemeOverride('--primary-button-hover-bg', 'green');
    expect(component.themeOverrides[elem.style[0]])
      .toEqual(elem.style.getPropertyValue('--primary-button-hover-bg'));
  });

  it('should set border color', () => {
    const elem = component.eRef.nativeElement;
    component.applyThemeOverride('--primary-button-border', 'black');
    expect(component.themeOverrides[elem.style[0]])
      .toEqual(elem.style.getPropertyValue('--primary-button-border'));
  });

  it('should set border color in active state', () => {
    const elem = component.eRef.nativeElement;
    component.applyThemeOverride('--primary-button-active-border', 'black');
    expect(component.themeOverrides[elem.style[0]])
      .toEqual(elem.style.getPropertyValue('--primary-button-active-border'));
  });

  it('should set button border color in hover state', () => {
    const elem = component.eRef.nativeElement;
    component.applyThemeOverride('--primary-button-hover-border', 'red');
    expect(component.themeOverrides[elem.style[0]])
      .toEqual(elem.style.getPropertyValue('--primary-button-hover-border'));
  });

  it('should set button border in focus state', () => {
    const elem = component.eRef.nativeElement;
    component.applyThemeOverride('--primary-button-focus-border', 'black');
    expect(component.themeOverrides[elem.style[0]])
      .toEqual(elem.style.getPropertyValue('--primary-button-focus-border'));
  });

  it('should set box shadow color in focus state', () => {
    const elem = component.eRef.nativeElement;
    component.applyThemeOverride('--primary-button-focus-box-shadow', 'teal');
    expect(component.themeOverrides[elem.style[0]])
      .toEqual(elem.style.getPropertyValue('--primary-button-focus-box-shadow'));
  });

  it('should set button color', () => {
    const elem = component.eRef.nativeElement;
    component.applyThemeOverride('--primary-button-color', 'green');
    expect(component.themeOverrides[elem.style[0]])
      .toEqual(elem.style.getPropertyValue('--primary-button-color'));
    hostComponent.wvrButtonComponent.applyThemeOverride('--primary-button-color', 'yellow');
    expect(hostComponent.wvrButtonComponent.themeOverrides[hostComponent.wvrButtonComponent.eRef.nativeElement.style[0]])
      .toEqual('magenta');
  });

  it('should set button color in active state', () => {
    const elem = component.eRef.nativeElement;
    component.applyThemeOverride('--primary-button-active-color', 'yellow');
    expect(component.themeOverrides[elem.style[0]])
      .toEqual(elem.style.getPropertyValue('--primary-button-active-color'));
    hostComponent.wvrButtonComponent.applyThemeOverride('--primary-button-active-color', 'green');
    expect(hostComponent.wvrButtonComponent.themeOverrides[hostComponent.wvrButtonComponent.eRef.nativeElement.style[0]])
      .toEqual('magenta');
  });

  it('should set button color in hover state', () => {
    const elem = component.eRef.nativeElement;
    component.applyThemeOverride('--primary-button-hover-color', 'yellow');
    expect(component.themeOverrides[elem.style[0]])
      .toEqual(elem.style.getPropertyValue('--primary-button-hover-color'));
  });

  it('should set distpatch-action', () => {
    component.dispatchAction = 'Theme.select';
    // tslint:disable-next-line:no-string-literal
    expect(component['_action'])
      .toEqual(actions.Theme.select);
  });

  it('should set distpatch-action only when in proper form', () => {
    const dispatchActionValue = 'Theme.Select';
    component.dispatchAction = dispatchActionValue;
    // tslint:disable-next-line:no-string-literal
    expect(component['_action'])
      .toBeUndefined();
  });

  it('should set distpatch-action only when action exists', () => {
    const dispatchActionValue = 'Foo.select';
    component.dispatchAction = dispatchActionValue;
    // tslint:disable-next-line:no-string-literal
    expect(component['_action'])
      .toBeUndefined();
  });

  it('should set distpatch-action only when name exists', () => {
    const dispatchActionValue = 'Theme.foo';
    component.dispatchAction = dispatchActionValue;
    // tslint:disable-next-line:no-string-literal
    expect(component['_action'])
      .toBeUndefined();
  });

  it('should return undefined for distpatch-action', () => {
    component.dispatchAction = 'Theme.select';
    expect(component.dispatchAction)
      .toBeUndefined();
  });

  it('should set distpatch-action-props', () => {
    component.dispatchActionProps = '{name: "dark"}';
    // tslint:disable-next-line:no-string-literal
    expect(component['_actionProps'])
      .toBeDefined();
  });

  it('should return undefined for distpatch-action-props', () => {
    component.dispatchActionProps = '{name: "dark"}';
    // tslint:disable-next-line:no-string-literal
    expect(component.dispatchActionProps)
      .toBeUndefined();
  });

  it('should set distpatch-actions', () => {
    const actionsInput = `[
      {action: 'Theme.select', props: {name: 'dark'}}
    ]`;
    component.dispatchActions = actionsInput;
    // tslint:disable-next-line:no-string-literal
    expect(component.dispatchActions)
      .toBeUndefined();
  });

  it('should emit event on click', () => {

    const EVENT_NAME = 'MyEvent';
    component.emitEvent = EVENT_NAME;

    (component.eRef.nativeElement as HTMLElement).addEventListener(EVENT_NAME, e => {
      expect(e.type)
        .toEqual(EVENT_NAME);
    });

    component.eRef.nativeElement.click();

    expect(component)
      .toBeDefined();
  });

  it('should dispatch an action on click', () => {

    component.dispatchAction = 'Theme.select';
    const actionsInput = `[
      {action: 'Theme.select', props: {name: 'dark'}}
    ]`;

    component.store.pipe(
      select(selectThemeState),
      filter(themeState => !!themeState)
    )
      .subscribe(themeState => {
        expect(themeState)
          .toBeDefined();
      });

    component.eRef.nativeElement.click();

  });

});
