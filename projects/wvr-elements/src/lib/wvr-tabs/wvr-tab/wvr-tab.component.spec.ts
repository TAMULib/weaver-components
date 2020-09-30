import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WvrTabComponent } from './wvr-tab.component';

describe('WvrTabComponent', () => {
  let component: WvrTabComponent;
  let fixture: ComponentFixture<WvrTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WvrTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
