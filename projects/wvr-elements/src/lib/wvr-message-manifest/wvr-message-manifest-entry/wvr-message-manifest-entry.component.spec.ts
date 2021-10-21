import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../core/store';
import { APP_CONFIG, testAppConfig } from '../../shared/config';
import { WvrMessageManifestComponent } from '../wvr-message-manifest.component';
import { WvrMessageManifestEntryComponent } from './wvr-message-manifest-entry.component';
import { WvrSharedModule } from '../../shared/wvr-shared.module';

@Component({
  selector: 'wvr-message-manifest-test-component',
  // tslint:disable-next-line:component-max-inline-declarations
  template: `
  <wvr-message-manifest-component name="Test Message Manifest" base-url="test" mapping-strategy="none">
    <wvr-message-manifest-entry-component name="first" path="/first" methods="GET"></wvr-message-manifest-entry-component>
  </wvr-message-manifest-component>
  `
})
class WvrMessageManifestHostComponent {
  @ViewChild(WvrMessageManifestComponent) messageManifest: WvrMessageManifestComponent;
}

describe('WvrMessageManifestEntryComponent', () => {
  let wvrMessageManifestTestComponent: WvrMessageManifestHostComponent;
  let fixture: ComponentFixture<WvrMessageManifestHostComponent>;

  let childFixture: ComponentFixture<WvrMessageManifestEntryComponent>;

  beforeEach(waitForAsync(() => TestBed.configureTestingModule({
    imports: [
      BrowserAnimationsModule,
      WvrSharedModule
    ],
    declarations: [
      WvrMessageManifestHostComponent,
      WvrMessageManifestComponent,
      WvrMessageManifestEntryComponent
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
    fixture = TestBed.createComponent(WvrMessageManifestHostComponent);
    wvrMessageManifestTestComponent = fixture.componentInstance;
    fixture.detectChanges();

    childFixture = TestBed.createComponent(WvrMessageManifestEntryComponent);

  });

  it('should create', () => {
    expect(childFixture.componentInstance)
      .toBeTruthy();
  });

  it('should set parent', () => {
    // tslint:disable-next-line:no-string-literal
    const entries = wvrMessageManifestTestComponent.messageManifest['messageManifestEntries'];

    // tslint:disable-next-line:no-string-literal
    expect(entries[0]['parent'])
      .toBeTruthy();
  });

});
