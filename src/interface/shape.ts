import { IPoint } from './math'

export type IShapeStyle = Partial<{
  x: number;
  y: number;
  r: number;
  stroke: string | null;
  strokeOpacity: number;
  fill: string | null;
  fillOpacity: number;
  lineWidth: number;
  path: string | object[];
  points: object[];
  matrix: number[];
  opacity: number;
  [key: string]: string | number | object | object[]
}>

export interface IRect extends IPoint {
  width: number;
  height: number;
}

export interface ICircle extends IPoint {
  r: number;
}

export interface IEllipse extends IPoint {
  rx: number;
  ry: number;
}
