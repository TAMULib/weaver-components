import { Component, Injector, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
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
  modalId: string;

  /** Allows for the override of theme variant for modal component. */
  @Input() themeVariant: ThemeVariantName = 'primary';

  /** Allows for the override of theme variant for the button launching the modal component. */
  @Input() btnThemeVariant: ThemeVariantName;

  /** Allows for the override of theme variant for modal header. */
  @Input() modalHeaderThemeVariant: ThemeVariantName;

  /** Allows for the override of theme variant for modal footer. */
  @Input() modalFooterThemeVariant: ThemeVariantName = 'light';

  bodySafeHtml: SafeHtml;

  footerSafeHtml: SafeHtml;

  get openProps(): string {
    return `{ id: '${this.modalId}'}`;
  }

  constructor(
    injector: Injector,
    private modalService: NgbModal
  ) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.modalService.activeInstances.subscribe((modalRefs: NgbModalRef[]) => {
      setTimeout(() => {
        if (!!this.modalRef && modalRefs.length > 0) {
          ['body', 'footer'].forEach(content => {
            const template = this.eRef.nativeElement.querySelector(`template[modal-${content}]`);
            const element: Element = this.eRef.nativeElement.querySelector(`div[modal-${content}]`);
            const clone = template.content.children.length
              ? template.content.cloneNode(true)
              : template.cloneNode(true);
            Array.from(clone.children)
              .forEach((elem: Element) => {
                console.log(content, elem);
                element.appendChild(elem);
              });
          });
        }
      });
    });

    const defaultName = 'Weaver Modal';
    this.modalId = !this.title ? `${defaultName
      .split(' ')
      .join('')}-${this.id}` : this.title;

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
            backdrop: 'static',
            animation: false,
            modalDialogClass: 'modal-dialog',
            beforeDismiss: () => {
              this.store.dispatch(ModalActions.closeModal({ id: this.modalId }));

              return false;
            }
          });

        } else if (this.modalRef) {
          this.modalRef.close();
          delete this.modalRef;
        }
      });
  }

  openModal(): void {
    this.store.dispatch(ModalActions.openModal({ id: this.modalId }));
  }

  /** This provides background, border and text color properties based on the them variant provided . */
  additionalClasses(value): string {
    let additionalClasses = '';
    switch (value) {
      case 'header':
        additionalClasses = this.modalHeaderThemeVariant ?
          `bg-${this.modalHeaderThemeVariant} border-${this.modalHeaderThemeVariant} ${this.getTextColor(this.modalHeaderThemeVariant)}` :
          this.themeVariant ?
            `bg-${this.themeVariant} border-${this.themeVariant} ${this.getTextColor(this.themeVariant)}` :
            'bg-light text-dark';
        break;
      case 'footer':
        additionalClasses = this.modalFooterThemeVariant ?
          `bg-${this.modalFooterThemeVariant} border-${this.modalFooterThemeVariant} ${this.getTextColor(this.modalFooterThemeVariant)}` :
          this.themeVariant ?
            `bg-${this.themeVariant} border-${this.themeVariant} ${this.getTextColor(this.themeVariant)}` :
            'bg-light text-dark';
        break;
      default:
    }

    return additionalClasses;
  }

  getTextColor(themeVariant): string {
    return ((themeVariant === 'warning') || (themeVariant === 'light')) ? 'text-dark' : 'text-white';
  }

  // @HostListener('click', ['$event']) click($event: MouseEvent): void {
  //   console.log('modal click', $event.target);
  // }

}
