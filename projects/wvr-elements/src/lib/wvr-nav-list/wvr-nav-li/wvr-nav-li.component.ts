import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'wvr-nav-li-element',
  templateUrl: './wvr-nav-li.component.html',
  styleUrls: ['./wvr-nav-li.component.scss']
})
export class WvrNavLiComponent {

  @Input() href: string;

  @HostBinding('style.--wvr-blue') @Input() blue;

  @HostBinding('style.--wvr-primary') @Input() primary;

  @HostBinding('style.--wvr-dark') @Input() dark;

}
