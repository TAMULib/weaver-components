import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WvrNavLiComponent } from './wvr-nav-li.component';

describe('WvrNavLiComponent', () => {
  let component: WvrNavLiComponent;
  let fixture: ComponentFixture<WvrNavLiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WvrNavLiComponent]
    })
      .compileComponents()
      .catch(err => { console.error(err); });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrNavLiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

});