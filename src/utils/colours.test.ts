import { assert, expect, should } from 'chai';
import {
  getHueByPercentage,
  hslToHex,
  hsvaToHsla,
  hsvaToHslString,
} from './colours';

describe('Colours', () => {
  it('should convert hsl to hex', () => {
    const hex = hslToHex({ h: 195, s: 100, l: 50 });
    assert.equal(hex, '#00bfff');
  });

  it('should get the hue by percentage', () => {
    const PERCENTAGE = 50;
    const hue = getHueByPercentage(PERCENTAGE);

    assert.equal(360 * PERCENTAGE, hue);
  });

  it('should convert hsva to hsla', () => {
    const hsla = hsvaToHsla({ h: 50, s: 100, v: 100, a: 1 });

    expect(hsla).to.deep.equal({
      h: 50,
      s: 100,
      l: 50,
      a: 1,
    });
  });

  it('should convert hsva to hsl string', () => {
    const hsl = hsvaToHslString({ h: 50, s: 100, v: 100, a: 1 });

    assert.equal(hsl, 'hsl(50, 100%, 50%)');
  });
});
