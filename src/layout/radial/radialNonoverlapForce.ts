import { Matrix, IPointTuple } from '../../types';
import { Point } from '@antv/g-base';

const SPEED_DIVISOR = 800;

export type RadialNonoverlapForceParam = {
  positions: IPointTuple[];
  adjMatrix: Matrix[];
  focusID: number;
  radii: number[];
  iterations?: number;
  height?: number;
  width?: number;
  speed?: number;
  gravity?: number;
  nodeSizeFunc: (node: any) => number;
  k: number;
  strictRadial: boolean;
  nodes: any[];
};

export default class RadialNonoverlapForce {
  /** node positions */
  public positions: IPointTuple[];

  /** adjacency matrix */
  public adjMatrix: Matrix[];

  /** focus node */
  public focusID: number;

  /** radii */
  public radii: number[];

  /** the number of iterations */
  public iterations: number;

  /** the height of the canvas */
  public height: number;

  /** the width of the canvas */
  public width: number;

  /** the moving speed */
  public speed: number;

  /** the gravity */
  public gravity: number;

  /** the node size */
  public nodeSizeFunc: (node: any) => number;

  /** the strength of forces */
  public k: number;

  /** if each circle can be separated into subcircles to avoid overlappings */
  public strictRadial: boolean;

  /** the nodes data */
  public nodes: any[];

  private maxDisplace: number | undefined;

  private disp: Point[] = [];

  constructor(params: RadialNonoverlapForceParam) {
    this.positions = params.positions;
    this.adjMatrix = params.adjMatrix;
    this.focusID = params.focusID;
    this.radii = params.radii;
    this.iterations = params.iterations || 10;
    this.height = params.height || 10;
    this.width = params.width || 10;
    this.speed = params.speed || 100;
    this.gravity = params.gravity || 10;
    this.nodeSizeFunc = params.nodeSizeFunc;
    this.k = params.k || 5;
    this.strictRadial = params.strictRadial;
    this.nodes = params.nodes;
  }

  public layout(): IPointTuple[] {
    const self = this;
    const positions = self.positions;
    const disp: Point[] = [];
    const iterations = self.iterations;
    const maxDisplace = self.width / 10;
    self.maxDisplace = maxDisplace;
    self.disp = disp;
    for (let i = 0; i < iterations; i++) {
      positions.forEach((_, k) => {
        disp[k] = { x: 0, y: 0 };
      });
      // 给重叠的节点增加斥力
      self.getRepulsion();
      self.updatePositions();
    }
    return positions;
  }

  private getRepulsion() {
    const self = this;
    const positions = self.positions;
    const nodes = self.nodes;
    const disp = self.disp;
    const k = self.k;
    const radii = self.radii || [];

    positions.forEach((v: IPointTuple, i: number) => {
      disp[i] = { x: 0, y: 0 };
      positions.forEach((u: IPointTuple, j: number) => {
        if (i === j) {
          return;
        }
        // v and u are not on the same circle, return
        if (radii[i] !== radii[j]) {
          return;
        }
        let vecx = v[0] - u[0];
        let vecy = v[1] - u[1];
        let vecLength = Math.sqrt(vecx * vecx + vecy * vecy);
        if (vecLength === 0) {
          vecLength = 1;
          const sign = i > j ? 1 : -1;
          vecx = 0.01 * sign;
          vecy = 0.01 * sign;
        }
        // these two nodes overlap
        if (vecLength < self.nodeSizeFunc(nodes[i]) / 2 + self.nodeSizeFunc(nodes[j]) / 2) {
          const common = (k * k) / vecLength;
          disp[i].x += (vecx / vecLength) * common;
          disp[i].y += (vecy / vecLength) * common;
        }
      });
    });
  }

  private updatePositions() {
    const self = this;
    const positions = self.positions;
    const disp = self.disp;
    const speed = self.speed;
    const strictRadial = self.strictRadial;
    const f = self.focusID;
    const maxDisplace = self.maxDisplace || self.width / 10;

    if (strictRadial) {
      disp.forEach((di, i) => {
        const vx = positions[i][0] - positions[f][0];
        const vy = positions[i][1] - positions[f][1];
        const vLength = Math.sqrt(vx * vx + vy * vy);
        let vpx = vy / vLength;
        let vpy = -vx / vLength;
        const diLength = Math.sqrt(di.x * di.x + di.y * di.y);
        let alpha = Math.acos((vpx * di.x + vpy * di.y) / diLength);
        if (alpha > Math.PI / 2) {
          alpha -= Math.PI / 2;
          vpx *= -1;
          vpy *= -1;
        }
        const tdispLength = Math.cos(alpha) * diLength;
        di.x = vpx * tdispLength;
        di.y = vpy * tdispLength;
      });
    }

    // move
    const radii = self.radii;
    positions.forEach((n, i) => {
      if (i === f) {
        return;
      }
      const distLength = Math.sqrt(disp[i].x * disp[i].x + disp[i].y * disp[i].y);
      if (distLength > 0 && i !== f) {
        const limitedDist = Math.min(maxDisplace * (speed / SPEED_DIVISOR), distLength);
        n[0] += (disp[i].x / distLength) * limitedDist;
        n[1] += (disp[i].y / distLength) * limitedDist;
        if (strictRadial) {
          let vx = n[0] - positions[f][0];
          let vy = n[1] - positions[f][1];
          const nfDis = Math.sqrt(vx * vx + vy * vy);
          vx = (vx / nfDis) * radii[i];
          vy = (vy / nfDis) * radii[i];
          n[0] = positions[f][0] + vx;
          n[1] = positions[f][1] + vy;
        }
      }
    });
  }
}
