'use strict';

const SPLITTER: number = +(Math.pow(2, 27) + 1.0);

export function twoProduct(a: number, b: number, result?: [number, number]): [number, number] {
  const x: number = a * b;

  const c: number = SPLITTER * a;
  const a_big: number = c - a;
  const ahi: number = c - a_big;
  const alo: number = a - ahi;

  const d: number = SPLITTER * b;
  const b_big: number = d - b;
  const bhi: number = d - b_big;
  const blo: number = b - bhi;

  const err1: number = x - ahi * bhi;
  const err2: number = err1 - alo * bhi;
  const err3: number = err2 - ahi * blo;

  const y: number = alo * blo - err3;

  if (result) {
    result[0] = y;
    result[1] = x;
    return result;
  }

  return [y, x];
}
