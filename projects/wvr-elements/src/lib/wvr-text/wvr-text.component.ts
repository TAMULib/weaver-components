import { Component, Input } from '@angular/core';

@Component({
  selector: 'wvr-text-element',
  templateUrl: './wvr-text.component.html',
  styleUrls: ['./wvr-text.component.scss']
})
export class WvrTextComponent {

  @Input()
  public value: string;

}
