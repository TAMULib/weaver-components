import { AfterViewInit, Component, HostBinding, Injector, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IconService } from '../core/icon.service';
import { WvrBaseComponent } from '../shared/wvr-base.component';

@Component({
  selector: 'wvr-icon-element',
  templateUrl: './wvr-icon.component.html',
  styleUrls: ['./wvr-icon.component.scss']
})
export class WvrIconComponent extends WvrBaseComponent implements AfterViewInit {

  @Input() set: string;

  @Input() name: string;

  @HostBinding('style.--wvr-icon-color') @Input() color: string;

  @HostBinding('style.--wvr-icon-size') @Input() size = '24px';

  iconSvg: Observable<SafeHtml>;

  constructor(injector: Injector, private readonly iconService: IconService) {
    super(injector);
  }

  ngAfterViewInit(): void {
    this.iconSvg = this.iconService.getIcon(this.set, this.name)
      .pipe(map(svg => this._domSanitizer.bypassSecurityTrustHtml(svg)));
  }

}
