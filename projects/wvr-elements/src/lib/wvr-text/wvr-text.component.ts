/* istanbul ignore file */

/* TODO: Issue #292. */
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { ThemeVariantName } from '../shared/theme';

/**
 * The Weaver Text Component allows for a node based textual entry. This will support i18n in the future.
 */
@Component({
  selector: 'wvr-text-component',
  templateUrl: './wvr-text.component.html',
  styleUrls: ['./wvr-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WvrTextComponent {

  /** The text value to be displayed in the text node. */
  @Input() value: string;

  @Input() themeVariant: ThemeVariantName;

  /** Allows for the override of font-size property for wvre-text */
  @HostBinding('style.--wvr-text-font-size') @Input() fontSize;

  /** Allows for the override of font-family property for wvre-text */
  @HostBinding('style.--wvr-text-font-family') @Input() fontFamily;

  /** Allows for the override of font-style property for wvre-text */
  @HostBinding('style.--wvr-text-font-style') @Input() fontStyle;

  /** Allows for the override of font-variant property for wvre-text */
  @HostBinding('style.--wvr-text-font-variant') @Input() fontVariant;

  /** Allows for the override of font-weight property for wvre-text */
  @HostBinding('style.--wvr-text-font-weight') @Input() fontWeight;

  /** Allows for the override of font-stretch property for wvre-text */
  @HostBinding('style.--wvr-text-font-stretch') @Input() fontStretch;

  /** Allows for the override of line-height property for wvre-text */
  @HostBinding('style.--wvr-text-line-height') @Input() lineHeight;

  _textColor;

  set textColor(value: string) {
    this._textColor = value;
  }

  @HostBinding('style.--wvr-text-color') get textColor(): string {
    return this.themeVariant ? `var(--${this.themeVariant}-button-color)` : this._textColor;
  }

  /** Allows for the override of text-align property for wvre-text */
  @HostBinding('style.--wvr-text-text-align') @Input() textAlign;

  /** Allows for the override of text-decoration property for wvre-text */
  @HostBinding('style.--wvr-text-text-decoration') @Input() textDecoration;

  /** Allows for the override of text-transform property for wvre-text */
  @HostBinding('style.--wvr-text-text-transform') @Input() textTransform;

  /** Allows for the override of text-indent property for wvre-text */
  @HostBinding('style.--wvr-text-text-indent') @Input() textIndent;

  /** Allows for the override of letter-spacing property for wvre-text */
  @HostBinding('style.--wvr-text-letter-spacing') @Input() letterSpacing;

  /** Allows for the override of direction property for wvre-text */
  @HostBinding('style.--wvr-text-direction') @Input() textDirection;

  /** Allows for the override of text-shadow property for wvre-text */
  @HostBinding('style.--wvr-text-text-shadow') @Input() textShadow;

  /** Allows for the override of word-spacing property for wvre-text */
  @HostBinding('style.--wvr-text-word-spacing') @Input() wordSpacing;

}
