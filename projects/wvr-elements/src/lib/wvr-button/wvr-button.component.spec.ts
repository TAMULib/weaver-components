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

});
