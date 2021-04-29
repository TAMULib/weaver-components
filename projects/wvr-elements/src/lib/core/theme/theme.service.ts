/* istanbul ignore file */

/* TODO: Issue #292. */
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { ThemeVariants } from '../../shared/theme';
import { hexToRgb, luminance, mix, yiq } from '../../shared/utility/color.utlity';
import { WvrThemeableComponent } from '../../shared/wvr-themeable.component';
import { RootState, selectThemeState } from '../store';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  currentTheme: ThemeVariants;

  themes: { [name: string]: ThemeVariants };

  themedComponents: Map<number, WvrThemeableComponent>;

  constructor(private readonly store: Store<RootState>) {
    this.themedComponents = new Map<number, WvrThemeableComponent>();
    this.store.pipe(
      select(selectThemeState),
      filter(themeState => !!themeState)
    )
      .subscribe(themeState => {
        this.themes = themeState.themes;
        this.currentTheme = this.themes[themeState.currentTheme];
        this.themedComponents.forEach((themeableComponent: WvrThemeableComponent, id: number) => {
          this.applyTheme(this.currentTheme, themeableComponent);
        });
      });
  }

  registerComponent(id: number, themeableComponent: WvrThemeableComponent): void {
    this.themedComponents.set(id, themeableComponent);
    this.applyTheme(this.currentTheme, themeableComponent);
  }

  unRegisterComponent(id: number): void {
    this.themedComponents.delete(id);
  }

  applyThemeByName(themeName: string, themeableComponent: WvrThemeableComponent): void {
    const theme = this.themes[themeName];
    this.applyTheme(theme, themeableComponent);
  }

  private applyTheme(theme: ThemeVariants, themeableComponent: WvrThemeableComponent): void {
    if (!!theme) {
      let styles = '';
      styles += this.processThemeVariants(theme, themeableComponent);
      themeableComponent.style = styles;
    }
  }

  // tslint:disable-next-line:prefer-function-over-method
  private processThemeVariants(theme: ThemeVariants, themeableComponent: WvrThemeableComponent): string {
    const computedStyle = getComputedStyle(themeableComponent.eRef.nativeElement);

    const yiqContrastedThreshold = Number(computedStyle.getPropertyValue('--yiq-contrasted-threshold')
      .trim());
    const yiqTextDark = computedStyle.getPropertyValue('--yiq-text-dark')
      .trim();
    const yiqTextLight = computedStyle.getPropertyValue('--yiq-text-light')
      .trim();

    const themeColorInterval = parseInt(computedStyle.getPropertyValue('--theme-color-interval')
      .trim(), 10);

    const black = computedStyle.getPropertyValue('--black')
      .trim();
    const white = computedStyle.getPropertyValue('--white')
      .trim();

    const constrast = (level: number) => (level > 0 ? black : white);
    const yiqConstrast = (value: number) => (value >= yiqContrastedThreshold ? yiqTextDark : yiqTextLight);

    let styles = '';

    const appendStyle = (customProperty: string, value: string): void => {
      styles += themeableComponent.themeOverrides[customProperty]
        ? `${customProperty}: ${themeableComponent.themeOverrides[customProperty]};`
        : `${customProperty}: ${value};`;
    };

    // update variant variables
    for (const k of Object.keys(theme)) {
      const key = `--${k}`;
      const value = theme[k].baseColor;

      // update theme variable
      styles += `${key}: ${value};`;

      themeableComponent.variantTypes.forEach(variantType => {

        switch (variantType) {
          case 'alert':
            const alertBackgroundLevel = Number(computedStyle.getPropertyValue('--alert-bg-level')
              .trim());
            const alertBorderLevel = Number(computedStyle.getPropertyValue('--alert-border-level')
              .trim());
            const alertColorLevel = Number(computedStyle.getPropertyValue('--alert-color-level')
              .trim());

            // update alert variants
            const alertBgValue = mix(constrast(alertBackgroundLevel), value, Math.abs(alertBackgroundLevel) * themeColorInterval);
            appendStyle(`${key}-alert-bg`, alertBgValue);

            const alertBorderValue = mix(constrast(alertBorderLevel), value, Math.abs(alertBorderLevel) * themeColorInterval);
            appendStyle(`${key}-alert-border`, alertBorderValue);

            const alertColorValue = mix(constrast(alertColorLevel), value, Math.abs(alertColorLevel) * themeColorInterval);
            appendStyle(`${key}-alert-color`, alertColorValue);
            break;
          case 'badge':
            // update badge variants
            const badgeBgValue = value;
            appendStyle(`${key}-badge-bg`, badgeBgValue);

            const badgeColorValue = yiqConstrast(yiq(value));
            appendStyle(`${key}-badge-color`, badgeColorValue);
            break;
          case 'button':
            // update button outline variants
            const buttonOutlineColorValue = value;
            appendStyle(`${key}-button-outline-color`, buttonOutlineColorValue);

            const buttonOutlineColorHoverValue = yiqConstrast(yiq(value));
            appendStyle(`${key}-button-outline-color-hover`, buttonOutlineColorHoverValue);

            const bobsrgba = hexToRgb(value);
            const buttonOutlineBoxShadowColorValue = `rgba(${bobsrgba.r}, ${bobsrgba.g}, ${bobsrgba.b}, .5)`;
            appendStyle(`${key}-button-outline-box-shadow-color`, buttonOutlineBoxShadowColorValue);

            // update button variants
            const buttonColorValue = yiqConstrast(yiq(value));
            appendStyle(`${key}-button-color`, buttonColorValue);

            const buttonBgValue = value;
            appendStyle(`${key}-button-bg`, buttonBgValue);

            const buttonBorderValue = value;
            appendStyle(`${key}-button-border`, buttonBorderValue);

            const buttonHoverColorValue = yiqConstrast(yiq(luminance(value, -0.1165)));
            appendStyle(`${key}-button-hover-color`, buttonHoverColorValue);

            const buttonHoverBgValue = luminance(value, -0.1165);
            appendStyle(`${key}-button-hover-bg`, buttonHoverBgValue);

            const buttonHoverBorderValue = luminance(value, -0.1415);
            appendStyle(`${key}-button-hover-border`, buttonHoverBorderValue);

            const buttonActiveColorValue = yiqConstrast(yiq(luminance(value, -0.1415)));
            appendStyle(`${key}-button-active-color`, buttonActiveColorValue);

            const buttonActiveBgValue = luminance(value, -0.1415);
            appendStyle(`${key}-button-active-bg`, buttonActiveBgValue);

            const buttonActiveBorderValue = luminance(value, -0.17);
            appendStyle(`${key}-button-active-border`, buttonActiveBorderValue);

            const bbsrgba = hexToRgb(mix(yiqConstrast(yiq(luminance(buttonBgValue, -0.1165))), buttonBorderValue, 15));
            const buttonBoxShadowColorValue = `rgba(${bbsrgba.r}, ${bbsrgba.g}, ${bbsrgba.b}, .5)`;
            appendStyle(`${key}-button-box-shadow-color`, buttonBoxShadowColorValue);
            break;
          case 'default':
              // update default outline variants
              const defaultOutlineColorValue = value;
              appendStyle(`${key}-default-outline-color`, defaultOutlineColorValue);

              const defaultOutlineColorHoverValue = yiqConstrast(yiq(value));
              appendStyle(`${key}-default-outline-color-hover`, defaultOutlineColorHoverValue);

              const dvobsrgba = hexToRgb(value);
              const defaultOutlineBoxShadowColorValue = `rgba(${dvobsrgba.r}, ${dvobsrgba.g}, ${dvobsrgba.b}, .5)`;
              appendStyle(`${key}-default-outline-box-shadow-color`, defaultOutlineBoxShadowColorValue);

              // update default variants
              const defaultColorValue = yiqConstrast(yiq(value));
              appendStyle(`${key}-default-color`, defaultColorValue);

              const defaultBgValue = value;
              appendStyle(`${key}-default-bg`, defaultBgValue);

              const defaultBorderValue = value;
              appendStyle(`${key}-default-border`, defaultBorderValue);

              const defaultHoverColorValue = yiqConstrast(yiq(luminance(value, -0.1165)));
              appendStyle(`${key}-default-hover-color`, defaultHoverColorValue);

              const defaultHoverBgValue = luminance(value, -0.1165);
              appendStyle(`${key}-default-hover-bg`, defaultHoverBgValue);

              const defaultHoverBorderValue = luminance(value, -0.1415);
              appendStyle(`${key}-default-hover-border`, defaultHoverBorderValue);

              const defaultActiveColorValue = yiqConstrast(yiq(luminance(value, -0.1415)));
              appendStyle(`${key}-default-active-color`, defaultActiveColorValue);

              const defaultActiveBgValue = luminance(value, -0.1415);
              appendStyle(`${key}-default-active-bg`, defaultActiveBgValue);

              const defaultActiveBorderValue = luminance(value, -0.17);
              appendStyle(`${key}-default-active-border`, defaultActiveBorderValue);

              const dbsrgba = hexToRgb(mix(yiqConstrast(yiq(luminance(defaultBgValue, -0.1165))), defaultBorderValue, 15));
              const defaultBoxShadowColorValue = `rgba(${dbsrgba.r}, ${dbsrgba.g}, ${dbsrgba.b}, .5)`;
              appendStyle(`${key}-default-box-shadow-color`, defaultBoxShadowColorValue);
              break;
          case 'list-group-item':
            const listGroupItemBackgroundLevel = Number(computedStyle.getPropertyValue('--list-group-item-bg-level')
              .trim());
            const listGroupItemColorLevel = Number(computedStyle.getPropertyValue('--list-group-item-color-level')
              .trim());

            // update list item group variants
            // tslint:disable-next-line:max-line-length
            const listGroupItemBgValue = mix(constrast(listGroupItemBackgroundLevel), value, Math.abs(listGroupItemBackgroundLevel) * themeColorInterval);
            appendStyle(`${key}-list-group-item-bg`, listGroupItemBgValue);

            // tslint:disable-next-line:max-line-length
            const listGroupItemColorValue = mix(constrast(listGroupItemColorLevel), value, Math.abs(listGroupItemColorLevel) * themeColorInterval);
            appendStyle(`${key}-list-group-item-color`, listGroupItemColorValue);
            break;
          case 'table':
            const tableBackgroundLevel = Number(computedStyle.getPropertyValue('--table-bg-level')
              .trim());
            const tableBorderLevel = Number(computedStyle.getPropertyValue('--table-border-level')
              .trim());

            // update table variants
            const tableBgValue = mix(constrast(tableBackgroundLevel), value, Math.abs(tableBackgroundLevel) * themeColorInterval);
            appendStyle(`${key}-table-bg`, tableBgValue);

            const tableBorderValue = mix(constrast(tableBorderLevel), value, Math.abs(tableBorderLevel) * themeColorInterval);
            appendStyle(`${key}-table-border`, tableBorderValue);
            break;
          default: break;
        }

      });
    }

    return styles;
  }

}
