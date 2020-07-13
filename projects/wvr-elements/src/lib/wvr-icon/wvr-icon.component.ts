import { Component, Input, OnInit } from '@angular/core';
import { IconService } from './icon.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'wvr-icon-element',
  templateUrl: './wvr-icon.component.html',
  styleUrls: ['./wvr-icon.component.scss']
})
export class WvrIconComponent implements OnInit {

  @Input() name: string;

  private iconSvg: SafeHtml;

  constructor(private iconService: IconService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.iconSvg = this.sanitizer.bypassSecurityTrustHtml(this.iconService.getIcon(this.name));
  }

}
