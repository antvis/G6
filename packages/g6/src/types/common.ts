export type Padding = number | number[];

export type Point = {
  x: number;
  y: number;
  z?: number;
};

export type PolyPoint = Point & {
  id?: string;
};
