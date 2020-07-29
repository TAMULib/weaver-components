import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WvrListItemComponent } from './wvr-list-item.component';

describe('WvrListItemComponent', () => {
  let component: WvrListItemComponent;
  let fixture: ComponentFixture<WvrListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WvrListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
