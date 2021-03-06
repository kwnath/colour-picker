import { round } from './math';

/**
 *
 * Reference formula:
 * https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex
 *
 * Converts Hue, satuation and lightness to a hex value for pointer
 * @param h
 * @param s
 * @param l
 */
export const hslToHex = ({
  h,
  s = 100,
  l = 50,
}: {
  h: number;
  s?: number;
  l?: number;
}) => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const colour = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * colour)
      .toString(16)
      .padStart(2, '0'); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

export const getHueByPercentage = (percentage: number): number =>
  360 * percentage;

export interface HslColour {
  h: number;
  s: number;
  l: number;
}

export interface HsvColour {
  h: number;
  s: number;
  v: number;
}

export interface RgbaColour {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface HslaColour extends HslColour {
  a: number;
}

export interface HsvaColour extends HsvColour {
  a: number;
}

/**
 *
 * Hue
 * Saturation
 * Value
 */
export const hsvaToHsla = ({ h, s, v, a }: HsvaColour): HslaColour => {
  const hh = ((200 - s) * v) / 100;

  return {
    h: round(h),
    s: round(
      hh > 0 && hh < 200
        ? ((s * v) / 100 / (hh <= 100 ? hh : 200 - hh)) * 100
        : 0,
    ),
    l: round(hh / 2),
    a: round(a, 2),
  };
};

export const hsvaToHslString = (hsva: HsvaColour): string => {
  const { h, s, l } = hsvaToHsla(hsva);
  return `hsl(${h}, ${s}%, ${l}%)`;
};

/**
 *
 * First needs to be converted into rgba, then converting to hex is simple
 *
 * {Red}{Green}{Blue}
 */
export const hsvaToHex = (hsva: HsvaColour): string =>
  rgbaToHex(hsvaToRgba(hsva));

const format = (number: number) => {
  const hex = number.toString(16);
  return hex.length < 2 ? '0' + hex : hex;
};

export const rgbaToHex = ({ r, g, b }: RgbaColour): string => {
  return '#' + format(r) + format(g) + format(b);
};

export const hsvaToRgba = ({ h, s, v, a }: HsvaColour): RgbaColour => {
  h = (h / 360) * 6;
  s = s / 100;
  v = v / 100;

  const hh = Math.floor(h),
    b = v * (1 - s),
    c = v * (1 - (h - hh) * s),
    d = v * (1 - (1 - h + hh) * s),
    module = hh % 6;

  return {
    r: round([v, c, b, b, d, v][module] * 255),
    g: round([d, v, v, c, b, b][module] * 255),
    b: round([b, b, d, v, v, c][module] * 255),
    a: round(a, 2),
  };
};
