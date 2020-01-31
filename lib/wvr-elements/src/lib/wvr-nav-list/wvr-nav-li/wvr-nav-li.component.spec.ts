import { TestBed, async } from '@angular/core/testing';
import { WvrNavLiComponent } from './wvr-nav-li.component';

describe('WvrNavListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WvrNavLiComponent
      ],
    }).compileComponents();
  }));

  // it('should create the ItWorksComponent', () => {
  //   const fixture = TestBed.createComponent(ItWorksComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // });

  // it(`should have as title 'it-works-component'`, () => {
  //   const fixture = TestBed.createComponent(ItWorksComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('it-works-component');
  // });

});
