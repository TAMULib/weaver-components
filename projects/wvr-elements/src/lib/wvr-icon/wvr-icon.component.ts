import { AfterViewInit, ChangeDetectorRef, Component, HostBinding, Input } from '@angular/core';
import { IconService } from './icon.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'wvr-icon-element',
  templateUrl: './wvr-icon.component.html',
  styleUrls: ['./wvr-icon.component.scss']
})
export class WvrIconComponent implements AfterViewInit {

  @Input() private set: string;

  @Input() private name: string;

  @HostBinding('style.--wvr-icon-color') @Input() private color: string;

  @HostBinding('style.--wvr-icon-size') @Input() private size = '24px';

  iconSvg: SafeHtml;

  constructor(private iconService: IconService, private sanitizer: DomSanitizer, private cdRef: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.iconService.getIcon(this.set, this.name)
      .subscribe(svg => {
        this.iconSvg = this.sanitizer.bypassSecurityTrustHtml(svg);
        this.cdRef.detectChanges();
      });
  }

}
