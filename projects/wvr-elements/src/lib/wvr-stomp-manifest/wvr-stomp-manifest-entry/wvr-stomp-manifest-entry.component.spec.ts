import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../core/store';
import { APP_CONFIG, testAppConfig } from '../../shared/config';
import { WvrSharedModule } from '../../shared/wvr-shared.module';
import { WvrStompManifestComponent } from '../wvr-stomp-manifest.component';
import { WvrStompManifestEntryComponent } from './wvr-stomp-manifest-entry.component';

@Component({
  selector: 'wvr-stomp-manifest-test-component',
  // tslint:disable-next-line:component-max-inline-declarations
  template: `
  <wvr-stomp-manifest-component name="Test Stomp Manifest" base-url="test" mapping-strategy="none">
    <wvr-stomp-manifest-entry-component name="first" path="/first" methods="GET"></wvr-stomp-manifest-entry-component>
  </wvr-stomp-manifest-component>
  `
})
class WvrStompManifestHostComponent {
  @ViewChild(WvrStompManifestComponent) stompManifest: WvrStompManifestComponent;
}

describe('WvrStompManifestEntryComponent', () => {
  let wvrStompManifestTestComponent: WvrStompManifestHostComponent;
  let fixture: ComponentFixture<WvrStompManifestHostComponent>;

  let childFixture: ComponentFixture<WvrStompManifestEntryComponent>;

  beforeEach(waitForAsync(() => TestBed.configureTestingModule({
    imports: [
      BrowserAnimationsModule,
      WvrSharedModule
    ],
    declarations: [
      WvrStompManifestHostComponent,
      WvrStompManifestComponent,
      WvrStompManifestEntryComponent
    ],
    providers: [
      {
        provide: APP_CONFIG,
        useValue: testAppConfig
      },
      provideMockStore({ initialState })
    ]
  })
    .compileComponents()));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrStompManifestHostComponent);
    wvrStompManifestTestComponent = fixture.componentInstance;
    fixture.detectChanges();

    childFixture = TestBed.createComponent(WvrStompManifestEntryComponent);

  });

  it('should create', () => {
    expect(childFixture.componentInstance)
      .toBeTruthy();
  });

  it('should set parent', () => {
    // tslint:disable-next-line:no-string-literal
    const entries = wvrStompManifestTestComponent.stompManifest['stompManifestEntries'];

    // tslint:disable-next-line:no-string-literal
    expect(entries[0]['parent'])
      .toBeTruthy();
  });

});
