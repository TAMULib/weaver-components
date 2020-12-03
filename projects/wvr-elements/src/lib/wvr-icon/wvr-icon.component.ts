import { AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, Injector, Input } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IconService } from '../core/icon.service';
import { WvrBaseComponent } from '../shared/wvr-base.component';

/**
 * A reference to an Icon currently available in the configured assets.
 */
@Component({
  selector: 'wvr-icon-component',
  templateUrl: './wvr-icon.component.html',
  styleUrls: ['./wvr-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WvrIconComponent extends WvrBaseComponent implements AfterViewInit {

  /** An attribute input describing the icon set to which this icon belongs. */
  @Input() set: string;

  /** An attribute input describing the icon name of this icon. */
  @Input() name: string;

  /** An attribute input bound to the css variable `--wvr-icon-color`.  */
  @HostBinding('style.--wvr-icon-color') @Input() color: string;

  /** An attribute input bound to the css variable `--wvr-icon-size`.  */
  @HostBinding('style.--wvr-icon-size') @Input() size = '24px';

  iconSvgDataUrl: Observable<SafeUrl>;

  constructor(injector: Injector, private readonly iconService: IconService) {
    super(injector);
  }

  /** Utilizes the icon service to request the svg specified by this icon. */
  ngAfterViewInit(): void {
    super.ngAfterContentInit();
    this.iconSvgDataUrl = this.iconService.getIcon(this.set, this.name)
      .pipe(
        map(svg => `data:image/svg+xml;base64,${btoa(svg)}`),
        map(dataUrl => this._domSanitizer.bypassSecurityTrustUrl(dataUrl))
      );
  }

}
