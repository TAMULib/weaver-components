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

  it(`should have as logoText 'Weaver Components'`, () => {
    expect(component.logoText).toEqual('Weaver Components');
  });

  it(`should have as headerTitle 'Weaver Header Component'`, () => {
    expect(component.headerTitle).toEqual('Weaver Header Component');
  });

  it(`should have logoSrc defined`, () => {
    expect(component.logoSrc).toBeDefined();
  });

  it(`should have as logoHref '#test'`, () => {
    expect(component.logoHref).toEqual('#test');
  });
});