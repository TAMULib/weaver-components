import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItWorksComponent } from './it-works.component';

describe('ItWorksComponent', () => {
  let component: ItWorksComponent;
  let fixture: ComponentFixture<ItWorksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItWorksComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'it-works-component'`, () => {
    expect(component.title).toEqual('it-works-component');
  });

  it(`should have as text 'Weaver Components Work'`, () => {
    expect(component.text).toEqual('Weaver Components Work');
  });
});