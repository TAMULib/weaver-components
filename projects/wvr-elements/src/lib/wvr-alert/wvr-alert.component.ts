import { AfterViewInit, Component, Injector, Input, OnInit } from '@angular/core';
import { projectContent } from '../shared/utility/projection.utility';
import { WvrBaseComponent } from '../shared/wvr-base.component';

/**
 * A message display with contextualized styling.
 */
@Component({
  selector: 'wvr-alert-component',
  templateUrl: './wvr-alert.component.html',
  styleUrls: ['./wvr-alert.component.scss']
})
export class WvrAlertComponent extends WvrBaseComponent implements OnInit, AfterViewInit {

  /** Used to define the type of alert. */
  @Input() alertType: 'basic' | 'self-closing' | 'custom' = 'basic';

  /** Used to self close the alert box. */
  alertClosed = false;

  /** Used to display the Close button. */
  @Input() closeable: 'true' | 'false' = 'true';

  /** Setting the delay timer for the self closing alert message */
  @Input() closeTimer = 5000;

  variantTypes = ['alert'];

  constructor(injector: Injector) {
    super(injector);
  }

  /**
   * An event handle method for the `document:click` event.
   * Closes the alert box once the `X` is clicked.
   */
  clickClose($event: MouseEvent): void {
      this.alertClosed = true;
      this.themeVariant = 'primary';
  }

  /** Initializes the closing timer for a self closing alert. */
  ngOnInit(): void {
    super.ngOnInit();
    if (this.alertType === 'self-closing') {
      setTimeout(() => {
        this.alertClosed = true;
      }, this.closeTimer);
    }
  }

  /** Called after the view has been intialized. Handles the rendering of the projected content. */
  ngAfterViewInit(): void {
    projectContent(this.eRef, 'template[alert]', 'div[alert]');
    projectContent(this.eRef, 'template[custom-alert]', 'div[custom-alert]');
  }

}
