import { TestBed, async } from '@angular/core/testing';
import { ItWorksComponent } from './it-works.component';

describe('ItWorksComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItWorksComponent
      ],
    }).compileComponents();
  }));

  it('should create the ItWorksComponent', () => {
    const fixture = TestBed.createComponent(ItWorksComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'it-works-component'`, () => {
    const fixture = TestBed.createComponent(ItWorksComponent);
    const app = fixture.debugElement.componentInstance;
    console.log(app.title);
    expect(app.title).toEqual('it-works-component');
  });

});
