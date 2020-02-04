import { Component, Injector, Input } from '@angular/core';
import { WvrBaseComponent } from '../shared/wvr-base-component';

@Component({
  selector: 'wvr-text-element',
  templateUrl: './wvr-text.component.html',
  styleUrls: ['./wvr-text.component.scss']
})
export class WvrTextComponent extends WvrBaseComponent {

  @Input()
  public value: string;

  constructor(injector: Injector) {
    super(injector);
  }

}
