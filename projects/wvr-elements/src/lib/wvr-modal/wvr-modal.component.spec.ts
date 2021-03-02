import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WvrModalComponent } from './wvr-modal.component';

describe('WvrModalComponent', () => {
  let component: WvrModalComponent;
  let fixture: ComponentFixture<WvrModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WvrModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
