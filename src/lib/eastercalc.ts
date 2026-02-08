/**
Taken from the @pacote/computus npm library: https://github.com/PacoteJS/pacote/blob/main/packages/computus/src/index.ts

MIT License

Copyright (c) 2019 Luís Rodrigues

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

function integerDivision(dividend: number, divider: number): number {
  return Math.floor(dividend / divider);
}

/**
 * This function takes a year and returns a `Date` object with the Gregorian
 * calendar Easter day on that year at midnight.
 *
 * The function uses a version of the Meeus/Jones/Butcher algorithm published
 * by _New Scientist_ on 30 March 1961.
 *
 * @example
 * ```typescript
 * import { gregorian } from '@pacote/computus'
 *
 * gregorian(2020) // .toLocaleDateString() => '4/12/2020'
 * ```
 *
 * @param year Year.
 *
 * @returns Easter date for the provided year.
 */
function easterCalc(year: number): [number, number, number] {
  const a = year % 19;
  const b = integerDivision(year, 100);
  const c = year % 100;
  const d = integerDivision(b, 4);
  const e = b % 4;
  const g = integerDivision(8 * b + c, 25);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = integerDivision(c, 4);
  const k = c % 4;
  const l = (2 * e + 2 * i - h - k + 32) % 7;
  const m = integerDivision(a + 11 * h + 19 * l, 433);
  const n = integerDivision(h + l - 7 * m + 90, 25);
  const p = (h + l - 7 * m + 33 * n + 19) % 32;

  return [year, n, p];
}

export default easterCalc;
