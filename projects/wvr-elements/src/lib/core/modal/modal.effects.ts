import { trigger } from '@angular/animations';
import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as ModalActions from './modal.actions';
import { ModalService } from './modal.service';

@Injectable()
export class ModalEffects {

  constructor(
    private readonly actions: Actions,
    private readonly modalService: ModalService
  ) {

 }

}
