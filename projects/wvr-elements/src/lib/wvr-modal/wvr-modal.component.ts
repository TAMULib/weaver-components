import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { ThemeVariantName } from '../shared/theme';
import { WvrBaseComponent } from '../shared/wvr-base.component';

@Component({
  selector: 'wvr-modal-component',
  templateUrl: './wvr-modal.component.html',
  styleUrls: ['./wvr-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WvrModalComponent extends WvrBaseComponent {

  /** Used to define the class type for button component.  */
  @Input() themeVariant: ThemeVariantName = 'primary';

  constructor(injector: Injector) {
    super(injector);
  }

}
