import { Injectable } from '@angular/core';
import { actions } from './actions';

/**
 * A registry for actions that can be dispatched.
 */
@Injectable({
  providedIn: 'root'
})
export class ActionRegistryService {

  private readonly actions: any;

  constructor() {
    this.actions = { ...actions };
  }

  getActions(key: string): any {
    return this.actions[key];
  }

  putActions(key: string, action: any): any {
    this.actions[key] = action ;
  }

}
