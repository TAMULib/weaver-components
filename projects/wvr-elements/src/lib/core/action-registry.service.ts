import { Injectable } from '@angular/core';
import { actions } from './actions';

/**
 * A registry for actions that can be dispatched.
 */
@Injectable({
  providedIn: 'root'
})
export class ActionRegistryService {

  private actions: any;

  constructor() {
    this.actions = { ...actions };
  }

  public getActions(key: string): any {
    return this.actions[key];
  }

  public putActions(key: string, action: any): any {
    this.actions[key] = action;
  }

}
