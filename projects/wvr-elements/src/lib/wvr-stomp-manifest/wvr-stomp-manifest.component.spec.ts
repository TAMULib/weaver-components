import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../core/store';
import { APP_CONFIG, testAppConfig } from '../shared/config';
import { WvrSharedModule } from '../shared/wvr-shared.module';
import { WvrStompManifestEntryComponent } from './wvr-stomp-manifest-entry/wvr-stomp-manifest-entry.component';
import { WvrStompManifestComponent } from './wvr-stomp-manifest.component';

@Component({
  selector: 'wvr-stomp-manifest-test-component',
  // tslint:disable-next-line:component-max-inline-declarations
  template: `
    <wvr-stomp-manifest-component name="Test Stomp Manifest" base-url="test" mapping-strategy="none">
      <wvr-stomp-manifest-entry-component name="first" path="/first" methods="GET"></wvr-stomp-manifest-entry-component>
      <wvr-stomp-manifest-entry-component name="second" path="/second" methods="GET" mapping-strategy="json"></wvr-stomp-manifest-entry-component>
    </wvr-stomp-manifest-component>
  `
})
class WvrStompManifestHostComponent {
  @ViewChild(WvrStompManifestComponent) manifest: WvrStompManifestComponent;
}

describe('WvrStompManifestComponent', () => {
  let hostComponent: WvrStompManifestHostComponent;
  let hostFixture: ComponentFixture<WvrStompManifestHostComponent>;

  let entryFixture: ComponentFixture<WvrStompManifestEntryComponent>;

  beforeEach(waitForAsync(() => TestBed.configureTestingModule({
    imports: [
      BrowserAnimationsModule,
      WvrSharedModule
    ],
    declarations: [
      WvrStompManifestComponent,
      WvrStompManifestHostComponent
    ],
    providers: [
      {
        provide: APP_CONFIG,
        useValue: testAppConfig
      },
      provideMockStore({ initialState })
    ]
  }).compileComponents()));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(WvrStompManifestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(hostComponent.manifest)
      .toBeTruthy();
  });

  it('should add entry', () => {
    entryFixture = TestBed.createComponent(WvrStompManifestEntryComponent);

    // tslint:disable-next-line:no-string-literal
    const entries = hostComponent.manifest['stompManifestEntries'];
    const lengthBefore = entries.length;

    hostComponent.manifest.addEntry(entryFixture.componentInstance);

    expect(entries.length > lengthBefore)
      .toBeTrue();
  });

  it('should create entries', () => {
    // tslint:disable-next-line:no-string-literal
    const entries = hostComponent.manifest['stompManifestEntries'];
    expect(entries.length)
      .toBeTruthy();
  });

});
