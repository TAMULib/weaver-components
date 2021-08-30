import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../core/store';
import { APP_CONFIG, testAppConfig } from '../shared/config';
import { WvrSharedModule } from '../shared/wvr-shared.module';
import { WvrCardComponent } from './wvr-card.component';

@Component({
  selector: 'wvr-card-host-component',
  // tslint:disable-next-line:component-max-inline-declarations
  template: `
  <wvr-card-component [themeVariant]="primary" [panelFormat]="mixed">
    <template card-header><wvre-text value="Card Header"></wvre-text></template>
    <template card-title><wvre-text value="Card Title"></wvre-text></template>
    <template card-image>
      <img src="assets/lighthouse.svg" />
    </template>
    <wvre-list top list-type="group-flush" context="info"><wvre-list-item><wvre-text value="Item 1"></wvre-text></wvre-list-item><wvre-list-item context="warning"><wvre-text value="Item 2"></wvre-text></wvre-list-item><wvre-list-item context="success"><wvre-text value="Item 3"></wvre-text></wvre-list-item></wvre-list>
    <wvre-text value="This is a basic card body content"></wvre-text>
    <wvre-list bottom list-type="group-flush" context="info">
      <wvre-list-item>
        <wvre-text value="Item 1"></wvre-text>
      </wvre-list-item>
      <wvre-list-item context="warning">
        <wvre-text value="Item 2"></wvre-text>
      </wvre-list-item>
    </wvre-list>
    <template card-links>
      <a href="http://www.google.com">
        <wvre-text value="Google"></wvre-text>
      </a>
      <a href="http://www.google.com">
        <wvre-text value="Gmail"></wvre-text>
      </a>
    </template>
    <wvre-button theme-variant="secondary"><wvre-text value="Card Button Text"></wvre-text></wvre-button>
    <template card-footer><wvre-text class="text-muted" value="Card Footer1"></wvre-text></template>
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
        BrowserAnimationsModule,
        WvrSharedModule
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
    })
      .compileComponents();
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
