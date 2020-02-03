import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WvrNavListComponent } from './wvr-nav-list.component';
import { Alignment } from './alignment.enum';

describe('WvrNavListComponent', () => {
  let component: WvrNavListComponent;
  let fixture: ComponentFixture<WvrNavListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WvrNavListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrNavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as aligned 'LEFT'`, () => {
    expect(component.aligned).toEqual(Alignment.LEFT);
  });

  it(`should have as vertical false`, () => {
    expect(component.vertical).toEqual(false);
  });
});