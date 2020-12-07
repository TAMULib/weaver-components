import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { APP_CONFIG, testAppConfig } from '../../shared/config';
import { WvrManifestComponent } from '../wvr-manifest.component';
import { WvrManifestEntryComponent } from './wvr-manifest-entry.component';

@Component({
  selector: 'wvr-manifest-test-component',
  // tslint:disable-next-line:component-max-inline-declarations
  template: `
  <wvr-manifest-component name="Test Manifest" base-url="test" mapping-strategy="none">
    <wvr-manifest-entry-component name="first" path="/first" methods="GET"></wvr-manifest-entry-component>
  </wvr-manifest-component>
  `
})
class WvrManifestTestComponent {
  @ViewChild(WvrManifestComponent) manifest: WvrManifestComponent;
}

describe('WvrManifestEntryComponent', () => {
  const initialState = { theme: {
    themes: {}
  }};
  let wvrManifestTestComponent: WvrManifestTestComponent;
  let fixture: ComponentFixture<WvrManifestTestComponent>;

  let childFixture: ComponentFixture<WvrManifestEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        LazyLoadImageModule
      ],
      declarations: [ WvrManifestTestComponent, WvrManifestComponent, WvrManifestEntryComponent ],
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
    fixture = TestBed.createComponent(WvrManifestTestComponent);
    wvrManifestTestComponent = fixture.componentInstance;
    fixture.detectChanges();

    childFixture = TestBed.createComponent(WvrManifestEntryComponent);

  });

  it('should create', () => {
    expect(childFixture.componentInstance)
      .toBeTruthy();
  });

  it('should set parent', () => {
    // tslint:disable-next-line:no-string-literal
    const entries = wvrManifestTestComponent.manifest['manifestEntries'];

    // tslint:disable-next-line:no-string-literal
    expect(entries[0]['parent'])
      .toBeTruthy();
  });

});
