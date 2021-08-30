import { Component, Injector, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { select } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import * as ModalActions from '../core/modal/modal.actions';
import { selectModalState } from '../core/store';
import { ThemeVariantName } from '../shared/theme';
import { preserveContent, projectContent } from '../shared/utility/projection.utility';
import { WvrBaseComponent } from '../shared/wvr-base.component';

@Component({
  selector: 'wvr-modal-component',
  templateUrl: './wvr-modal.component.html',
  styleUrls: ['./wvr-modal.component.scss']
})
export class WvrModalComponent extends WvrBaseComponent implements OnInit {

  @ViewChild('modalTemplateContent') modalTemplateContent: TemplateRef<Element>;

  modalRef: NgbModalRef;

  /** This allows for the modal button to be toggle able. */
  @Input() btnVisible: 'true' | 'false' = 'true';

  /** The header title value to be displayed as a modal title. */
  @Input() title: string;

  /** The text value to be displayed for the button launching the modal. */
  @Input() btnText: string;

  /** This defines the modal id. */
  @Input() modalId: string;

  /** Allows for the override of theme variant for modal component. */
  @Input() themeVariant: ThemeVariantName = 'primary';

  /** Allows for the override of theme variant for the button launching the modal component. */
  @Input() btnThemeVariant: ThemeVariantName;

  /** Allows for the override of theme variant for modal header. */
  @Input() modalHeaderThemeVariant: ThemeVariantName;

  /** Allows for the override of theme variant for modal footer. */
  @Input() modalFooterThemeVariant: ThemeVariantName = 'light';

  @Input() size: 'sm' | 'lg' | 'xl' = 'lg';

  @Input() backdrop: 'static' | boolean = 'static';

  @Input() centered = false;

  @Input() animation = true;

  @Input() keyboard = false;

  get openProps(): string {
    return `{ id: '${this.modalId}'}`;
  }

  constructor(
    injector: Injector,
    private readonly modalService: NgbModal
  ) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.modalService.activeInstances.subscribe((modalRefs: Array<NgbModalRef>) => {
      setTimeout(() => {
        if (!!this.modalRef && modalRefs.length > 0) {
          ['body', 'footer'].forEach(content => {
            projectContent(this.eRef, `template[modal-${content}]`, `div[modal-${content}]`);
          });
        }
      });
    });

    const defaultName = 'Weaver Modal';

    this.modalId = !!this.modalId
      ? this.modalId
      : !!this.title
      ? this.title
      : `${defaultName
        .split(' ')
        .join('')}-${this.id}`;

    this.title = !this.title ? defaultName : this.title;

    this.btnText = this.btnText ? this.btnText : this.title;

    this.btnThemeVariant = this.btnThemeVariant ? this.btnThemeVariant : this.themeVariant;

    this.store.dispatch(ModalActions.addModal({
      modal: {
        name: this.modalId,
        open: false
      }
    }));

    this.store.pipe(
      select(selectModalState),
      filter(modalState => !!modalState)
    )
      .subscribe(modalState => {
        const modal = modalState.entities[this.modalId];
        if (modal.open) {
          this.modalRef = this.modalService.open(this.modalTemplateContent, {
            ariaLabelledBy: 'modal-basic-title',
            container: this.eRef.nativeElement,
            size: this.size,
            backdrop: this.backdrop,
            centered: this.centered,
            animation: this.animation,
            keyboard: this.keyboard,
            modalDialogClass: 'modal-dialog',
            beforeDismiss: () => {
              this.store.dispatch(ModalActions.closeModal({ id: this.modalId }));

              return false;
            }
          });

        } else if (this.modalRef) {
          ['body', 'footer'].forEach(content => {
            preserveContent(this.eRef, `template[modal-${content}]`, `div[modal-${content}]`);
          });
          this.modalRef.close();
          delete this.modalRef;
        }
      });
  }

  openModal(): void {
    this.store.dispatch(ModalActions.openModal({ id: this.modalId }));
  }

  get additionalHeaderClasses(): string {
    return this.modalHeaderThemeVariant ?
      `bg-${this.modalHeaderThemeVariant} border-${this.modalHeaderThemeVariant} ${this.getTextColor(this.modalHeaderThemeVariant)}` :
      this.themeVariant ?
        `bg-${this.themeVariant} border-${this.themeVariant} ${this.getTextColor(this.themeVariant)}` :
        'bg-light text-dark';
  }

  get additionalFooterClasses(): string {
    return this.modalFooterThemeVariant ?
      `bg-${this.modalFooterThemeVariant} border-${this.modalFooterThemeVariant} ${this.getTextColor(this.modalFooterThemeVariant)}` :
      this.themeVariant ?
        `bg-${this.themeVariant} border-${this.themeVariant} ${this.getTextColor(this.themeVariant)}` :
        'bg-light text-dark';
  }

  getTextColor = (themeVariant): string => ((themeVariant === 'warning') || (themeVariant === 'light')) ? 'text-dark' : 'text-white';

}
