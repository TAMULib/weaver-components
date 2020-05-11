import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { WvrDropdownComponent } from './wvr-dropdown.component';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { ChangeDetectionStrategy } from '@angular/core';

describe('WvrDropdownComponent', () => {
  let component: WvrDropdownComponent;
  let fixture: ComponentFixture<WvrDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WvrDropdownComponent,
        NgbDropdown
      ]
    })
    .overrideComponent(WvrDropdownComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
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

  it('should report open status with `isOpen` method',  () => {
    expect(component.isOpen())
      .toBeFalse();
    const compElem = (fixture.elementRef.nativeElement as HTMLElement);
    compElem
      .querySelector('[ngDropdownAnchor]')
      .dispatchEvent(new MouseEvent('click'));
    expect(component.isOpen())
      .toBeTrue();
  });

  it('should return "false" from `isOpen` method if `dropdown` is undefined',  () => {
    // tslint:disable-next-line:no-string-literal
    component['dropdown'] = undefined;
    expect(component.isOpen())
      .toBeFalse();
  });

  it('should open the dropdown on mouseenter event', () => {
    component.toggleOn = 'mouseover';
    (fixture.elementRef.nativeElement as HTMLElement).dispatchEvent(new MouseEvent('mouseenter'));
    expect(component.open)
      .toBeTrue();
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
      .querySelector('[ngDropdownAnchor]')
      .dispatchEvent(new MouseEvent('click'));
    expect(component.open)
      .toBeFalse();
  });

  it('should toggle the dropdown on click event', () => {
    const compElem = (fixture.elementRef.nativeElement as HTMLElement);
    compElem
      .querySelector('[ngDropdownAnchor]')
      .dispatchEvent(new MouseEvent('click'));
    expect(component.open)
      .toBeTrue();
    compElem
      .querySelector('[ngDropdownAnchor]')
      .dispatchEvent(new MouseEvent('click'));
    expect(component.open)
      .toBeFalse();
  });

  it('should not open the dropdown on mouseenter event, if `toggleOn` is set to "click"', () => {
    const compElem = (fixture.elementRef.nativeElement as HTMLElement);
    compElem
      .dispatchEvent(new MouseEvent('mouseenter'));
    expect(component.open)
      .toBeFalse();
  });

  it('should not close the dropdown on mouseleave event, if `toggleOn` is set to "click"', () => {
    const compElem = (fixture.elementRef.nativeElement as HTMLElement);
    compElem
      .querySelector('[ngDropdownAnchor]')
      .dispatchEvent(new MouseEvent('click'));
    compElem
      .dispatchEvent(new MouseEvent('mouseleave'));
    expect(component.open)
      .toBeTrue();
  });

  it('should close the dropdown on click outside', () => {
    const compElem = (fixture.elementRef.nativeElement as HTMLElement);
    compElem
      .querySelector('[ngDropdownAnchor]')
      .dispatchEvent(new MouseEvent('click'));
    expect(component.open)
      .toBeTrue();
    document.dispatchEvent(new MouseEvent('click'));
    expect(component.open)
      .toBeFalse();
  });

  it('should not close the dropdown on click inside', () => {
    const compElem = (fixture.elementRef.nativeElement as HTMLElement);
    compElem
      .querySelector('[ngDropdownAnchor]')
      .dispatchEvent(new MouseEvent('click'));
    compElem.click();
    expect(component.open)
      .toBeTrue();
  });

});