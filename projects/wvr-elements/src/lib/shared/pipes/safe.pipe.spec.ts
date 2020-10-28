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
    console.log('\n\n\n', safeHtml['changingThisBreaksApplicationSecurity'], '\n\n\n');
    expect(safeHtml['changingThisBreaksApplicationSecurity'])
      .toEqual('<p>test</p>');
  }));

});
