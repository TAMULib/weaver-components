import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WvrItWorksComponent } from './wvr-it-works.component';

describe('WvrItWorksComponent', () => {
  let component: WvrItWorksComponent;
  let fixture: ComponentFixture<WvrItWorksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [WvrItWorksComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents()
      .catch(err => { console.error(err); });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrItWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it("should have as title 'it-works-component'", () => {
    expect(component.title)
      .toEqual('it-works-component');
  });

  it("should have as text 'Weaver Components Work'", () => {
    expect(component.text)
      .toEqual('Weaver Components Work');
  });
});
