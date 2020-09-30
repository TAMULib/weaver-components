import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WvrItWorksComponent } from '../wvr-it-works/wvr-it-works.component';

import { ComponentRegistryService } from './component-registry.service';

describe('ComponentRegistryService', () => {
  let service: ComponentRegistryService;
  let component: WvrItWorksComponent;
  let fixture: ComponentFixture<WvrItWorksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [WvrItWorksComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents()
      .catch(err => { console.error(err); });
    service = TestBed.inject(ComponentRegistryService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrItWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(service)
      .toBeTruthy();
  });

  it('should register a new component', () => {
    expect(component.id >= 0)
      .toBeTruthy();
  });

  it('should retrieve components', () => {
    expect(service.getComponent(component.id) === component)
      .toBeTruthy();
  });

  it('should unregister components', () => {
    service.unRegisterComponent(component.id);
    expect(service.getComponent(component.id))
      .toBeUndefined();
  });

});
