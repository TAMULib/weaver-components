import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WvrFooterComponent } from './wvr-footer.component';

describe('WvrFooterComponent', () => {
  let component: WvrFooterComponent;
  let fixture: ComponentFixture<WvrFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WvrFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
