import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../core/store';
import { APP_CONFIG, testAppConfig } from '../shared/config';
import { WvrMessageManifestEntryComponent } from './wvr-message-manifest-entry/wvr-message-manifest-entry.component';
import { WvrMessageManifestComponent } from './wvr-message-manifest.component';
import { WvrSharedModule } from '../shared/wvr-shared.module';

@Component({
  selector: 'wvr-message-manifest-test-component',
  // tslint:disable-next-line:component-max-inline-declarations
  template: `
    <wvr-message-manifest-component name="Test Message Manifest" base-url="test" mapping-strategy="none">
      <wvr-message-manifest-entry-component name="first" path="/first" methods="GET"></wvr-message-manifest-entry-component>
      <wvr-message-manifest-entry-component name="second" path="/second" methods="GET" mapping-strategy="json"></wvr-message-manifest-entry-component>
    </wvr-message-manifest-component>
  `
})
class WvrMessageManifestHostComponent {
  @ViewChild(WvrMessageManifestComponent) manifest: WvrMessageManifestComponent;
}

describe('WvrMessageManifestComponent', () => {
  let hostComponent: WvrMessageManifestHostComponent;
  let hostFixture: ComponentFixture<WvrMessageManifestHostComponent>;

  let entryFixture: ComponentFixture<WvrMessageManifestEntryComponent>;

  beforeEach(waitForAsync(() => TestBed.configureTestingModule({
    imports: [
      BrowserAnimationsModule,
      WvrSharedModule
    ],
    declarations: [
      WvrMessageManifestComponent,
      WvrMessageManifestHostComponent
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
    hostFixture = TestBed.createComponent(WvrMessageManifestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(hostComponent.manifest)
      .toBeTruthy();
  });

  it('should add entry', () => {
    entryFixture = TestBed.createComponent(WvrMessageManifestEntryComponent);

    // tslint:disable-next-line:no-string-literal
    const entries = hostComponent.manifest['messageManifestEntries'];
    const lengthBefore = entries.length;

    hostComponent.manifest.addEntry(entryFixture.componentInstance);

    expect(entries.length > lengthBefore)
      .toBeTrue();
  });

  it('should create entries', () => {
    // tslint:disable-next-line:no-string-literal
    const entries = hostComponent.manifest['messageManifestEntries'];
    expect(entries.length)
      .toBeTruthy();
  });

});
