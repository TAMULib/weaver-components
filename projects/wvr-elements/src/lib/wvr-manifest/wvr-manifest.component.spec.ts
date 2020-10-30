import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { metaReducers, ROOT_REDUCER } from '../core/store';
import { WvrManifestEntryComponent } from './wvr-manifest-entry/wvr-manifest-entry.component';

import { WvrManifestComponent } from './wvr-manifest.component';

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
class WvrManifestTestComponent {
  @ViewChild(WvrManifestComponent) manifest: WvrManifestComponent;
}

describe('WvrManifestComponent', () => {
  let wvrManifestTestComponent: WvrManifestTestComponent;
  let fixture: ComponentFixture<WvrManifestTestComponent>;

  let childFixture: ComponentFixture<WvrManifestEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        StoreModule.forRoot(ROOT_REDUCER, { metaReducers })
      ],
      declarations: [ WvrManifestTestComponent, WvrManifestComponent, WvrManifestEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrManifestTestComponent);
    wvrManifestTestComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(wvrManifestTestComponent.manifest)
      .toBeTruthy();
  });

  it('should add entry', () => {

    childFixture = TestBed.createComponent(WvrManifestEntryComponent);

    // tslint:disable-next-line:no-string-literal
    const entries = wvrManifestTestComponent.manifest['manifestEntries'];
    const lengthBefore = entries.length;

    wvrManifestTestComponent.manifest.addEntry(childFixture.componentInstance);

    expect(entries.length > lengthBefore)
      .toBeTrue();

  });

  it('should create entries', () => {
    // tslint:disable-next-line:no-string-literal
    const entries = wvrManifestTestComponent.manifest['manifestEntries'];
    expect(entries.length)
      .toBeTruthy();
  });

});
