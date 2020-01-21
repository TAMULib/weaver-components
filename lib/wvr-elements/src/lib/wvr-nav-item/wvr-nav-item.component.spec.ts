import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WvrNavItemComponent } from './wvr-nav-item.component';

describe('WvrNavItemComponent', () => {
  let component: WvrNavItemComponent;
  let fixture: ComponentFixture<WvrNavItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WvrNavItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrNavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
