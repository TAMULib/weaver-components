import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCurrentTheme } from '../core/store';
import { ThemeVariants } from '../shared/theme';
import { WvrBaseComponent } from '../shared/wvr-base.component';

@Component({
  selector: 'wvr-color-preview-component',
  templateUrl: './wvr-color-preview.component.html',
  styleUrls: ['./wvr-color-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
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
