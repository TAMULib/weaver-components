import { ElementRef, Inject, Injectable } from '@angular/core';
import { AppConfig, APP_CONFIG } from '../shared/config';
import { ThemeVariants } from '../shared/theme';
import { colorThemes } from '../shared/theme/color-themes';
import { WvrThemeableComponent } from '../shared/theme/wvr-themeable.component';
import { hexToRgb, luminance, mix, yiq } from '../shared/utility/color.utlity';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(@Inject(APP_CONFIG) private readonly appConfig: AppConfig) {

  }

  applyThemeStyle(colorThemeName: string, themeableComponent: WvrThemeableComponent): void {
    let styles = '';
    styles += this.processThemeVariants(colorThemes[colorThemeName].default, themeableComponent._eRef);
    themeableComponent.style = styles;
  }

  // tslint:disable-next-line:prefer-function-over-method
  private processThemeVariants(themeVariants: ThemeVariants, elementRef: ElementRef<HTMLElement>): string {
    const computedStyle = getComputedStyle(elementRef.nativeElement);

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

    // update variant variables
    for (const k of Object.keys(themeVariants)) {
      const key = `--${k}`;
      const value = themeVariants[k].baseColor;

      // update theme variable
      styles += `${key}: ${value};`;

      // update alert varients
      const alertBgValue = mix(constrast(alertBackgroundLevel), value, Math.abs(alertBackgroundLevel) * themeColorInterval);
      styles += `${key}-alert-bg: ${alertBgValue};`;

      const alertBorderValue = mix(constrast(alertBorderLevel), value, Math.abs(alertBorderLevel) * themeColorInterval);
      styles += `${key}-alert-border: ${alertBorderValue};`;

      const alertColorValue = mix(constrast(alertColorLevel), value, Math.abs(alertColorLevel) * themeColorInterval);
      styles += `${key}-alert-color: ${alertColorValue};`;

      // update badge varients
      const badgeBgValue = value;
      styles += `${key}-badge-bg: ${badgeBgValue};`;

      const badgeColorValue = yiqConstrast(yiq(value));
      styles += `${key}-badge-color: ${badgeColorValue};`;

      // update list item group varients
      // tslint:disable-next-line:max-line-length
      const listGroupItemBgValue = mix(constrast(listGroupItemBackgroundLevel), value, Math.abs(listGroupItemBackgroundLevel) * themeColorInterval);
      styles += `${key}-list-group-item-bg: ${listGroupItemBgValue};`;

      // tslint:disable-next-line:max-line-length
      const listGroupItemColorValue = mix(constrast(listGroupItemColorLevel), value, Math.abs(listGroupItemColorLevel) * themeColorInterval);
      styles += `${key}-list-group-item-color: ${listGroupItemColorValue};`;

      // update table varients
      const tableBgValue = mix(constrast(tableBackgroundLevel), value, Math.abs(tableBackgroundLevel) * themeColorInterval);
      styles += `${key}-table-bg: ${tableBgValue};`;

      const tableBorderValue = mix(constrast(tableBorderLevel), value, Math.abs(tableBorderLevel) * themeColorInterval);
      styles += `${key}-table-border: ${tableBorderValue};`;

      // update button outline varients
      const buttonOutlineColorValue = value;
      styles += `${key}-button-outline-color: ${buttonOutlineColorValue};`;

      const buttonOutlineColorHoverValue = yiqConstrast(yiq(value));
      styles += `${key}-button-outline-color-hover: ${buttonOutlineColorHoverValue};`;

      const bobsrgba = hexToRgb(value);
      const buttonOutlineBoxShadowColorValue = `rgba(${bobsrgba.r}, ${bobsrgba.g}, ${bobsrgba.b}, .5)`;
      styles += `${key}-button-outline-box-shadow-color: ${buttonOutlineBoxShadowColorValue};`;

      // update button varients
      const buttonColorValue = yiqConstrast(yiq(value));
      styles += `${key}-button-color: ${buttonColorValue};`;

      const buttonBgValue = value;
      styles += `${key}-button-bg: ${buttonBgValue};`;

      const buttonBorderValue = value;
      styles += `${key}-button-border: ${buttonBorderValue};`;

      const buttonHoverColorValue = yiqConstrast(yiq(luminance(value, -0.1165)));
      styles += `${key}-button-hover-color: ${buttonHoverColorValue};`;

      const buttonHoverBgValue = luminance(value, -0.1165);
      styles += `${key}-button-hover-bg: ${buttonHoverBgValue};`;

      const buttonHoverBorderValue = luminance(value, -0.1415);
      styles += `${key}-button-hover-border: ${buttonHoverBorderValue};`;

      const buttonActiveColorValue = yiqConstrast(yiq(luminance(value, -0.1415)));
      styles += `${key}-button-active-color: ${buttonActiveColorValue};`;

      const buttonActiveBgValue = luminance(value, -0.1415);
      styles += `${key}-button-active-bg: ${buttonActiveBgValue};`;

      const buttonActiveBorderValue = luminance(value, -0.17);
      styles += `${key}-button-active-border: ${buttonActiveBorderValue};`;

      const bbsrgba = hexToRgb(mix(yiqConstrast(yiq(luminance(buttonBgValue, -0.1165))), buttonBorderValue, 15));
      const buttonBoxShadowColorValue = `rgba(${bbsrgba.r}, ${bbsrgba.g}, ${bbsrgba.b}, .5)`;
      styles += `${key}-button-box-shadow-color: ${buttonBoxShadowColorValue};`;

    }

    return styles;
  }

}
