import { AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, Injector, Input } from '@angular/core';
import * as JSON5 from 'json5';
import { ActionRegistryService } from '../core/action-registry.service';
import { ThemeVariantName } from '../shared/theme';
import { projectContent } from '../shared/utility/projection.utility';
import { WvrBaseComponent } from '../shared/wvr-base.component';

@Component({
  selector: 'wvr-button-component',
  templateUrl: './wvr-button.component.html',
  styleUrls: ['./wvr-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WvrButtonComponent extends WvrBaseComponent implements AfterViewInit {

  htmlId = `wvr-button-${this.id}`;

  /** Used to define the class type for button component.  */
  @Input() themeVariant: ThemeVariantName = 'primary';

  /** Used to define the size for button component.  */
  @Input() btnSize: 'large' | 'small' | 'block';

  /** Used to define the type of a button.  */
  @Input() btnType: 'button' | 'checkbox' | 'radio' | 'reset' | 'submit' | 'link' = 'button';

  /** Allows for the button component to be an anchor tag component if href property present. */
  @Input() href: string;

  @Input() disabled = false;

  /** Allows for the override of background */
  @Input() set background(value: string) {
    this.applyThemeOverride(`--${this.themeVariant}-button-bg`, value);
  }

  /** Allows for the override of active background */
  @Input() set backgroundActive(value: string) {
    this.applyThemeOverride(`--${this.themeVariant}-button-active-bg`, value);
  }

  /** Allows for the override of hover background */
  @Input() set backgroundHover(value: string) {
    this.applyThemeOverride(`--${this.themeVariant}-button-hover-bg`, value);
  }

  /** Allows for the override of border */
  @Input() set borderColor(value: string) {
    this.applyThemeOverride(`--${this.themeVariant}-button-border`, value);
  }

  /** Allows for the override of active border */
  @Input() set borderActive(value: string) {
    this.applyThemeOverride(`--${this.themeVariant}-button-active-border`, value);
  }

  /** Allows for the override of hover border */
  @Input() set borderHover(value: string) {
    this.applyThemeOverride(`--${this.themeVariant}-button-hover-border`, value);
  }

  /** Allows for the override of button border in focus state */
  @Input() set borderFocus(value: string) {
    this.applyThemeOverride(`--${this.themeVariant}-button-focus-border`, value);
  }

  /** Allows for override of box-shadow propery when the button is in focus state */
  @Input() set boxShadowFocus(value: string) {
    this.applyThemeOverride(`--${this.themeVariant}-button-focus-box-shadow`, value);
  }

  /** Allows for the override of color */
  @Input() set color(value: string) {
    this.applyThemeOverride(`--${this.themeVariant}-button-color`, value);
  }

  /** Allows for the override of active color */
  @Input() set colorActive(value: string) {
    this.applyThemeOverride(`--${this.themeVariant}-button-active-color`, value);
  }

  /** Allows for the override of hover color */
  @Input() set colorHover(value: string) {
    this.applyThemeOverride(`--${this.themeVariant}-button-hover-color`, value);
  }

  /** Allows for the override of button border radius */
  @HostBinding('style.--wvr-btn-border-radius') @Input() borderRadius;

  /** Allows for the override of button cursor property */
  @HostBinding('style.--wvr-btn-cursor') @Input() cursor;

  /** Allows for the override of button font family property */
  @HostBinding('style.--wvr-btn-font-family-sans-serif') @Input() fontFamily;

  /** Allows for the override of button font size property */
  @HostBinding('style.--wvr-btn-font-size') @Input() fontSize;

  /** Allows for the override of button font weight property */
  @HostBinding('style.--wvr-btn-font-weight') @Input() fontWeight;

  /** Allows for the override of button hover line height property */
  @HostBinding('style.--wvr-btn-line-height') @Input() lineHeight;

  /** Allows for the override of button padding property */
  @HostBinding('style.--wvr-btn-padding') @Input() padding;

  /** Allows for the override of button text align property */
  @HostBinding('style.--wvr-btn-text-align') @Input() textAlign;

  /** Allows for the override of button vertical align property */
  @HostBinding('style.--wvr-btn-vertical-align') @Input() verticalAlign;

  private _action: any;
  @Input() set dispatchAction(value: string) {
    this._action = this.parseActionNameAndType(value);
  }

  private _actionProps: any;
  @Input() set dispatchActionProps(value: string) {
    this._actionProps = JSON5.parse(value);
  }

  private _dispatchActions: Array<ActionAndProps>;
  @Input() set dispatchActions(value: string) {
    const actionInputs = JSON5.parse(value);
    this._dispatchActions = actionInputs.map(ai =>
      ({
        action: this.parseActionNameAndType(ai.action),
        props: ai.props
      }));
  }

  @Input() emitEvent: string;

  @Input() btnTxt: string;

  @Input() testInput: boolean;

  variantTypes = ['button'];

  actionRegistry?: ActionRegistryService;

  constructor(injector: Injector) {
    super(injector);
    this.actionRegistry = injector.get(ActionRegistryService);
  }

  /** Called after the view has been intialized. Handles the rendering of the projected content. */
  ngAfterViewInit(): void {
    projectContent(this.eRef, 'template[button-content]', 'span[button-content]');
  }

  onClick(): void {
    if (this._dispatchActions) {
      this._dispatchActions.forEach(actionAndProp => {
        this.store.dispatch(actionAndProp.action(
          actionAndProp.props
        ));
      });
    } else if (this._action) {
      this._actionProps ?
      this.store.dispatch(this._action(
        this._actionProps
      )) :
      this.store.dispatch(this._action());
    }

    if (this.emitEvent) {
      this.eRef.nativeElement.dispatchEvent(new CustomEvent(this.emitEvent, {
        bubbles: true,
        detail: {
          data: (this.eRef.nativeElement as HTMLElement).dataset,
          button: this
        }
      }));
    }
  }

  // tslint:disable-next-line:prefer-function-over-method
  private parseActionNameAndType(nameAndType: string): any {
    const parts = nameAndType.split('.');
    if (parts.length !== 2) {
      console.warn(`'${nameAndType}' is not a valid value for 'dispatch-action'. Must in form '[ActionType].[ActionName]'`);

      return;
    }

    const registeredActions = this.actionRegistry.getActions(parts[0]);

    if (!registeredActions) {
      console.warn(`No registered actions were found for '${nameAndType}'.`);

      return;
    }

    if (!parts[0] || !registeredActions[parts[0]]) {
      const types = Object.keys(registeredActions)
        .join(',');
      console.warn(`'${parts[0]}' is not a known action type (${types}).`);

      return;
    }

    if (!parts[1] || !registeredActions[parts[1]]) {
      const actions = Object.keys(registeredActions[parts[0]])
        .join(',');
      console.warn(`'${parts[1]}' is not a known action of ${parts[0]} (${actions}).`);

      return;
    }

    return registeredActions[parts[1]];
  }

}

export interface ActionAndProps {
  action: any;
  props: Object;
}
