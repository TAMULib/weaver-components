import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { APP_CONFIG, testAppConfig } from '../shared/config';
import { WvrManifestEntryComponent } from './wvr-manifest-entry/wvr-manifest-entry.component';
import { WvrManifestComponent } from './wvr-manifest.component';
import { initialState } from '../core/store';

@Component({
  selector: 'wvr-manifest-test-component',
  // tslint:disable-next-line:component-max-inline-declarations
  template: `
  <wvr-manifest-component name="Test Manifest" base-url="test" mapping-strategy="none">
    <wvr-manifest-entry-component name="first" path="/first" methods="GET"></wvr-manifest-entry-component>
    <wvr-manifest-entry-component name="second" path="/second" methods="GET" mapping-strategy="json"></wvr-manifest-entry-component>
  </wvr-manifest-component>
  `
})
class WvrManifestHostComponent {
  @ViewChild(WvrManifestComponent) manifest: WvrManifestComponent;
}

describe('WvrManifestComponent', () => {
  let hostComponent: WvrManifestHostComponent;
  let hostFixture: ComponentFixture<WvrManifestHostComponent>;

  let entryFixture: ComponentFixture<WvrManifestEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule
      ],
      declarations: [
        WvrManifestHostComponent,
        WvrManifestComponent,
        WvrManifestEntryComponent
      ],
      providers: [
        {
          provide: APP_CONFIG,
          useValue: testAppConfig
        },
        provideMockStore({initialState})
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    hostFixture = TestBed.createComponent(WvrManifestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(hostComponent.manifest)
      .toBeTruthy();
  });

  it('should add entry', () => {

    entryFixture = TestBed.createComponent(WvrManifestEntryComponent);

    // tslint:disable-next-line:no-string-literal
    const entries = hostComponent.manifest['manifestEntries'];
    const lengthBefore = entries.length;

    hostComponent.manifest.addEntry(entryFixture.componentInstance);

    expect(entries.length > lengthBefore)
      .toBeTrue();

  });

  it('should create entries', () => {
    // tslint:disable-next-line:no-string-literal
    const entries = hostComponent.manifest['manifestEntries'];
    expect(entries.length)
      .toBeTruthy();
  });

});
