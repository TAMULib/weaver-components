import { AfterViewInit, ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
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
export class WvrListComponent extends WvrBaseComponent implements AfterViewInit {

  /** Specifies the display format of this list.  */
  @Input() listType = 'unordered';

  constructor(injector: Injector) {
    super(injector);
  }

  ngAfterViewInit(): void {
    projectContent(this.eRef, 'template[list-items],template[wvr-compile]', 'ul[list-items],ol[list-items],dl[list-items],div[list-items]');
  }

}
