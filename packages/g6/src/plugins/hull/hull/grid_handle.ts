import type { Point } from '../../../types';
import type { BBox } from './format';

export class Grid {
  private _cells: Point[][][] = [];
  private _cellSize: number;
  private _reverseCellSize: number;
  constructor(points: Point[], cellSize: number) {
    this._cellSize = cellSize;
    this._reverseCellSize = 1 / cellSize;
    for (const point of points) {
      const x = this.coordToCellNum(point[0]);
      const y = this.coordToCellNum(point[1]);

      if (!this._cells[x]) {
        this._cells[x] = [];
      }

      if (!this._cells[x][y]) {
        this._cells[x][y] = [];
      }

      this._cells[x][y].push(point);
    }
  }
  cellPoints(x: number, y: number): Point[] {
    return this._cells[x]?.[y] || [];
  }
  rangePoints(bbox: BBox): Point[] {
    const tlCellX = this.coordToCellNum(bbox[0]);
    const tlCellY = this.coordToCellNum(bbox[1]);
    const brCellX = this.coordToCellNum(bbox[2]);
    const brCellY = this.coordToCellNum(bbox[3]);
    const points: Point[] = [];
    for (let x = tlCellX; x <= brCellX; x++) {
      for (let y = tlCellY; y <= brCellY; y++) {
        const cell = this.cellPoints(x, y);
        for (const point of cell) {
          points.push(point);
        }
      }
    }
    return points;
  }
  removePoint(point: Point): Point[] {
    const cellX = this.coordToCellNum(point[0]);
    const cellY = this.coordToCellNum(point[1]);
    const cell = this._cells[cellX][cellY];
    const index = cell.findIndex(([px, py]) => px === point[0] && py === point[1]);
    if (index > -1) {
      cell.splice(index, 1);
    }
    return cell;
  }
  private trunc(val: number): number {
    return Math.trunc(val);
  }
  coordToCellNum(x: number): number {
    return this.trunc(x * this._reverseCellSize);
  }
  extendBbox(bbox: BBox, scaleFactor: number): BBox {
    return [
      bbox[0] - scaleFactor * this._cellSize,
      bbox[1] - scaleFactor * this._cellSize,
      bbox[2] + scaleFactor * this._cellSize,
      bbox[3] + scaleFactor * this._cellSize,
    ];
  }
}

export function grid(points: Point[], cellSize: number): Grid {
  return new Grid(points, cellSize);
}
