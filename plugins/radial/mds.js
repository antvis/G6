const Numeric = require('numericjs');
class MDS {
//   getDefaultCfgs() {
//     return {
//       distances: null,         // 停止迭代的最大迭代数
//       demension: 2             // 中心点，默认为数据中第一个点
//     };
//   }
  constructor(params) {
    /**
     * distance matrix
     * @type  {array}
     */
    this.distances = params.distances;
    /**
     * dimensions
     * @type  {number}
     */
    this.dimension = params.dimension || 2;
  }
  layout() {
    const self = this;
    const dimension = self.dimension;
    const distances = self.distances;

    // square distances
    const M = Numeric.mul(-0.5, Numeric.pow(distances, 2));

    // double centre the rows/columns
    function mean(A) { return Numeric.div(Numeric.add.apply(null, A), A.length); }
    const rowMeans = mean(M),
      colMeans = mean(Numeric.transpose(M)),
      totalMean = mean(rowMeans);

    for (let i = 0; i < M.length; ++i) {
      for (let j = 0; j < M[0].length; ++j) {
        M[i][j] += totalMean - rowMeans[i] - colMeans[j];
      }
    }

    // take the SVD of the double centred matrix, and return the
    // points from it
    const ret = Numeric.svd(M);
    const eigenValues = Numeric.sqrt(ret.S);
    return ret.U.map(function(row) {
      return Numeric.mul(row, eigenValues).splice(0, dimension);
    });
  }
}
module.exports = MDS;
