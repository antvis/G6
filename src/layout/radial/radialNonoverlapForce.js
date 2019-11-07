const SPEED_DIVISOR = 800;

class RadialNonoverlapForce {
  constructor(params) {
    /**
     * node positions
     * @type  {array}
     */
    this.positions = params.positions;
    /**
     * adjacency matrix
     * @type  {array}
     */
    this.adjMatrix = params.adjMatrix;
    /**
     * focus node
     * @type  {array}
     */
    this.focusID = params.focusID;
    /**
     * radii
     * @type  {number}
     */
    this.radii = params.radii;
    /**
     * the number of iterations
     * @type  {number}
     */
    this.iterations = params.iterations || 10;
    /**
     * the height of the canvas
     * @type  {number}
     */
    this.height = params.height || 10;
    /**
     * the width of the canvas
     * @type  {number}
     */
    this.width = params.width || 10;
    /**
     * the moving speed
     * @type  {number}
     */
    this.speed = params.speed || 100;
    /**
     * the gravity
     * @type  {number}
     */
    this.gravity = params.gravity || 10;
    /**
     * the node size
     * @type  {number}
     */
    this.nodeSizeFunc = params.nodeSizeFunc;
    /**
     * the strength of forces
     * @type  {number}
     */
    this.k = params.k || 5;
    /**
     * if each circle can be separated into subcircles to avoid overlappings
     * @type  {number}
     */
    this.strictRadial = params.strictRadial;
    /**
     * the nodes data
     * @type  {array}
     */
    this.nodes = params.nodes;
  }
  layout() {
    const self = this;
    const positions = self.positions;
    const disp = [];
    const iterations = self.iterations;
    const maxDisplace = self.width / 10;
    self.maxDisplace = maxDisplace;
    self.disp = disp;
    for (let i = 0; i < iterations; i++) {
      positions.forEach((p, k) => {
        disp[k] = { x: 0, y: 0 };
      });
      // 给重叠的节点增加斥力
      self.getRepulsion();
      self.updatePositions();
    }
    return positions;
  }
  getRepulsion() {
    const self = this;
    const positions = self.positions;
    const nodes = self.nodes;
    const disp = self.disp;
    const k = self.k;
    const radii = self.radii;

    positions.forEach((v, i) => {
      disp[i] = { x: 0, y: 0 };
      positions.forEach((u, j) => {
        if (i === j) return;
        // v and u are not on the same circle, return
        if (radii[i] !== radii[j]) return;
        const vecx = v[0] - u[0];
        const vecy = v[1] - u[1];
        let vecLength = Math.sqrt(vecx * vecx + vecy * vecy);
        if (vecLength === 0) vecLength = 1;
        // these two nodes overlap
        if (vecLength < (self.nodeSizeFunc(nodes[i]) / 2 + self.nodeSizeFunc(nodes[j]) / 2)) {
          const common = k * k / (vecLength);
          disp[i].x += vecx / vecLength * common;
          disp[i].y += vecy / vecLength * common;
        }
      });
    });
  }
  updatePositions() {
    const self = this;
    const positions = self.positions;
    const disp = self.disp;
    const speed = self.speed;
    const strictRadial = self.strictRadial;
    const f = self.focusID;

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

    // speed
    positions.forEach((n, i) => {
      disp[i].dx *= speed / SPEED_DIVISOR;
      disp[i].dy *= speed / SPEED_DIVISOR;
    });

    // move
    const radii = self.radii;
    positions.forEach((n, i) => {
      if (i === f) return;
      const distLength = Math.sqrt(disp[i].x * disp[i].x + disp[i].y * disp[i].y);
      if (distLength > 0 && i !== f) {
        const limitedDist = Math.min(self.maxDisplace * (speed / SPEED_DIVISOR), distLength);
        n[0] += disp[i].x / distLength * limitedDist;
        n[1] += disp[i].y / distLength * limitedDist;
        if (strictRadial) {
          let vx = n[0] - positions[f][0];
          let vy = n[1] - positions[f][1];
          const nfDis = Math.sqrt(vx * vx + vy * vy);
          vx = vx / nfDis * radii[i];
          vy = vy / nfDis * radii[i];
          n[0] = positions[f][0] + vx;
          n[1] = positions[f][1] + vy;
        }
      }
    });
  }
}
module.exports = RadialNonoverlapForce;
