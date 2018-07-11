/**
 * @fileOverview body
 * @author shiwu.wyy@antfin.com
 */
const G6 = require('@antv/g6');
const Util = G6.Util;

// represents a body(a point mass) and its position
class Body {
  constructor(options) {
    Util.mix(this, {
      /**
       * the id of this body, the same with the node id
       * @type  {number}
       */
      id: -1,
      /**
       * the position of this body
       * @type  {number}
       */
      rx: null,
      /**
       * the position of this body
       * @type  {number}
       */
      ry: null,
      /**
       * the force acting on this body
       * @type  {number}
       */
      fx: 0,
      /**
       * the force acting on this body
       * @type  {number}
       */
      fy: 0,
      /**
       * the mass of this body, =1 for a node
       * @type  {number}
       */
      mass: 1,
      /**
       * the degree of the node represented by this body
       * @type  {number}
       */
      degree: 1,
      /**
       * the parameter for repulsive force, = kr
       * @type  {number}
       */
      G: 1
    }, options);
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
    const nenw_mass = this.mass + bo.mass;
    const x = (this.rx * this.mass + bo.rx * bo.mass) / nenw_mass;
    const y = (this.ry * this.mass + bo.ry * bo.mass) / nenw_mass;
    const dg = this.degree + bo.degree;
    const params = { rx: x, ry: y, mass: nenw_mass, degree: dg };
    return new Body(params);
  }
}

module.exports = Body;
