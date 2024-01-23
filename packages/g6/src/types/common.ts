import { ID } from 'types';

export type Padding = number | number[];
export type STDPadding = [number, number, number, number];

export type Point = {
  x: number;
  y: number;
  z?: number;
};

export type PolyPoint = Point & {
  id?: ID;
};
