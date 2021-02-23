import { AfterViewInit, ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { ThemeVariantName } from '../shared/theme';
import { wvrTimeout } from '../shared/utility';
import { WvrBaseComponent } from '../shared/wvr-base.component';

@Component({
  selector: 'wvr-modal-component',
  templateUrl: './wvr-modal.component.html',
  styleUrls: ['./wvr-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WvrModalComponent extends WvrBaseComponent implements AfterViewInit {

  /** Indicates the presence of the modal header in the projected content. */
  hasModalHeader: boolean;

  /** Indicates the presence of the modal tile in the projected content. */
  hasModalTitle: boolean;

  /** Indicates the presence of the modal footer in the projected content. */
  hasModalFooter: boolean;

  /** Used to define the class type for button component.  */
  @Input() themeVariant: ThemeVariantName = 'primary';

  constructor(injector: Injector) {
    super(injector);
  }

  /** Called after the view has been intialized. Handles the rendering of the projected content. */
  ngAfterViewInit(): void {
    wvrTimeout(() => {
      this.renderModalHeader();
      this.renderModalFooter();
    });
  }

  /** Prepares the card header for display, and sets it to the DOM */
  private renderModalHeader(): void {
    const wvrModalHeaderElem = this.eRef.nativeElement.querySelector('wvre-modal-header');
    if (wvrModalHeaderElem) {
      const wvrModalTitleElem = this.eRef.nativeElement.querySelector('wvre-modal-title');
      this.hasModalTitle = (wvrModalTitleElem) ? true: false;
      this.hasModalHeader = true;
    }
  }

  private renderModalFooter(): void {
    const wvrModalFooterElem = this.eRef.nativeElement.querySelector('wvre-modal-footer');
    if(wvrModalFooterElem) {
      this.hasModalFooter=true;
    }
  }

}
