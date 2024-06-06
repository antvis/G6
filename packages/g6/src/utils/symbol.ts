/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
import type { PathArray } from '@antv/util';

export type SymbolFactor = (width: number, height: number) => PathArray;

/**
 * ○
 */
export const circle: SymbolFactor = (width: number, height: number) => {
  const r = Math.max(width, height) / 2;
  return [['M', -width / 2, 0], ['A', r, r, 0, 1, 0, 2 * r - width / 2, 0], ['A', r, r, 0, 1, 0, -width / 2, 0], ['Z']];
};

/**
 * ▷
 */
export const triangle: SymbolFactor = (width: number, height: number) => {
  return [['M', -width / 2, 0], ['L', width / 2, -height / 2], ['L', width / 2, height / 2], ['Z']];
};

/**
 * ◇
 */
export const diamond: SymbolFactor = (width: number, height: number) => {
  return [['M', -width / 2, 0], ['L', 0, -height / 2], ['L', width / 2, 0], ['L', 0, height / 2], ['Z']];
};

/**
 * >>
 */
export const vee: SymbolFactor = (width: number, height: number) => {
  return [
    ['M', -width / 2, 0],
    ['L', width / 2, -height / 2],
    ['L', (4 * width) / 5 - width / 2, 0],
    ['L', width / 2, height / 2],
    ['Z'],
  ];
};

/**
 * □
 */
export const rect: SymbolFactor = (width: number, height: number) => {
  return [
    ['M', -width / 2, -height / 2],
    ['L', width / 2, -height / 2],
    ['L', width / 2, height / 2],
    ['L', -width / 2, height / 2],
    ['Z'],
  ];
};

/**
 * □▷
 */
export const triangleRect: SymbolFactor = (width: number, height: number) => {
  const tWidth = width / 2;
  const rWidth = width / 7;
  const rBeginX = width - rWidth;
  return [
    ['M', -tWidth, 0],
    ['L', 0, -height / 2],
    ['L', 0, height / 2],
    ['Z'],
    ['M', rBeginX - tWidth, -height / 2],
    ['L', rBeginX + rWidth - tWidth, -height / 2],
    ['L', rBeginX + rWidth - tWidth, height / 2],
    ['L', rBeginX - tWidth, height / 2],
    ['Z'],
  ];
};

/**
 * >
 */
export const simple: SymbolFactor = (width: number, height: number) => {
  return [
    ['M', width / 2, -height / 2],
    ['L', -width / 2, 0],
    ['L', width / 2, 0],
    ['L', -width / 2, 0],
    ['L', width / 2, height / 2],
  ];
};
