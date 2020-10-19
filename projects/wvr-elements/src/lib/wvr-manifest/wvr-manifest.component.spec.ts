import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { metaReducers, ROOT_REDUCER } from '../core/store';

import { WvrManifestComponent } from './wvr-manifest.component';

describe('WvrManifestComponent', () => {
  let component: WvrManifestComponent;
  let fixture: ComponentFixture<WvrManifestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, StoreModule.forRoot(ROOT_REDUCER, { metaReducers })],
      declarations: [ WvrManifestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrManifestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
