import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { WvrTabComponent } from './wvr-tab.component';

describe('WvrTabComponent', () => {
  let component: WvrTabComponent;
  let fixture: ComponentFixture<WvrTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [WvrTabComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it('should have unique id', () => {
    const tabElem = (fixture.elementRef.nativeElement as HTMLElement).querySelector('li a');
    expect(component.htmlId)
      .toEqual(tabElem.getAttribute('id'));
  });

  it('should have unique tab text', () => {
    const tabElem = (fixture.elementRef.nativeElement as HTMLElement).querySelector('li a');
    expect(component.tabText.trim())
      .toEqual(tabElem.innerHTML.trim());
  });
});
