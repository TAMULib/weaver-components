import { ThisReceiver } from '@angular/compiler';
import { Component, HostListener, Injector, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ModalDismissReasons, NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { select } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import * as ModalActions from '../core/modal/modal.actions';
import { selectModalState } from '../core/store';
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

  constructor(injector: Injector, private modalService: NgbModal) {
    super(injector);
  }

  @HostListener('click', ['$event']) click($event: MouseEvent): void {
    const clickedElem = $event.target as HTMLElement;
    const actionAttr = clickedElem.attributes.getNamedItem('modal-action');
    if (actionAttr) {
      switch (actionAttr.value) {
        case 'DISMISS':
          this.modalRef.dismiss();
          break;
        default:
      }
    }

  }

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

}
