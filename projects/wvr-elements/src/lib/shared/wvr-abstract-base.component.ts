import { HostBinding, Input } from '@angular/core';

export abstract class WvrAbstractBaseComponent {

    /** Allows for the override of the --tl-default-font-size css variable. */
    @HostBinding('style.--tl-font-size') _fontSize; // (this.inheritFontStyle === 'false') ? '23px' : 'inherit';

    /** Allows for the override of the --tl-font-family-sans-serif css variable. */
    @HostBinding('style.--tl-font-family-sans-serif') _fontFamily; // = (this.inheritFontStyle === 'false') ? 'sans-serif' : 'inherit';

    @Input() set inheritFontStyle(value: 'true' | 'false') {
      this._fontSize = (value === 'true') ? 'inherit' : 'var(--tl-default-font-size)';
      this._fontFamily = (value === 'true') ? 'inherit' : 'var(--tl-default-font-family-sans-serif)';
    }

}
