import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WvrFooterComponent } from './wvr-footer.component';

describe('WvrFooterComponent', () => {
  let component: WvrFooterComponent;
  let fixture: ComponentFixture<WvrFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WvrFooterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it("should have as isSticky 'false'", () => {
    expect(component.isSticky)
      .toBeFalse();
  });

  it('should positionSelf when window is resized', () => {
    const spyOnResize = spyOn(component, 'positionSelf');
    window.dispatchEvent(new Event('resize'));
    expect(spyOnResize).toHaveBeenCalled();
  });

  it('should have isSticky feature to true', () => {
    expect(component.isSticky).toBeFalse();
    window.resizeBy(300, 300);
    window.dispatchEvent(new Event('resize'));
    expect(component.isSticky).toBeTruthy();
  });

});
