import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WvrManifestEntryComponent } from './wvr-manifest-entry.component';

describe('WvrManifestEntryComponent', () => {
  let component: WvrManifestEntryComponent;
  let fixture: ComponentFixture<WvrManifestEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
