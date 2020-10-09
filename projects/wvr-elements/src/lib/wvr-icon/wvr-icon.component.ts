import { AfterViewInit, Component, HostBinding, Injector, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
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
  styleUrls: ['./wvr-icon.component.scss']
})
export class WvrIconComponent extends WvrBaseComponent implements AfterViewInit {

  /** An attribute input describing the icon set to which this icon belongs. */
  @Input() set: string;

  /** An attribute input describing the icon name of this icon. */
  @Input() name: string;

  /** An attribute input bound to the css variable `--wvre-icon-color`.  */
  @HostBinding('style.--wvre-icon-color') @Input() color: string;

    /** An attribute input bound to the css variable `--wvre-icon-size`.  */
  @HostBinding('style.--wvre-icon-size') @Input() size = '24px';

  /** An observable SafeHtml representation of the svg to be displayed for this icon. */
  iconSvg: Observable<SafeHtml>;

  constructor(injector: Injector, private readonly iconService: IconService) {
    super(injector);
  }

  /** Utilizes the icon service to request the svg specified by this icon. */
  ngAfterViewInit(): void {
    this.iconSvg = this.iconService.getIcon(this.set, this.name)
      .pipe(map(svg => this._domSanitizer.bypassSecurityTrustHtml(svg)));
  }

}
