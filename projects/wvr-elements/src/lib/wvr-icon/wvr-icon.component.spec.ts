import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WvrIconComponent } from './wvr-icon.component';

describe('WvrIconComponent', () => {
  let component: WvrIconComponent;
  let fixture: ComponentFixture<WvrIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WvrIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
