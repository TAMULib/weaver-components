import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WvrItWorksComponent } from './wvr-it-works.component';

describe('WvrItWorksComponent', () => {
  let component: WvrItWorksComponent;
  let fixture: ComponentFixture<WvrItWorksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WvrItWorksComponent]
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