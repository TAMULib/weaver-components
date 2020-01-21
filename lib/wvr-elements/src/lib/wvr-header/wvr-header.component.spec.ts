import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WvrHeaderComponent } from './wvr-header.component';

describe('WvrHeaderComponent', () => {
  let component: WvrHeaderComponent;
  let fixture: ComponentFixture<WvrHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WvrHeaderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
