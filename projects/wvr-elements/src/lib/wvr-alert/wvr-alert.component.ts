import { AfterContentInit, Component, HostListener, Injector, Input, OnInit } from '@angular/core';
import { WvrBaseComponent } from '../shared/wvr-base.component';

@Component({
  selector: 'wvr-alert-element',
  templateUrl: './wvr-alert.component.html',
  styleUrls: ['./wvr-alert.component.scss']
})
export class WvrAlertComponent extends WvrBaseComponent implements AfterContentInit, OnInit {

  /** Used to define the class type of an alert component.  */
  @Input() alertClass: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'primary';

  /** Used to define the type of alert. */
  @Input() alertType: 'basic' | 'self-closing' | 'custom' = 'basic';

  /** Used to self close the alert box. */
  alertClosed = false;

  /** Used to display the Close button. */
  @Input() closable: 'true' | 'false' = 'true';

  /** Setting the delay timer for the self closing alert message */
  @Input() closeTimer = 5000;

  constructor(injector: Injector) {
    super(injector);
  }

  /**
   * An event handle method for the `document:click` event.
   * Closes the alert box once the `X` is clicked.
   */
  clickClose($event: MouseEvent): void {
      this.alertClosed = true;
  }

  ngOnInit(): void {
    setTimeout(() => {
        this.alertClosed = (this.alertType === 'self-closing') ? true : false;
    }, this.closeTimer);
  }

}
