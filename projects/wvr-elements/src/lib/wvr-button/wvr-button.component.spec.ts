import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WvrButtonComponent } from './wvr-button.component';

describe('WvrButtonComponent', () => {
  let component: WvrButtonComponent;
  let fixture: ComponentFixture<WvrButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WvrButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have as btnClass 'primary'", () => {
    expect(component.btnClass)
      .toEqual('primary');
  });

  it("should have as btnSize 'large'", () => {
    expect(component.btnSize)
      .toEqual('large');
  });

  it("should have as btnType as 'button'", () => {
    expect(component.wvrBtnType)
      .toEqual('button');
  });

  it("should have background as 'var(--wvr-btn-primary-background)'", () => {
    expect(component.background)
      .toEqual('var(--wvr-btn-primary-background)');
  });

  it("should have active background as 'var(--wvr-btn-primary-active-background)'", () => {
    expect(component.backgroundActive)
      .toEqual('var(--wvr-btn-primary-active-background)');
  });

  it("should have hover background as 'var(--wvr-btn-primary-hover-background)'", () => {
    expect(component.backgroundHover)
      .toEqual('var(--wvr-btn-primary-hover-background)');
  });

  it("should have as borderColor as 'var(--wvr-btn-primary-border)'", () => {
    expect(component.borderColor)
      .toEqual('var(--wvr-btn-primary-border)');
  });

  it("should have as active borderColor as 'var(--wvr-btn-primary-active-border)'", () => {
    expect(component.borderActive)
      .toEqual('var(--wvr-btn-primary-active-border)');
  });

  it("should have as hover borderColor as 'var(--wvr-btn-primary-hover-border)'", () => {
    expect(component.borderHover)
      .toEqual('var(--wvr-btn-primary-hover-border)');
  });

  it("should have as color as 'var(--wvr-btn-primary-color)'", () => {
    expect(component.color)
      .toEqual('var(--wvr-btn-primary-color)');
  });

  it("should have as active color as 'var(--wvr-btn-primary-active-color)'", () => {
    expect(component.colorActive)
      .toEqual('var(--wvr-btn-primary-active-color)');
  });

  it("should have as hover color as 'var(--wvr-btn-primary-hover-color)'", () => {
    expect(component.colorHover)
      .toEqual('var(--wvr-btn-primary-hover-color)');
  });

});
