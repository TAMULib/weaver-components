import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { metaReducers, ROOT_REDUCER } from '../core/store';
import { WvrAlertComponent } from './wvr-alert.component';

describe('WvrAlertComponent', () => {
  let component: WvrAlertComponent;
  let fixture: ComponentFixture<WvrAlertComponent>;

  // tslint:disable-next-line: deprecation
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, StoreModule.forRoot(ROOT_REDUCER, { metaReducers })],
      declarations: [WvrAlertComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });

  it("should have as alert Class as 'primary'", () => {
    expect(component.alertClass)
      .toEqual('primary');
  });

  it("should have as alert type as 'basic'", () => {
    expect(component.alertType)
      .toEqual('basic');
  });

  it('should close when close button is clicked', () => {
    component.alertType = 'custom';
    fixture.detectChanges();
    const alertElem = fixture.elementRef.nativeElement as HTMLElement;
    // tslint:disable-next-line: no-unnecessary-type-assertion
    const closeButton = alertElem.querySelector('button.close') as HTMLElement;
    expect(component.alertClosed)
      .toBeFalse();
    closeButton.dispatchEvent(new MouseEvent('click'));
    expect(component.alertClosed)
    .toBeTrue();
  });
});
