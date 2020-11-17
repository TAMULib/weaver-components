import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { metaReducers, ROOT_REDUCER } from '../core/store';
import { APP_CONFIG, testAppConfig } from '../shared/config';
import { WvrDropdownComponent } from './wvr-dropdown.component';

@Component({
  selector: 'wvr-dropdown-component',
  // tslint:disable-next-line:component-max-inline-declarations
  template: `<wvr-dropdown-component></wvr-dropdown-component>`
})
class WvrDropdownHostComponent {
  @ViewChild(WvrDropdownComponent) dropDown: WvrDropdownComponent;
}
describe('WvrDropdownComponent', () => {
  let component: WvrDropdownComponent;
  let fixture: ComponentFixture<WvrDropdownComponent>;

  let hostComponent: WvrDropdownHostComponent;
  let hostFixture: ComponentFixture<WvrDropdownHostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        StoreModule.forRoot(ROOT_REDUCER, { metaReducers })
      ],
      providers: [{
        provide: APP_CONFIG,
        useValue: testAppConfig
      }],
      declarations: [
        WvrDropdownHostComponent,
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

    hostFixture = TestBed.createComponent(WvrDropdownHostComponent);
    hostComponent = hostFixture.componentInstance;

    hostFixture.detectChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it('should have themeVariant defined', () => {
    expect(component.themeVariant)
      .toEqual('secondary');
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

});
