import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { delay, map, throttleTime } from 'rxjs/operators';

/**
 * A centralized uitlity for logic conerning mobile layout.
 */
@Injectable({
  providedIn: 'root'
})
export class MobileService {

  /** Indicates the layout state of the viewport. */
  isMobileLayout: boolean;

  /** An observable used for resize events. */
  private readonly screenSizeChanged$: Observable<boolean>;

  constructor() {
    this.screenSizeChanged$ = fromEvent(window, 'resize')
    .pipe(throttleTime(100))
    .pipe(map(this.checkScreenSize));

    this.screenSizeChanged$.subscribe(iml => {
      this.isMobileLayout = iml;
    });

    this.isMobileLayout = this.checkScreenSize();
  }

  /** A mapping method to map resize events to boolean.  */
  private readonly checkScreenSize = () => window.innerWidth < 992;

}
