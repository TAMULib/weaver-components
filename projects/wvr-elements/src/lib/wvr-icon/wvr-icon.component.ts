import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { IconService } from './icon.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { WvrAbstractBaseComponent } from '../shared/wvr-abstract-base.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { wvrComponentBaseProps } from '../shared/wvr-base-component-props';

@Component({
  selector: 'wvr-icon-element',
  templateUrl: './wvr-icon.component.html',
  styleUrls: ['./wvr-icon.component.scss'],
  ...wvrComponentBaseProps
})
export class WvrIconComponent extends WvrAbstractBaseComponent implements AfterViewInit {

  @Input() private set: string;

  @Input() private name: string;

  @HostBinding('style.--wvr-icon-color') @Input() private color: string;

  @HostBinding('style.--wvr-icon-size') @Input() private size = '24px';

  rotationState: 'rotated' | 'default' = 'default';

  rotate(): void {
    this.rotationState = (this.rotationState === 'default' ? 'rotated' : 'default');
    this.cdRef.detectChanges();
  }

  iconSvg: SafeHtml;

  constructor(private elemRef: ElementRef, private iconService: IconService,
              private sanitizer: DomSanitizer, private cdRef: ChangeDetectorRef) {
    super();
  }

  ngAfterViewInit(): void {
    this.iconService.getIcon(this.set, this.name)
      .subscribe(svg => {
        this.iconSvg = this.sanitizer.bypassSecurityTrustHtml(svg);
        this.cdRef.detectChanges();
      });
  }

}
