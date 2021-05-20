import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../core/store';
import { APP_CONFIG, testAppConfig } from '../shared/config';
import { WvrCardComponent } from './wvr-card.component';

@Component({
  selector: 'wvr-card-host-component',
  // tslint:disable-next-line:component-max-inline-declarations
  template: `
  <wvr-card-component [themeVariant]="primary" [panelFormat]="mixed">
    <wvre-card-header><wvre-text value="Card Header"></wvre-text></wvre-card-header>
    <wvre-card-title><wvre-text value="Card Title"></wvre-text></wvre-card-title>
    <wvre-card-img src="assets/lighthouse.svg"></wvre-card-img>
    <wvre-card-link href="www.google.com"><wvre-text value="Google"></wvre-text></wvre-card-link>
    <wvre-card-link href="www.gmail.com"><wvre-text value="Gmail"></wvre-text></wvre-card-link>
    <wvre-list top list-type="group-flush" context="info"><wvre-list-item><wvre-text value="Item 1"></wvre-text></wvre-list-item><wvre-list-item context="warning"><wvre-text value="Item 2"></wvre-text></wvre-list-item><wvre-list-item context="success"><wvre-text value="Item 3"></wvre-text></wvre-list-item></wvre-list>
    <wvre-text value="This is a basic card body content"></wvre-text>
    <wvre-list bottom list-type="group-flush" context="info"><wvre-list-item><wvre-text value="Item 1"></wvre-text></wvre-list-item><wvre-list-item context="warning"><wvre-text value="Item 2"></wvre-text></wvre-list-item></wvre-list>
    <wvre-button theme-variant="secondary"><wvre-text value="Card Button Text"></wvre-text></wvre-button>
    <wvre-card-footer text-muted><wvre-text value="Card Footer1"></wvre-text></wvre-card-footer>
  </wvr-card-component>
`
})
class WvrCardHostComponent {
  @ViewChild(WvrCardComponent) card: WvrCardComponent;
}

describe('WvrCardComponent', () => {
  let component: WvrCardComponent;
  let fixture: ComponentFixture<WvrCardComponent>;

  let hostComponent: WvrCardHostComponent;
  let hostFixture: ComponentFixture<WvrCardHostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule
      ],
      declarations: [
        WvrCardComponent,
        WvrCardHostComponent
      ],
      providers: [
        {
          provide: APP_CONFIG,
          useValue: testAppConfig
        },
        provideMockStore({ initialState })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrCardComponent);
    component = fixture.componentInstance;

    hostFixture = TestBed.createComponent(WvrCardHostComponent);
    hostComponent = hostFixture.componentInstance;

    hostFixture.detectChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it('should create with projected content', () => {
    expect(hostComponent.card)
      .toBeTruthy();
  });

});
