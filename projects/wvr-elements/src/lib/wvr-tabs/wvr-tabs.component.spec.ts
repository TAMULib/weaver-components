import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WvrTabsComponent } from './wvr-tabs.component';

describe('WvrTabsComponent', () => {
  let component: WvrTabsComponent;
  let fixture: ComponentFixture<WvrTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WvrTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
