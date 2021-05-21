import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../core/store';
import { APP_CONFIG, testAppConfig } from '../../shared/config';
import { WvrSharedModule } from '../../shared/wvr-shared.module';
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
class WvrManifestHostComponent {
  @ViewChild(WvrManifestComponent) manifest: WvrManifestComponent;
}

describe('WvrManifestEntryComponent', () => {
  let wvrManifestTestComponent: WvrManifestHostComponent;
  let fixture: ComponentFixture<WvrManifestHostComponent>;

  let childFixture: ComponentFixture<WvrManifestEntryComponent>;

  beforeEach(waitForAsync(() => TestBed.configureTestingModule({
    imports: [WvrSharedModule],
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
      provideMockStore({ initialState })
    ]
  })
    .compileComponents()));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrManifestHostComponent);
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
