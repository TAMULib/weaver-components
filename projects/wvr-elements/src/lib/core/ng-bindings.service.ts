import { ChangeDetectorRef, ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface RefBindingSubject {
  subject: BehaviorSubject<any>;
  cdRef: ChangeDetectorRef;
  eRef: ElementRef;
}

/**
 * A registry for AngularJS binding subjects.
 */
@Injectable({
  providedIn: 'root'
})
export class NgBindingsService {

  private readonly subjects: { [key: string]: Array<RefBindingSubject> };

  constructor() {
    this.subjects = {};
  }

  putSubject(key: string, subject: RefBindingSubject): Array<RefBindingSubject> {
    let subjects = this.subjects[key];
    if (!subjects) {
      subjects = [];
      this.subjects[key] = subjects;
    }
    this.subjects[key].push(subject);

    return this.subjects[key];
  }

}
