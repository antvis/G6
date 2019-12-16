import Numeric from 'numericjs';

export default class MDS {
  /** distance matrix */
  public distances: number[][];
  /** dimensions */
  public dimension: number;
  /** link distance */
  public linkDistance: number;

  constructor(params) {
    this.distances = params.distances;
    this.dimension = params.dimension || 2;
    this.linkDistance = params.linkDistance;
  }

  public layout() {
    const self = this;
    const dimension = self.dimension;
    const distances = self.distances;
    const linkDistance = self.linkDistance;

    // square distances
    const M = Numeric.mul(-0.5, Numeric.pow(distances, 2));

    // double centre the rows/columns
    function mean(A) {
      return Numeric.div(Numeric.add.apply(null, A), A.length);
    }
    const rowMeans = mean(M);
    const colMeans = mean(Numeric.transpose(M));
    const totalMean = mean(rowMeans);

    for (let i = 0; i < M.length; ++i) {
      for (let j = 0; j < M[0].length; ++j) {
        M[i][j] += totalMean - rowMeans[i] - colMeans[j];
      }
    }

    // take the SVD of the double centred matrix, and return the
    // points from it
    let ret;
    let res = [];
    try {
      ret = Numeric.svd(M);
    } catch (e) {
      const length = distances.length;
      for (let i = 0; i < length; i++) {
        const x = Math.random() * linkDistance;
        const y = Math.random() * linkDistance;
        res.push([x, y]);
      }
    }
    if (res.length === 0) {
      const eigenValues = Numeric.sqrt(ret.S);
      res = ret.U.map(function(row) {
        return Numeric.mul(row, eigenValues).splice(0, dimension);
      });
    }
    return res;
  }
}
