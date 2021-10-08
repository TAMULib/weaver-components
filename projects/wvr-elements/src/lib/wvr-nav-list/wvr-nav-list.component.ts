import { AfterViewInit, ChangeDetectionStrategy, Component, Injector, Input, OnDestroy } from '@angular/core';
import { Alignment } from '../shared/alignment.enum';
import { projectContent } from '../shared/utility/projection.utility';
import { WvrBaseComponent } from '../shared/wvr-base.component';

/**
 * The WvrNavList Component presents a navigation list.
 * Elements within this list must be wvre-nav-li elements and can be either links of action elements.
 */
@Component({
  selector: 'wvr-nav-list-component',
  templateUrl: './wvr-nav-list.component.html',
  styleUrls: ['./wvr-nav-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WvrNavListComponent extends WvrBaseComponent implements AfterViewInit, OnDestroy {

  /** The aligned property describing the positioning of the list elements. */
  @Input() aligned = Alignment.LEFT;

  /** Toggles the display of the list horizontally or vertically. */
  @Input() vertical: 'true' | 'false' = 'false';

  private readonly observer = new MutationObserver(() => {
    this.project();
  });

  constructor(injector: Injector) {
    super(injector);
  }

  ngAfterViewInit(): void {
    this.project();
    const element: Element = this.eRef.nativeElement.querySelector('template[nav-list-items]');
    if (!!element) {
      this.observer.observe(element, {
        attributes: false,
        childList: true,
        subtree: false
      });
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.observer.disconnect();
  }

  private project(): void {
    projectContent(this.eRef, 'template[nav-list-items]', 'ul[nav-list-items]');
  }

}
