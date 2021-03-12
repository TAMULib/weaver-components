import { ThisReceiver } from '@angular/compiler';
import { Component, HostListener, Injector, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ModalDismissReasons, NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { select } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import * as ModalActions from '../core/modal/modal.actions';
import { selectModalState } from '../core/store';
import { add } from '../core/theme/theme.actions';
import { ThemeVariantName } from '../shared/theme';
import { WvrBaseComponent } from '../shared/wvr-base.component';

@Component({
  selector: 'wvr-modal',
  templateUrl: './wvr-modal.component.html',
  styleUrls: ['./wvr-modal.component.scss']
})
export class WvrModalComponent extends WvrBaseComponent implements OnInit {

  @ViewChild('modal') modalTemplate: any;

  modalRef: NgbModalRef;

  @Input() name = 'Weaver Modal';

  private  modalId: string;

  @Input() themeVariant: ThemeVariantName;
  @Input() modalHeaderThemeVariant: ThemeVariantName;
  @Input() modalFooterThemeVariant: ThemeVariantName;

  constructor(injector: Injector, private modalService: NgbModal) {
    super(injector);
  }

  // @HostListener('click', ['$event']) click($event: MouseEvent): void {
  //   const clickedElem = $event.target as HTMLElement;
  //   const actionAttr = clickedElem.attributes.getNamedItem('modal-action');
  //   if (actionAttr) {
  //     switch (actionAttr.value) {
  //       case 'DISMISS':
  //         this.modalRef.dismiss();
  //         break;
  //       default:
  //     }
  //   }
  // }

  ngOnInit(): void {
    super.ngOnInit();

    this.modalId = `${this.name
      .split(' ')
      .join('')}-${this.id}`;

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
          beforeDismiss: () => {
            this.store.dispatch(ModalActions.closeModal({id: this.modalId}));

            return false;
          }
        });
      } else if (this.modalRef) {
        this.modalRef.close();
      }
    });
  }

  openModal(): void {
    this.store.dispatch(ModalActions.openModal({id: this.modalId}));
  }

  additionalClasses(value): string {
    let additionalClasses = '';
    switch(value) {
      case 'header':
        additionalClasses = this.modalHeaderThemeVariant ? ` bg-${this.modalHeaderThemeVariant} border-${this.modalHeaderThemeVariant} ` + this.getTextColor(this.modalHeaderThemeVariant)
                            : this.themeVariant ? ` bg-${this.themeVariant} border-${this.themeVariant} `+ this.getTextColor(this.themeVariant) : ' bg-light text-dark '
        break;
      case 'footer':
        additionalClasses = this.modalFooterThemeVariant ? ` bg-${this.modalFooterThemeVariant} border-${this.modalFooterThemeVariant} ` + this.getTextColor(this.modalFooterThemeVariant)
                            : this.themeVariant ? ` bg-${this.themeVariant} border-${this.themeVariant} `+ this.getTextColor(this.themeVariant) : ' bg-light text-dark '
        break;
      default:
    }
    return additionalClasses;
  }

  getTextColor(themeVariant): string {
    console.log(themeVariant);
    return ( (themeVariant === 'warning') || (themeVariant === 'light') ) ? ' text-dark ' : ' text-white ';
  }

}
