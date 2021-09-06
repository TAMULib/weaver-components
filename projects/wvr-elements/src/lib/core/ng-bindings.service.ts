import { ChangeDetectorRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CdRefBindingSubject {
  subject: BehaviorSubject<any>;
  cdRef: ChangeDetectorRef;
}

/**
 * A registry for AngularJS binding subjects.
 */
@Injectable({
  providedIn: 'root'
})
export class NgBindingsService {

  private readonly subjects: { [key: string]: Array<CdRefBindingSubject> };

  constructor() {
    this.subjects = {};
  }

  putSubject(key: string, subject: CdRefBindingSubject): Array<CdRefBindingSubject> {
    let subjects = this.subjects[key];
    if (!subjects) {
      subjects = [];
      this.subjects[key] = subjects;
    }
    this.subjects[key].push(subject);

    return this.subjects[key];
  }

}
