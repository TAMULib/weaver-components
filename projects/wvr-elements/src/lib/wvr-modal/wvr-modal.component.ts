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

  /** Used to define the theme type for modal component. */
  @Input() themeVariant: ThemeVariantName = 'primary';

  /** Used to define the class type for modal header section. */
  @Input() modalHeaderThemeVariant: ThemeVariantName = 'success';

  /** Used to define the class type for modal body section. */
  @Input() modalBodyThemeVariant: ThemeVariantName = 'info';

  /** Used to define the class type for modal footer section. */
  @Input() modalFooterThemeVariant: ThemeVariantName = 'warning';

  /** Used to define the size for modal component. */
  @Input() modalSize: 'lg' | 'sm' = 'lg';

  /** Used to close the modal component. */
  modalClosed = false;

  /** Used to display the Close button. */
  @Input() closable: 'true' | 'false' = 'true';

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

  /** Closes the modal once the `X` is clicked. */
  clickClose($event: MouseEvent): void {
    this.modalClosed = true;
  }

  /** Used to render the modal header section if present */
  private renderModalHeader(): void {
    const wvrModalHeaderElem = this.eRef.nativeElement.querySelector('wvre-modal-header');
    if (wvrModalHeaderElem) {
      const wvrModalTitleElem = this.eRef.nativeElement.querySelector('wvre-modal-title');
      this.hasModalTitle = (wvrModalTitleElem) ? true: false;
      this.hasModalHeader = true;
    }
  }

  /** Used to render the modal footer section if present */
  private renderModalFooter(): void {
    const wvrModalFooterElem = this.eRef.nativeElement.querySelector('wvre-modal-footer');
    if(wvrModalFooterElem) {
      this.hasModalFooter=true;
    }
  }

  /** Used to customize the css properties for modal header based on theme variant. */
  additionalModalHeaderClasses(): string {
    let additionalClasses = '';
    additionalClasses += this.modalHeaderThemeVariant ?
                        ` border-${this.modalHeaderThemeVariant} bg-${this.modalHeaderThemeVariant} `
                        : ` border-${this.themeVariant} bg-${this.themeVariant} `;
    additionalClasses += this.getTextColorByThemeVariant(this.modalHeaderThemeVariant, this.themeVariant);
    return additionalClasses;
  }

  /** Used to customize the css properties for modal body based on theme variant. */
  additionalModalBodyClasses(): string {
    let additionalClasses = '';
    additionalClasses += this.modalBodyThemeVariant ?
                        ` border-${this.modalBodyThemeVariant} bg-${this.modalBodyThemeVariant} `
                        : ` border-${this.themeVariant} bg-${this.themeVariant} `;
    additionalClasses += this.getTextColorByThemeVariant(this.modalBodyThemeVariant, this.themeVariant);
    return additionalClasses;
  }

  /** Used to customize the css properties for modal footer based on theme variant. */
  additionalModalFooterClasses(): string {
    let additionalClasses = '';
    additionalClasses += this.modalFooterThemeVariant ?
                        ` border-${this.modalFooterThemeVariant} bg-${this.modalFooterThemeVariant} `
                        : ` border-${this.themeVariant} bg-${this.themeVariant} `;
    additionalClasses += this.getTextColorByThemeVariant(this.modalFooterThemeVariant, this.themeVariant);
    return additionalClasses;
  }

  /** Used to customize the text color property for the modal based on theme variant. */
  getTextColorByThemeVariant(providedTheme, defaultTheme): string {
    let textClass = '';
    let themeClass = ( !(typeof providedTheme === undefined) && (providedTheme)) ? providedTheme : defaultTheme ;
    textClass += ( (themeClass == 'warning') || (themeClass == 'light')) ? 'text-dark' : 'text-white';
    return textClass;
  }

}
