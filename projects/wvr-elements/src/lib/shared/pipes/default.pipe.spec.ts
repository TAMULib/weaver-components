import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { DefaultPipe } from './default.pipe';

describe('DefaultPipe', () => {
  let pipe: DefaultPipe;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          BrowserModule
        ]
      });
    pipe = new DefaultPipe();
  });

  it('create an instance', () => {
    expect(pipe)
      .toBeTruthy();
  });

  it('transforms undefined to default value', () => {
    expect(pipe.transform(undefined, 'transformed'))
      .toEqual('transformed');
  });

});
