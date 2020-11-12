import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { ThemeVariants } from '../../shared/theme';
import { hexToRgb, luminance, mix, yiq } from '../../shared/utility/color.utlity';
import { WvrThemeableComponent } from '../../shared/wvr-themeable.component';
import { RootState, selectTheme } from '../store';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private readonly store: Store<RootState>) {

  }

  applyThemeStyle(colorThemeName: string, themeableComponent: WvrThemeableComponent): void {
    this.store.select(selectTheme(colorThemeName))
      .pipe(filter(theme => !!theme))
      .subscribe(theme => {
        let styles = '';
        styles += this.processThemeVariants(theme, themeableComponent);
        themeableComponent.style = styles;
      });
  }

  // tslint:disable-next-line:prefer-function-over-method
  private processThemeVariants(theme: ThemeVariants, themeableComponent: WvrThemeableComponent): string {
    const computedStyle = getComputedStyle(themeableComponent._eRef.nativeElement);

    const yiqContrastedThreshold = Number(computedStyle.getPropertyValue('--yiq-contrasted-threshold')
      .trim());
    const yiqTextDark = computedStyle.getPropertyValue('--yiq-text-dark')
      .trim();
    const yiqTextLight = computedStyle.getPropertyValue('--yiq-text-light')
      .trim();

    const themeColorInterval = parseInt(computedStyle.getPropertyValue('--theme-color-interval')
      .trim(), 10);

    const alertBackgroundLevel = Number(computedStyle.getPropertyValue('--alert-bg-level')
      .trim());
    const alertBorderLevel = Number(computedStyle.getPropertyValue('--alert-border-level')
      .trim());
    const alertColorLevel = Number(computedStyle.getPropertyValue('--alert-color-level')
      .trim());

    const listGroupItemBackgroundLevel = Number(computedStyle.getPropertyValue('--list-group-item-bg-level')
      .trim());
    const listGroupItemColorLevel = Number(computedStyle.getPropertyValue('--list-group-item-color-level')
      .trim());

    const tableBackgroundLevel = Number(computedStyle.getPropertyValue('--table-bg-level')
      .trim());
    const tableBorderLevel = Number(computedStyle.getPropertyValue('--table-border-level')
      .trim());

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
          case 'list-group-item':
            // update list item group variants
            // tslint:disable-next-line:max-line-length
            const listGroupItemBgValue = mix(constrast(listGroupItemBackgroundLevel), value, Math.abs(listGroupItemBackgroundLevel) * themeColorInterval);
            appendStyle(`${key}-list-group-item-bg`, listGroupItemBgValue);

            // tslint:disable-next-line:max-line-length
            const listGroupItemColorValue = mix(constrast(listGroupItemColorLevel), value, Math.abs(listGroupItemColorLevel) * themeColorInterval);
            appendStyle(`${key}-list-group-item-color`, listGroupItemColorValue);
            break;
          case 'table':
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
