import { ID } from 'types';

export type Padding = number | number[];
export type StandardPadding = [number, number, number, number];

export type Point = {
  x: number;
  y: number;
  z?: number;
};

export type PolyPoint = Point & {
  id?: ID;
};

export type Bounds = {
  min: [number, number, number];
  max: [number, number, number];
  center: [number, number, number];
  halfExtents: [number, number, number];
};
