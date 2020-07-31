import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WvrButtonComponent } from './wvr-button.component';

describe('WvrButtonComponent', () => {
  let component: WvrButtonComponent;
  let fixture: ComponentFixture<WvrButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [WvrButtonComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it("should have as btnClass 'primary'", () => {
    expect(component.btnClass)
      .toEqual('primary');
  });

  it("should have as btnType as 'button'", () => {
    expect(component.wvrBtnType)
      .toEqual('button');
  });

});
