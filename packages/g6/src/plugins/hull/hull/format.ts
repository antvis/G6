import type { Point } from '../../../types';

export type PointObject = Record<string, number>;
export type BBox = [number, number, number, number];
export type FormatTuple = [string, string];

export const formatUtil = {
  toXy<T extends PointObject>(pointset: T[] | Point[], format?: FormatTuple): T[] | Point[] {
    if (!format) return [...pointset] as Point[];

    const xProperty = format[0].slice(1);
    const yProperty = format[1].slice(1);

    return (pointset as T[]).map((pt) => [pt[xProperty], pt[yProperty]]) as Point[];
  },

  fromXy(coordinates: Point[], format?: FormatTuple): Point[] | PointObject[] {
    if (!format) return [...coordinates];

    const xProperty = format[0].slice(1);
    const yProperty = format[1].slice(1);

    return coordinates.map(([x, y]) => ({
      [xProperty]: x,
      [yProperty]: y,
    }));
  },
};
export type PointConverter = typeof formatUtil;
