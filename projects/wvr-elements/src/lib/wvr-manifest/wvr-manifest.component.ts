import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, QueryList } from '@angular/core';
import { WvrManifestEntryComponent } from './wvr-manifest-entry/wvr-manifest-entry.component';

@Component({
  selector: 'wvr-manifest-element',
  template: '<ng-content select="wvr-manifest-entry, wvr-manifest-entry-element"></ng-content>'
})
export class WvrManifestComponent implements AfterContentInit {

  @ContentChildren(WvrManifestEntryComponent, {
    descendants: true
  }) entries: QueryList<WvrManifestEntryComponent>;

  // tslint:disable-next-line:no-empty
  constructor(private eRef: ElementRef) { }

  ngAfterContentInit(): void {
    console.log((this.eRef.nativeElement as HTMLElement).querySelectorAll('wvr-manifest-entry'));
  }

}
