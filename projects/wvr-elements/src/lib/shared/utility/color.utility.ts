/* istanbul ignore file */

/* TODO: Issue #292. */
import * as nameToHex from './nameToHex.json';

const expandHexShorthand = (hex: string): string => {
  // expand shorthand form (e.g. "03f") to full form (e.g. "0033ff")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

  return hex.replace(shorthandRegex, (m, r: string, g: string, b: string) => r + r + g + g + b + b);
};

const colorToHex = (rgb: string): string => {
  // tslint:disable-next-line: max-line-length
  const matches = rgb.match(/^(rgb\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\)|rgba\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0?\.\d|1(\.0)?)\)|hsl\((0|360|35\d|3[0-4]\d|[12]\d\d|0?\d?\d),(0|100|\d{1,2})%,(0|100|\d{1,2})%\)|hsla\((0|360|35\d|3[0-4]\d|[12]\d\d|0?\d?\d),(0|100|\d{1,2})%,(0|100|\d{1,2})%,(0?\.\d|1(\.0)?)\))$/);
  // tslint:disable-next-line:newline-per-chained-call
  const hex = x => (`0${parseInt(x, 10).toString(16)}`).slice(-2);

  return (hex(matches[1]) + hex(matches[2]) + hex(matches[3])).toUpperCase();
};

const normalizeColor = (color: string): string => {
  let value = color.trim();
  if (value.charAt(0) !== '#') {
    value = value.indexOf('rgb') !== 0 ? nameToHex[color] : colorToHex(color);
  } else {
    if (value.length === 4) {
      value = expandHexShorthand(color);
    }
  }

  return !!value ? value.replace(/#/g, '') : 'ffffff';
};

const hexToRgb = (hex: string): any => {
  const value = normalizeColor(hex);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : undefined;
};

const mix = (baseColor: string, color: string, weight: number): string => {
  const d2h = (d): string => d.toString(16); // convert a decimal value to hex
  const h2d = (h): number => parseInt(h, 16); // convert a hex value to decimal
  const w = typeof weight !== 'undefined' ? weight : 50; // set the weight to 50%, if that argument is omitted
  let resultColor = '#';
  for (let i = 0; i <= 5; i += 2) {
    // loop through each of the 3 hex pairs—red, green, and blue
    const v1 = h2d(normalizeColor(baseColor)
      .substr(i, 2)); // extract the current pairs
    const v2 = h2d(normalizeColor(color)
      .substr(i, 2));
    // combine the current pairs from each source color, according to the specified weight
    let val = d2h(Math.round(v2 + (v1 - v2) * (w / 100)));
    while (val.length < 2) {
      val = `0${val}`;
    } // prepend a '0' if val results in a single digit
    resultColor += val; // concatenate val to our new color string
  }

  return resultColor;
};

// TODO: replace with closer match to sass darken and lighten
const luminance = (color: string, lum: number): string => {
  const l = lum || Number(0);
  // convert to decimal and change luminosity
  let rgb = '#';
  let c: number;
  let i: number;
  let cs: string;
  for (i = 0; i < 3; i++) {
    c = parseInt(normalizeColor(color)
      .substr(i * 2, 2), 16);
    cs = Math.round(Math.min(Math.max(0, c + c * l), 255))
      .toString(16);
    rgb += (`00${cs}`).substr(cs.length);
  }

  return rgb;
};

const yiq = (color: string): number => {
  const rgb = hexToRgb(color);

  return Math.round((rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000);
};

export { hexToRgb, luminance, mix, yiq };
