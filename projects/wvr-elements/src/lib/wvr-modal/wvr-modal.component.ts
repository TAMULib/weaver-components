import { Component, Injector, Input, OnInit } from '@angular/core';
import { WvrBaseComponent } from '../shared/wvr-base.component';
import * as ModalActions from '../core/modal/modal.actions';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { RootState, selectModalState } from '../core/store';

@Component({
  selector: 'wvr-modal',
  templateUrl: './wvr-modal.component.html',
  styleUrls: ['./wvr-modal.component.scss']
})
export class WvrModalComponent extends WvrBaseComponent implements OnInit {

  @Input() name: string;

  constructor(injector: Injector) {
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
        //open modal
      } else {
        //clode modal
      }
    });
  }

  openModal() : void {
    this.store.dispatch(ModalActions.openModal({
      modal: {
        name: this.name,
        open: true
      }
    }));
  }

}
