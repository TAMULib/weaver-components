import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { WvrDropdownComponent } from './wvr-dropdown.component';

describe('WvrDropdownComponent', () => {
  let component: WvrDropdownComponent;
  let fixture: ComponentFixture<WvrDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [
        WvrDropdownComponent,
        NgbDropdown
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it('should have btnType defined', () => {
    expect(component.btnType)
      .toEqual('plain');
  });

  it('should have toggleOn defined', () => {
    expect(component.toggleOn)
      .toEqual('click');
  });

  it('should set `_animationSpeedMili` and `_animationSpeedSeconds` when setting `menuAnimationSpeed`', () => {
    component.menuAnimationSpeed = 500;
    // tslint:disable-next-line:no-string-literal
    expect(component['_animationSpeedMili'])
      .toEqual(500);
    // tslint:disable-next-line:no-string-literal
    expect(component['_animationSpeedSeconds'])
      .toEqual('0.5s');
  });

  it('should report open status with `isOpen` method', done => {
    expect(component.isOpen())
      .toBeFalse();
    const compElem = (fixture.elementRef.nativeElement as HTMLElement);
    compElem
      .querySelector('[ngbDropdownAnchor]')
      .dispatchEvent(new MouseEvent('click'));
    setTimeout(() => {
      expect(component.isOpen())
        .toBeTrue();
      done();
    }, 251);
  });

  it('should return "false" from `isOpen` method if `dropdown` is undefined', () => {
    // tslint:disable-next-line:no-string-literal
    component.dropdown = undefined;
    expect(component.isOpen())
      .toBeFalse();
  });

  it('should open the dropdown on mouseenter event', done => {
    component.toggleOn = 'mouseover';
    (fixture.elementRef.nativeElement as HTMLElement).dispatchEvent(new MouseEvent('mouseenter'));
    setTimeout(() => {
      expect(component.open)
        .toBeTrue();
      done();
    }, 251);
  });

  it('should close the dropdown on mouseleave event', () => {
    component.toggleOn = 'mouseover';
    (fixture.elementRef.nativeElement as HTMLElement).dispatchEvent(new MouseEvent('mouseleave'));
    expect(component.open)
      .toBeFalse();
  });

  it('should not open/close the dropdown on click event, if `toggleOn` is set to "mouseover"', () => {
    component.toggleOn = 'mouseover';
    const compElem = (fixture.elementRef.nativeElement as HTMLElement);
    compElem
      .querySelector('[ngbDropdownAnchor]')
      .dispatchEvent(new MouseEvent('click'));
    expect(component.open)
      .toBeFalse();
  });

  it('should toggle the dropdown on click event', done => {
    const compElem = (fixture.elementRef.nativeElement as HTMLElement);
    compElem
      .querySelector('[ngbDropdownAnchor]')
      .dispatchEvent(new MouseEvent('click'));
    setTimeout(() => {
      expect(component.open)
        .toBeTrue();
      compElem
        .querySelector('[ngbDropdownAnchor]')
        .dispatchEvent(new MouseEvent('click'));
      setTimeout(() => {
        expect(component.open)
          .toBeFalse();
        done();
      }, 251);
    }, 251);
  });

  it('should not open the dropdown on mouseenter event, if `toggleOn` is set to "click"', done => {
    const compElem = (fixture.elementRef.nativeElement as HTMLElement);
    compElem
      .dispatchEvent(new MouseEvent('mouseenter'));
    setTimeout(() => {
      expect(component.open)
        .toBeFalse();
      done();
    }, 251);
  });

  it('should not close the dropdown on mouseleave event, if `toggleOn` is set to "click"', done => {
    const compElem = (fixture.elementRef.nativeElement as HTMLElement);
    compElem
      .querySelector('[ngbDropdownAnchor]')
      .dispatchEvent(new MouseEvent('click'));
    compElem
      .dispatchEvent(new MouseEvent('mouseleave'));
    setTimeout(() => {
      expect(component.open)
        .toBeTrue();
      done();
    }, 251);
  });

  it('should close the dropdown on click outside', done => {
    const compElem = (fixture.elementRef.nativeElement as HTMLElement);
    compElem
      .querySelector('[ngbDropdownAnchor]')
      .dispatchEvent(new MouseEvent('click'));
    setTimeout(() => {
      expect(component.open)
        .toBeTrue();
      document.dispatchEvent(new MouseEvent('click'));
      setTimeout(() => {
        expect(component.open)
          .toBeFalse();
        done();
      }, 251);
    }, 251);
  });

  it('should not close the dropdown on click inside', done => {
    const compElem = (fixture.elementRef.nativeElement as HTMLElement);
    compElem
      .querySelector('[ngbDropdownAnchor]')
      .dispatchEvent(new MouseEvent('click'));
    compElem.click();
    setTimeout(() => {
      expect(component.open)
        .toBeTrue();
      done();
    }, 251);
  });

  it('should have customization for button background', () => {
    expect(component.btnBackground)
      .toEqual('var(--wvre-btn-plain-background-default)');
    component.btnBackground = 'var(--wvre-dropdown-menu-background)';
    fixture.detectChanges();
    expect(component.btnBackground)
      .toEqual('var(--wvre-dropdown-menu-background)');
  });

  it('should have customization for active button color', () => {
    expect(component.btnBackgroundActive)
      .toEqual('var(--wvre-btn-plain-active-background-default)');
    component.btnBackgroundActive = 'var(--wvre-btn-warning-active-background-default)';
    fixture.detectChanges();
    expect(component.btnBackgroundActive)
      .toEqual('var(--wvre-btn-warning-active-background-default)');

  });

  it('should have customization for hover button color', () => {
    expect(component.btnBackgroundHover)
      .toEqual('var(--wvre-btn-plain-hover-background-default)');
    component.btnBackgroundHover = 'var(--wvre-btn-warning-hover-background-default)';
    fixture.detectChanges();
    expect(component.btnBackgroundHover)
      .toEqual('var(--wvre-btn-warning-hover-background-default)');

  });

  it('should have customization for button border value', () => {
    expect(component.btnBorderColor)
      .toEqual('var(--wvre-btn-plain-border-default)');
    component.btnBorderColor = 'var(--wvre-btn-primary-border-default)';
    fixture.detectChanges();
    expect(component.btnBorderColor)
      .toEqual('var(--wvre-btn-primary-border-default)');

  });

  it('should have customization for button border value in active state', () => {
    expect(component.btnBorderActive)
      .toEqual('var(--wvre-btn-plain-active-border-default)');
    component.btnBorderActive = 'var(--wvre-btn-primary-active-border-default)';
    fixture.detectChanges();
    expect(component.btnBorderActive)
      .toEqual('var(--wvre-btn-primary-active-border-default)');

  });

  it('should have customization for button border value in focus state', () => {
    expect(component.btnBorderFocus)
      .toEqual('var(--wvre-btn-plain-focus-border-default)');
    component.btnBorderFocus = 'var(--wvre-btn-primary-focus-border-default)';
    fixture.detectChanges();
    expect(component.btnBorderFocus)
      .toEqual('var(--wvre-btn-primary-focus-border-default)');

  });

  it('should have customization for button border value in hover state', () => {
    expect(component.btnBorderHover)
      .toEqual('var(--wvre-btn-plain-hover-border-default)');
    component.btnBorderHover = 'var(--wvre-btn-primary-hover-border-default)';
    fixture.detectChanges();
    expect(component.btnBorderHover)
      .toEqual('var(--wvre-btn-primary-hover-border-default)');

  });

  it('should have customization for button color in default state', () => {
    expect(component.btnColor)
      .toEqual('var(--wvre-btn-plain-color-default)');
    component.btnColor = 'var(--wvre-btn-primary-color-default)';
    fixture.detectChanges();
    expect(component.btnColor)
      .toEqual('var(--wvre-btn-primary-color-default)');

  });

  it('should have customization for button color in active state', () => {
    expect(component.btnColorActive)
      .toEqual('var(--wvre-btn-plain-active-color-default)');
    component.btnColorActive = 'var(--wvre-btn-primary-active-color-default)';
    fixture.detectChanges();
    expect(component.btnColorActive)
      .toEqual('var(--wvre-btn-primary-active-color-default)');

  });

  it('should have customization for button color in hover state', () => {
    expect(component.btnColorHover)
      .toEqual('var(--wvre-btn-plain-hover-color-default)');
    component.btnColorHover = 'var(--wvre-btn-primary-hover-color-default)';
    fixture.detectChanges();
    expect(component.btnColorHover)
      .toEqual('var(--wvre-btn-primary-hover-color-default)');

  });

  it('should have customization for button border radius', () => {
    expect(component.btnBorderRadius)
      .toEqual('var(--wvre-btn-border-radius)');
    component.btnBorderRadius = '12px';
    fixture.detectChanges();
    expect(component.btnBorderRadius)
      .toEqual('12px');
  });

  it('should have customization for button border radius', () => {
    expect(component.btnBoxShadowFocus)
      .toEqual('var(--wvre-btn-plain-focus-box-shadow-default)');
    component.btnBoxShadowFocus = 'var(--wvre-btn-primary-focus-box-shadow-default)';
    fixture.detectChanges();
    expect(component.btnBoxShadowFocus)
      .toEqual('var(--wvre-btn-primary-focus-box-shadow-default)');
  });

  it('should have customization for button cursor', () => {
    expect(component.btnCursor)
      .toEqual('var(--wvre-btn-cursor-default)');
    component.btnCursor = 'pointer';
    fixture.detectChanges();
    expect(component.btnCursor)
      .toEqual('pointer');
  });

  it('should have customization for button font family', () => {
    expect(component.btnFontFamily)
      .toEqual('var(--wvre-btn-font-family-sans-serif-default)');
    component.btnFontFamily = 'var(--wvre-font-family-sans-serif)';
    fixture.detectChanges();
    expect(component.btnFontFamily)
      .toEqual('var(--wvre-font-family-sans-serif)');
  });

  it('should have customization for button font size', () => {
    expect(component.btnFontSize)
      .toEqual('var(--wvre-btn-font-size-default)');
    component.btnFontSize = 'var(--wvre-btn-font-size)';
    fixture.detectChanges();
    expect(component.btnFontSize)
      .toEqual('var(--wvre-btn-font-size)');
  });

  it('should have customization for button font weight', () => {
    expect(component.btnFontWeight)
      .toEqual('var(--wvre-btn-font-weight-default)');
    component.btnFontWeight = 'var(--wvre-btn-font-weight)';
    fixture.detectChanges();
    expect(component.btnFontWeight)
      .toEqual('var(--wvre-btn-font-weight)');
  });

  it('should have customization for button line height', () => {
    expect(component.btnLineHeight)
      .toEqual('var(--wvre-btn-line-height-default)');
    component.btnLineHeight = 'var(--wvre-btn-line-height)';
    fixture.detectChanges();
    expect(component.btnLineHeight)
      .toEqual('var(--wvre-btn-line-height)');
  });

  it('should have customization for button padding rule', () => {
    expect(component.btnPadding)
      .toEqual('var(--wvre-btn-padding-default)');
    component.btnPadding = 'var(--wvre-btn-padding)';
    fixture.detectChanges();
    expect(component.btnPadding)
      .toEqual('var(--wvre-btn-padding)');
  });

  it('should have customization for button text align rule', () => {
    expect(component.btnTextAlign)
      .toEqual('var(--wvre-btn-text-align-default)');
    component.btnTextAlign = 'var(--wvre-btn-text-align)';
    fixture.detectChanges();
    expect(component.btnTextAlign)
      .toEqual('var(--wvre-btn-text-align)');
  });

  it('should have customization for button vertical align', () => {
    expect(component.btnVerticalAlign)
      .toEqual('var(--wvre-btn-vertical-align-default)');
    component.btnVerticalAlign = 'var(--wvre-btn-vertical-align)';
    fixture.detectChanges();
    expect(component.btnVerticalAlign)
      .toEqual('var(--wvre-btn-vertical-align)');
  });

  it('should have customization for button text decoration', () => {
    expect(component.btnTextDecoration)
      .toEqual('var(--wvre-btn-plain-text-decoration-default)');
    component.btnTextDecoration = 'var(--wvre-btn-primary-text-decoration)';
    fixture.detectChanges();
    expect(component.btnTextDecoration)
      .toEqual('var(--wvre-btn-primary-text-decoration)');
  });

  it('should have customization for button text decoration in active state', () => {
    expect(component.btnTextDecorationActive)
      .toEqual('var(--wvre-btn-plain-active-text-decoration-default)');
    component.btnTextDecorationActive = 'var(--wvre-btn-primary-active-text-decoration)';
    fixture.detectChanges();
    expect(component.btnTextDecorationActive)
      .toEqual('var(--wvre-btn-primary-active-text-decoration)');
  });

  it('should have customization for button text decoration in focus state', () => {
    expect(component.btnTextDecorationFocus)
      .toEqual('var(--wvre-btn-plain-focus-text-decoration-default)');
    component.btnTextDecorationFocus = 'var(--wvre-btn-primary-focus-text-decoration)';
    fixture.detectChanges();
    expect(component.btnTextDecorationFocus)
      .toEqual('var(--wvre-btn-primary-focus-text-decoration)');
  });

  it('should have customization for button text decoration in focus state', () => {
    expect(component.btnTextDecorationHover)
      .toEqual('var(--wvre-btn-plain-hover-text-decoration-default)');
    component.btnTextDecorationHover = 'var(--wvre-btn-primary-hover-text-decoration)';
    fixture.detectChanges();
    expect(component.btnTextDecorationHover)
      .toEqual('var(--wvre-btn-primary-hover-text-decoration)');
  });

});
