import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { ThemeVariantName } from '../shared/theme';
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
export class WvrListComponent extends WvrBaseComponent {

  /** Specifies the display format of this list.  */
  @Input() listType = 'unordered';

  /** Specifies the display style of this list.  */
  @Input() themeVariant: ThemeVariantName;

  constructor(injector: Injector) {
    super(injector);
  }

}
