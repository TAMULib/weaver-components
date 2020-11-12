import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WvrThemeComponent } from './wvr-theme.component';

describe('WvrThemeComponent', () => {
  let component: WvrThemeComponent;
  let fixture: ComponentFixture<WvrThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WvrThemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
