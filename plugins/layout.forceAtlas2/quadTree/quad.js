/**
 * @fileOverview quad
 * @author shiwu.wyy@antfin.com
 */
const G6 = require('@antv/g6');
const Util = G6.Util;

class Quad {
  constructor(options) {
    Util.mix(this, {
      /**
       * the center position of this quad
       * @type  {number}
       */
      xmid: null,
      /**
       * the center position of this quad
       * @type  {number}
       */
      ymid: null,
      /**
       * the length of this quad
       * @type  {number}
       */
      length: 0,
      /**
       * the mass center of this quad
       * @type  {number}
       */
      mass_center: [ 0, 0 ],
      /**
       * the mass of this quad
       * @type  {number}
       */
      mass: 0
    }, options);
  }
  getLength() {
    return this.length;
  }
  contains(x, y) {
    const halfLen = this.length / 2;
    return (x <= this.xmid + halfLen &&
      x >= this.xmid - halfLen &&
      y <= this.ymid + halfLen &&
      y >= this.ymid - halfLen);
  }
  // northwest quadrant
  NW() {
    const x = this.xmid - this.length / 4;
    const y = this.ymid + this.length / 4;
    const len = this.length / 2;
    const params = { xmid: x, ymid: y, length: len };
    const NW = new Quad(params);
    return NW;
  }
  // northeast
  NE() {
    const x = this.xmid + this.length / 4;
    const y = this.ymid + this.length / 4;
    const len = this.length / 2;
    const params = { xmid: x, ymid: y, length: len };
    const NE = new Quad(params);
    return NE;
  }
  // southwest
  SW() {
    const x = this.xmid - this.length / 4;
    const y = this.ymid - this.length / 4;
    const len = this.length / 2;
    const params = { xmid: x, ymid: y, length: len };
    const SW = new Quad(params);
    return SW;
  }
  // southeast
  SE() {
    const x = this.xmid + this.length / 4;
    const y = this.ymid - this.length / 4;
    const len = this.length / 2;
    const params = { xmid: x, ymid: y, length: len };
    const SE = new Quad(params);
    return SE;
  }
}
module.exports = Quad;
