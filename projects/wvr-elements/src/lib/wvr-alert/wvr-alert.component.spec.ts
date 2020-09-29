import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WvrAlertComponent } from './wvr-alert.component';

describe('WvrAlertComponent', () => {
  let component: WvrAlertComponent;
  let fixture: ComponentFixture<WvrAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WvrAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
