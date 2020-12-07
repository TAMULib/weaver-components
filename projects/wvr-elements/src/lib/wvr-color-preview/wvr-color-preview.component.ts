/* istanbul ignore file */

import { Component, Injector, OnInit } from '@angular/core';
import { WvrBaseComponent } from '../shared/wvr-base.component';
import { ThemeVariants } from '../shared/theme';
import { select } from '@ngrx/store';
import { selectCurrentTheme } from '../core/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'wvr-color-preview-component',
  templateUrl: './wvr-color-preview.component.html',
  styleUrls: ['./wvr-color-preview.component.scss']
})
export class WvrColorPreviewComponent extends WvrBaseComponent  implements OnInit {

  currentTheme: Observable<ThemeVariants>;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.currentTheme = this.store
      .pipe(select(selectCurrentTheme));

  }

  originalOrdering(): number {
    return 0;
  }

}
