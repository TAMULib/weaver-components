import { Component, Injector, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
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

  @Input() name = `${this.id}`;

  private closeResult: string;

  constructor(injector: Injector, private modalService: NgbModal) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.store.dispatch(ModalActions.addModal({modal: {
      name: this.name,
      open: false
    }}));
    this.store.pipe(
      select(selectModalState),
      filter(modalState => !!modalState),
      filter(modalState => modalState.modal.name === this.name)
    )
    .subscribe(modalState => {
      if (modalState.modal.open) {
        this.modalService.open(this.modalTemplate, {
          ariaLabelledBy: 'modal-basic-title',
          container: this.eRef.nativeElement,
          beforeDismiss: () => !modalState.modal.open
        });
      } else {
        console.log('trying to close');
      }
    });
  }

  openModal(): void {
    this.store.dispatch(ModalActions.openModal({
      modal: {
        name: this.name,
        open: true
      }
    }));
  }

  closeModal(): void {
    this.store.dispatch(ModalActions.closeModal({
      modal: {
        name: this.name,
        open: false
      }
    }));
  }

}
