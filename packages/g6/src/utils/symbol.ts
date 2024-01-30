import type { PathArray } from '@antv/util';

export type SymbolFactor = (width: number, height: number) => PathArray;

/**
 * ○
 * @param width
 * @param height
 */
export const circle: SymbolFactor = (width: number, height: number) => {
  const r = Math.max(width, height) / 2;
  return [['M', 0, 0], ['A', r, r, 0, 1, 0, 2 * r, 0], ['A', r, r, 0, 1, 0, 0, 0], ['Z']];
};

/**
 * ▷
 * @param width
 * @param height
 */
export const triangle: SymbolFactor = (width: number, height: number) => {
  return [['M', 0, 0], ['L', width, -height / 2], ['L', width, height / 2], ['Z']];
};

/**
 * ◇
 * @param width
 * @param height
 */
export const diamond: SymbolFactor = (width: number, height: number) => {
  return [['M', 0, 0], ['L', width / 2, -height / 2], ['L', width, 0], ['L', width / 2, height / 2], ['Z']];
};

/**
 * >>
 * @param width
 * @param height
 */
export const vee: SymbolFactor = (width: number, height: number) => {
  return [['M', 0, 0], ['L', width, -height / 2], ['L', (2 * width) / 3, 0], ['L', width, height / 2], ['Z']];
};

/**
 * □
 * @param width
 * @param height
 */
export const rect: SymbolFactor = (width: number, height: number) => {
  return [['M', 0, -height / 2], ['L', width, -height / 2], ['L', width, height / 2], ['L', 0, height / 2], ['Z']];
};

/**
 * □▷
 * @param width
 * @param height
 */
export const triangleRect: SymbolFactor = (width: number, height: number) => {
  const tWidth = width / 2;
  const rWidth = width / 7;
  const rBeginX = width - rWidth;
  return [
    ['M', 0, 0],
    ['L', tWidth, -height / 2],
    ['L', tWidth, height / 2],
    ['Z'],
    ['M', rBeginX, -height / 2],
    ['L', rBeginX + rWidth, -height / 2],
    ['L', rBeginX + rWidth, height / 2],
    ['L', rBeginX, height / 2],
    ['Z'],
  ];
};

/**
 * >
 * @param width
 * @param height
 */
export const simple: SymbolFactor = (width: number, height: number) => {
  return [
    ['M', width, -height / 2],
    ['L', 0, 0],
    ['L', width, height / 2],
  ];
};
