import { Component, HostListener, Injector, Input, OnInit } from '@angular/core';
import { WvrBaseComponent } from '../shared/wvr-base.component';

@Component({
  selector: 'wvr-alert-element',
  templateUrl: './wvr-alert.component.html',
  styleUrls: ['./wvr-alert.component.scss']
})
export class WvrAlertComponent extends WvrBaseComponent implements OnInit {

  /** Used to define the class type of an alert component.  */
  @Input() alertClass: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

  /** Used to define the type of alert.  */
  @Input() alertType: 'basic' | 'closable' | 'self-closing' | 'custom';

  /** Used to define the text of an alert message.  */
  @Input() alertMessage: string;

  /** Used to define the alert link href value. */
  @Input() alertLinkUrl: string;

  /** Used to define the text value alert link href. */
  @Input() alertLinkText: string;

  /** Used to self close the alert box. */
  alertClosed = false;

  constructor(injector: Injector) {
    super(injector);
  }

  /**
   * An event handle method for the `document:click` event.
   * Closes the alert box once the `X` is clicked.
   */
  @HostListener('document:click', ['$event']) clickClose($event): void {
    const closeElem = $event.target as HTMLElement;
    const alertElem = closeElem.closest('.wvr-alert');
    alertElem.classList.add('wvr-hidden');
  }

  ngOnInit(): void {
    const wvrAlertElem = this._eRef.nativeElement as HTMLElement;
    const alertType = wvrAlertElem.getAttribute('alert-type');
    setTimeout(() => {
      if(alertType === "self-closing") {
        wvrAlertElem.classList.add('wvr-hidden');
      }
      this.alertClosed = true;
    }, 8000);
  }

}
