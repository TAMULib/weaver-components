import { AfterContentInit, Component, ElementRef, Injector, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { select } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import * as ModalActions from '../core/modal/modal.actions';
import { selectModalState } from '../core/store';
import { ThemeVariantName } from '../shared/theme';
import { WvrBaseComponent } from '../shared/wvr-base.component';

@Component({
  selector: 'wvr-modal-component',
  templateUrl: './wvr-modal.component.html',
  styleUrls: ['./wvr-modal.component.scss']
})
export class WvrModalComponent extends WvrBaseComponent implements OnInit, AfterContentInit {

  @ViewChild('modalContent') modalContent: ElementRef<HTMLElement>;

  @ViewChild('modalTemplate') modalTemplate: TemplateRef<any>;

  modalRef: NgbModalRef;

  /** This allows for the modal button to be toggle able. */
  @Input() btnVisible: 'true' | 'false' = 'true';

  /** The header title value to be displayed as a modal title. */
  @Input() title: string;

  /** The text value to be displayed for the button launching the modal. */
  @Input() btnText: string;

  /** This defines the modal id. */
  modalId: string;

  /** Allows for the override of theme variant for modal component. */
  @Input() themeVariant: ThemeVariantName = 'primary';

  /** Allows for the override of theme variant for the button launching the modal component. */
  @Input() btnThemeVariant: ThemeVariantName;

  /** Allows for the override of theme variant for modal header. */
  @Input() modalHeaderThemeVariant: ThemeVariantName;

  /** Allows for the override of theme variant for modal footer. */
  @Input() modalFooterThemeVariant: ThemeVariantName = 'light';

  get openProps(): string {
    return `{ id: '${this.modalId}'}`;
  }

  constructor(injector: Injector, private modalService: NgbModal) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();

    const defaultName = 'Weaver Modal';
    this.modalId = !this.title ? `${defaultName
      .split(' ')
      .join('')}-${this.id}` : this.title;

    this.title = !this.title ? defaultName : this.title;

    this.btnText = this.btnText ? this.btnText : this.title;

    this.btnThemeVariant = this.btnThemeVariant ? this.btnThemeVariant : this.themeVariant;

    this.store.dispatch(ModalActions.addModal({modal: {
      name: this.modalId,
      open: false
    }}));

    this.store.pipe(
      select(selectModalState),
      filter(modalState => !!modalState)
    )
    .subscribe(modalState => {
      const modal = modalState.entities[this.modalId];
      if (modal.open) {

        this.modalRef =  this.modalService.open(this.modalTemplate, {
          ariaLabelledBy: 'modal-basic-title',
          container: this.eRef.nativeElement,
          backdrop: false,
          beforeDismiss: () => {
            this.store.dispatch(ModalActions.closeModal({id: this.modalId}));

            return false;
          }
        });

        const modelContentContainer = (this.eRef.nativeElement as HTMLElement).querySelector('modal-content');
        modelContentContainer.outerHTML = this.modalContent.nativeElement.innerHTML;
        this.modalContent.nativeElement.innerHTML = '';

      } else if (this.modalRef) {

        const modelContentContainer = (this.eRef.nativeElement as HTMLElement).querySelector('.modal-content');
        this.modalContent.nativeElement.innerHTML = modelContentContainer.innerHTML;

        this.modalRef.close();
       }
    });
  }

  openModal(): void {
    this.store.dispatch(ModalActions.openModal({id: this.modalId}));
  }

  /** This provides background, border and text color properties based on the them variant provided . */
  additionalClasses(value): string {
    let additionalClasses = '';
    switch (value) {
      case 'header':
        additionalClasses = this.modalHeaderThemeVariant ?
                            ` bg-${this.modalHeaderThemeVariant} border-${this.modalHeaderThemeVariant} ${this.getTextColor(this.modalHeaderThemeVariant)}` :
                            this.themeVariant ?
                            ` bg-${this.themeVariant} border-${this.themeVariant} ${this.getTextColor(this.themeVariant)}` :
                            ' bg-light text-dark ';
        break;
      case 'footer':
        additionalClasses = this.modalFooterThemeVariant ?
                            ` bg-${this.modalFooterThemeVariant} border-${this.modalFooterThemeVariant} ${this.getTextColor(this.modalFooterThemeVariant)}` :
                            this.themeVariant ?
                            ` bg-${this.themeVariant} border-${this.themeVariant} ${this.getTextColor(this.themeVariant)}` :
                            ' bg-light text-dark ';
        break;
      default:
    }

    return additionalClasses;
  }

  getTextColor(themeVariant): string {
    return ((themeVariant === 'warning') || (themeVariant === 'light')) ? ' text-dark ' : ' text-white ';
  }

}
