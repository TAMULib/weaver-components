import { AfterViewInit, ChangeDetectionStrategy, Component, Injector, Input, OnDestroy } from '@angular/core';
import { projectContent } from '../shared/utility/projection.utility';
import { WvrBaseComponent } from '../shared/wvr-base.component';

/**
 * A stylable list.
 */
@Component({
  selector: 'wvr-list-component',
  templateUrl: './wvr-list.component.html',
  styleUrls: ['./wvr-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WvrListComponent extends WvrBaseComponent implements AfterViewInit, OnDestroy {

  /** Specifies the display format of this list.  */
  @Input() listType = 'unordered';

  private readonly observer = new MutationObserver(() => {
    this.project();
  });

  constructor(injector: Injector) {
    super(injector);
  }

  ngAfterViewInit(): void {
    this.project();
    const element: Element = this.eRef.nativeElement.querySelector('template[list-items],template[wvr-compile]');
    this.observer.observe(element, {
      attributes: false,
      childList: true,
      subtree: false
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.observer.disconnect();
  }

  private project(): void {
    projectContent(this.eRef, 'template[list-items],template[wvr-compile]', 'ul[list-items],ol[list-items],dl[list-items],div[list-items]');
  }

}
