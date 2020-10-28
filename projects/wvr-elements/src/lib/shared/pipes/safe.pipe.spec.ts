import { inject, TestBed } from '@angular/core/testing';
import { BrowserModule, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SafePipe } from './safe.pipe';

describe('SafePipe', () => {

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          BrowserModule
        ]
      });
  });

  it('transform html to SafeHtml', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new SafePipe(domSanitizer);
    const safeHtml = pipe.transform('<p>test</p>', 'html');
    // tslint:disable-next-line:no-string-literal
    expect(safeHtml['changingThisBreaksApplicationSecurity'])
      .toEqual('<p>test</p>');
  }));

});
