import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WvrManifestComponent } from './wvr-manifest.component';

describe('WvrManifestComponent', () => {
  let component: WvrManifestComponent;
  let fixture: ComponentFixture<WvrManifestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
