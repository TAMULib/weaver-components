/**
 * This defines a set of constants used to describe potential view modes.
 */
enum Mode {
    DESKTOP = 'DESKTOP', TABLET = 'TABLET', MOBILE = 'MOBILE'
}

export class ViewMode {

    private readonly _mode;

    constructor(mode: Mode) {
        this._mode = mode;
    }

    static desktop(): ViewMode {
        return new ViewMode(Mode.DESKTOP);
    }

    static tablet(): ViewMode {
        return new ViewMode(Mode.TABLET);
    }

    static mobile(): ViewMode {
        return new ViewMode(Mode.MOBILE);
    }

    isDesktop(): boolean {
        return this._mode === Mode.DESKTOP;
    }

    isTablet(): boolean {
        return this._mode === Mode.TABLET;
    }

    isMobile(): boolean {
        return this._mode === Mode.MOBILE;
    }

}
