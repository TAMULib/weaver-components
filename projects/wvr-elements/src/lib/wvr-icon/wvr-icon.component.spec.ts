import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WvrIconComponent } from './wvr-icon.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WvrBaseComponent } from '../shared/wvr-base.component';

describe('WvrIconComponent', () => {
  let component: WvrIconComponent;
  let fixture: ComponentFixture<WvrIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, BrowserAnimationsModule ],
      declarations: [
        WvrBaseComponent,
        WvrIconComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvrIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', inject([HttpTestingController],
    (httpMock: HttpTestingController) => {
    expect(component)
      .toBeTruthy();
  }));

});
