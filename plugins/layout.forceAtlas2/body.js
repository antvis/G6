/**
 * @fileOverview body
 * @author shiwu.wyy@antfin.com
 */
// represents a body(a point mass) and its position
class Body {
  constructor(params) {
    /**
     * the id of this body, the same with the node id
     * @type  {number}
     */
    this.id = params.id;
    /**
     * the position of this body
     * @type  {number}
     */
    this.rx = params.rx;
    /**
     * the position of this body
     * @type  {number}
     */
    this.ry = params.ry;
    /**
     * the force acting on this body
     * @type  {number}
     */
    this.fx = 0;
    /**
     * the force acting on this body
     * @type  {number}
     */
    this.fy = 0;
    /**
     * the mass of this body, =1 for a node
     * @type  {number}
     */
    this.mass = params.mass;
    /**
     * the degree of the node represented by this body
     * @type  {number}
     */
    this.degree = params.degree;
    /**
     * the parameter for repulsive force, = kr
     * @type  {number}
     */
    this.G = params.G;
  }
  // returns the euclidean distance
  distanceTo(bo) {
    const dx = this.rx - bo.rx;
    const dy = this.ry - bo.ry;
    return Math.hypot(dx, dy);
  }
  setPos(x, y) {
    this.rx = x;
    this.ry = y;
  }
  // resets the forces
  resetForce() {
    this.fx = 0;
    this.fy = 0;
  }
  addForce(b) {
    const dx = b.rx - this.rx;
    const dy = b.ry - this.ry;
    let dist = Math.hypot(dx, dy);
    dist = dist < 0.0001 ? 0.0001 : dist;
    // the repulsive defined by force atlas 2
    const F = (this.G * (this.degree + 1) * (b.degree + 1)) / dist;
    this.fx += F * dx / dist;
    this.fy += F * dy / dist;
  }
  // if quad contains this body
  in(quad) {
    return quad.contains(this.rx, this.ry);
  }
  // returns a new body
  add(bo) {
    const nenwMass = this.mass + bo.mass;
    const x = (this.rx * this.mass + bo.rx * bo.mass) / nenwMass;
    const y = (this.ry * this.mass + bo.ry * bo.mass) / nenwMass;
    const dg = this.degree + bo.degree;
    const params = {
      rx: x,
      ry: y,
      mass: nenwMass,
      degree: dg
    };
    return new Body(params);
  }
}

module.exports = Body;
