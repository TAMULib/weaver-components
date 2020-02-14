import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'wvr-it-works-element',
  templateUrl: './wvr-it-works.component.html',
  styleUrls: ['./wvr-it-works.component.scss']
})
export class WvrItWorksComponent {

  title = 'it-works-component';

  @Input() text = 'Weaver Components Work';

  @HostBinding('style.--wvr-primary') @Input() primary;

}
