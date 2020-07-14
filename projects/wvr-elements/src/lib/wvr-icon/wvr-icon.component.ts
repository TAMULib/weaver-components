import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
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
