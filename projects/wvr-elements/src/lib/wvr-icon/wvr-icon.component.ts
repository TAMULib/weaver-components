import { AfterViewInit, Component, HostBinding, Injector, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { IconService } from '../core/icon.service';
import { WvrBaseComponent } from '../shared/wvr-base.component';

@Component({
  selector: 'wvr-icon-element',
  templateUrl: './wvr-icon.component.html',
  styleUrls: ['./wvr-icon.component.scss']
})
export class WvrIconComponent extends WvrBaseComponent implements AfterViewInit {

  @Input() private set: string;

  @Input() private name: string;

  @HostBinding('style.--wvr-icon-color') @Input() private color: string;

  @HostBinding('style.--wvr-icon-size') @Input() private size = '24px';

  iconSvg: SafeHtml;

  constructor(injector: Injector, private readonly iconService: IconService) {
    super(injector);
  }

  ngAfterViewInit(): void {
    this.iconService.getIcon(this.set, this.name)
      .toPromise()
      .then(svg => {
        this.iconSvg = this._domSanitizer.bypassSecurityTrustHtml(svg);
        this._cdRef.detectChanges();
      });
  }

}
