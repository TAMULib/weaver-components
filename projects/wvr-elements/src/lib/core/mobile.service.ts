import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { delay, map, throttleTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  isMobileLayout: boolean;

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

  private readonly checkScreenSize = () => window.innerWidth < 767;

}
