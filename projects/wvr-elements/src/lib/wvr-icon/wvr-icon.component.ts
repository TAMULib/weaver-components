import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, HostBinding, Injector, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
export class WvrIconComponent extends WvrBaseComponent implements OnInit {

  /** An attribute input describing the icon set to which this icon belongs. */
  @Input() set: string;

  /** An attribute input describing the icon name of this icon. */
  @Input() name: string;

  /** An attribute input bound to the css variable `--wvr-icon-color`.  */
  @HostBinding('style.--wvr-icon-color') @Input() color: string;

  /** An attribute input bound to the css variable `--wvr-icon-size`.  */
  @HostBinding('style.--wvr-icon-size') @Input() size = '24px';

  iconSvg: Observable<SafeHtml>;

  constructor(injector: Injector, private readonly http: HttpClient, protected readonly sanitizer: DomSanitizer) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
    const iconSvgUrl = `${this.appConfig.assetsUrl}/icons/${this.set}/${this.name}.svg`;
    this.iconSvg = this.http.get(iconSvgUrl, {
      responseType: 'text'
    }).pipe(map((svg: string) => this.sanitizer.bypassSecurityTrustHtml(svg)));
  }

}
