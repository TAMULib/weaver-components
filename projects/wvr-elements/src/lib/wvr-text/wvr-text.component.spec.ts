import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WvrTextComponent } from './wvr-text.component';

describe('WvrTextComponent', () => {
  let component: WvrTextComponent;
  let fixture: ComponentFixture<WvrTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WvrTextComponent]
    })
      .compileComponents()
      .catch(err => { console.error(err); });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
