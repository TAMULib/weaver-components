import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WvrNavLiComponent } from './wvr-nav-li.component';

describe('WvrNavLiComponent', () => {
  let component: WvrNavLiComponent;
  let fixture: ComponentFixture<WvrNavLiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WvrNavLiComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrNavLiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as href '#'`, () => {
    expect(component.href).toEqual('#');
  });
});