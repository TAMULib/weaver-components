import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { metaReducers, ROOT_REDUCER } from '../../core/store';

import { WvrManifestEntryComponent } from './wvr-manifest-entry.component';

describe('WvrManifestEntryComponent', () => {
  let component: WvrManifestEntryComponent;
  let fixture: ComponentFixture<WvrManifestEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, StoreModule.forRoot(ROOT_REDUCER, { metaReducers })],
      declarations: [ WvrManifestEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrManifestEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
