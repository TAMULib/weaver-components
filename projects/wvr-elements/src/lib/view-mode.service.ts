import { ChangeDetectorRef, Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ViewMode } from './shared/view-mode.enum';

@Injectable({
  providedIn: 'root'
})
export class ViewModeService {

  private viewMode: Observable<ViewMode>;
  private viewModeSub: Subscription;

  constructor(
    private readonly bpo: BreakpointObserver,
  ) {}

  getViewMode(cdRef: ChangeDetectorRef): Observable<ViewMode> {

    if (!this.viewMode) {
      this.viewMode = this.bpo
      .observe([Breakpoints.Web, Breakpoints.Tablet, Breakpoints.Handset])
      .pipe(
        map(() => this.currentViewMode(this.bpo))
      );
    }

    if (this.viewModeSub) {
      this.viewModeSub.unsubscribe();
    }

    this.viewModeSub = this.viewMode
      .pipe(
        delay(100)
      )
      .subscribe(() => {
        cdRef.detectChanges();
      });

    return this.viewMode;
  }

  currentViewMode(bpo: BreakpointObserver): ViewMode {
    if (bpo.isMatched(Breakpoints.Handset)) {
      return ViewMode.MOBILE;
    }

    if (bpo.isMatched(Breakpoints.Tablet)) {
      return ViewMode.TABLET;
    }

    return ViewMode.DESKTOP;
  }

}
