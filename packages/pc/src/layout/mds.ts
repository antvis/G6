/**
 * @fileOverview MDS layout
 * @author shiwu.wyy@antfin.com
 */

import { IPointTuple, Matrix } from '../types';

import { Matrix as MLMatrix, SingularValueDecomposition } from 'ml-matrix';

import { floydWarshall, getAdjMatrix, scaleMatrix } from '../util/math';
import { BaseLayout } from './layout';

/**
 * mds 布局
 */
export default class MDSLayout extends BaseLayout {
  /** 布局中心 */
  public center: IPointTuple = [0, 0];

  /** 边长度 */
  public linkDistance: number = 50;

  private scaledDistances: Matrix[] | null = null;

  public getDefaultCfg() {
    return {
      center: [0, 0],
      linkDistance: 50,
    };
  }

  /**
   * 执行布局
   */
  public execute() {
    const self = this;
    const { nodes, edges = [] } = self;
    const center = self.center;
    if (!nodes || nodes.length === 0) {
      return;
    }
    if (nodes.length === 1) {
      nodes[0].x = center[0];
      nodes[0].y = center[1];
      return;
    }
    const linkDistance = self.linkDistance;
    // the graph-theoretic distance (shortest path distance) matrix
    const adjMatrix = getAdjMatrix({ nodes, edges }, false);
    const distances = floydWarshall(adjMatrix);
    self.handleInfinity(distances);

    // scale the ideal edge length acoording to linkDistance
    const scaledD = scaleMatrix(distances, linkDistance);
    self.scaledDistances = scaledD;

    // get positions by MDS
    const positions = self.runMDS();
    self.positions = positions;
    positions.forEach((p: number[], i: number) => {
      nodes[i].x = p[0] + center[0];
      nodes[i].y = p[1] + center[1];
    });
  }

  /**
   * mds 算法
   * @return {array} positions 计算后的节点位置数组
   */
  public runMDS(): IPointTuple[] {
    const self = this;
    const dimension = 2;
    const distances = self.scaledDistances;

    // square distances
    const M = MLMatrix.mul(MLMatrix.pow(distances, 2), -0.5);

    // double centre the rows/columns
    const rowMeans = M.mean('row');
    const colMeans = M.mean('column');
    const totalMean = M.mean();
    M.add(totalMean).subRowVector(rowMeans).subColumnVector(colMeans);

    // take the SVD of the double centred matrix, and return the
    // points from it
    const ret = new SingularValueDecomposition(M);
    const eigenValues = MLMatrix.sqrt(ret.diagonalMatrix).diagonal();
    return ret.leftSingularVectors.toJSON().map((row: number[]) => {
      return MLMatrix.mul([row], [eigenValues]).toJSON()[0].splice(0, dimension) as IPointTuple;
    });
  }

  public handleInfinity(distances: Matrix[]) {
    let maxDistance = -999999;
    distances.forEach((row) => {
      row.forEach((value) => {
        if (value === Infinity) {
          return;
        }
        if (maxDistance < value) {
          maxDistance = value;
        }
      });
    });
    distances.forEach((row, i) => {
      row.forEach((value, j) => {
        if (value === Infinity) {
          distances[i][j] = maxDistance;
        }
      });
    });
  }
}
