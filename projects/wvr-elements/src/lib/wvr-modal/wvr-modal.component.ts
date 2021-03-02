import { Component, Injector, Input, OnInit } from '@angular/core';
import { WvrBaseComponent } from '../shared/wvr-base.component';
import * as ModalActions from '../core/modal/modal.actions';

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
  }

}
