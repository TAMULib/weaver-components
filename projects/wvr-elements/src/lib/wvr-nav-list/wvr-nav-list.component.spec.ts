import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Alignment } from '../shared/alignment.enum';
import { WvrNavListComponent } from './wvr-nav-list.component';

describe('WvrNavListComponent', () => {
  let component: WvrNavListComponent;
  let fixture: ComponentFixture<WvrNavListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WvrNavListComponent]
    })
      .compileComponents()
      .catch(err => { console.error(err); });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrNavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it("should have as aligned 'LEFT'", () => {
    expect(component.aligned)
      .toEqual(Alignment.LEFT);
  });

  it("should have as 'vertical false'", () => {
    expect(component.vertical)
      .toEqual('false');
  });
});
