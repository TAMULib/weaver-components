import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WvrColorPreviewComponent } from './wvr-color-preview.component';

describe('ColorPreviewComponent', () => {
  let component: WvrColorPreviewComponent;
  let fixture: ComponentFixture<WvrColorPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WvrColorPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrColorPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
