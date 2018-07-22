/**
 * @fileOverview html shape
 * @author huangtonger@aliyun.com
 */

const Util = require('../../util/');
const G = require('@antv/g');
const Html = function(cfg) {
  Html.superclass.constructor.call(this, cfg);
};

Util.extend(Html, G.canvas.Shape);

Html.ATTRS = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
};

Util.augment(Html, {
  canFill: true,
  type: 'html',
  __isPointInFill(x, y) {
    const bbox = this.getBBox();
    const rx = bbox.minX;
    const ry = bbox.minY;
    const width = bbox.maxX - bbox.minX;
    const height = bbox.maxY - bbox.minY;
    return rx <= x && x <= rx + width && ry <= y && y <= ry + height;
  },
  __initHtml(html) {
    const attrs = this.get('attrs');
    const canvas = this.get('canvas');
    const htmlElementContaniner = canvas.get('htmlElementContaniner');
    // destroy last dom
    if (attrs.html && attrs.html.destroy) {
      attrs.html.destroy();
    }
    html = Util.createDOM(html);
    html.css({
      position: 'absolute',
      padding: '0px',
      margin: '0px',
      visibility: 'hidden'
    });
    attrs.html = html;
    htmlElementContaniner.appendChild(html);
  },
  isPointInPath(x, y) {
    return this.__isPointInFill(x, y);
  },
  init() {
    const html = this.attr('html');
    const canvas = this.get('canvas');
    canvas.on('beforedraw', () => {
      html.css({
        visibility: 'hidden'
      });
    });
    this.__initHtml(html);
  },
  getDefaultAttrs() {
    return Html.ATTRS;
  },
  attr(param1, param2) {
    const attrs = this.get('attrs');

    if (Util.isObject(param1)) {
      if (param1.html) {
        this.__initHtml(param1.html);
        delete param1.html;
      }
      Util.mix(attrs, param1);
      if (param1.x !== undefined ||
        param1.y !== undefined ||
        param1.width !== undefined ||
        param1.height !== undefined) {
        this.calculateBox();
      }
      return attrs;
    }
    if (!Util.isNil(param2)) {
      if (param1 === 'html') {
        this.__initHtml(param2);
      } else {
        attrs[param1] = param2;
        if (param1 === 'x' || param1 === 'y' || param1 === 'width' || param1 === 'height') {
          this.calculateBox();
        }
      }
      return this;
    }
    return attrs[param1];
  },
  calculateBox() {
    const x = this.attr('x');
    const y = this.attr('y');
    const width = this.attr('width');
    const height = this.attr('height');

    return {
      minX: x,
      minY: y,
      maxX: x + width,
      maxY: y + height
    };
  },
  getDrawTotalMatrix() {
    const canvas = this.get('canvas');
    const m = Util.clone(this.attr('matrix'));
    let parent = this.getParent();
    while (parent !== canvas) {
      Util.mat3.multiply(m, parent.attr('matrix'), m);
      parent = parent.getParent();
    }
    return m;
  },
  getDOM() {
    return this.attr('html');
  },
  applyTransform() {
    const html = this.attr('html');
    const m = this.getDrawTotalMatrix();
    const x = this.attr('x');
    const y = this.attr('y');
    const width = this.attr('width');
    const height = this.attr('height');
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const m6 = m[0] * x + m[6] + m[0] * halfWidth - halfWidth;
    const m7 = m[4] * y + m[7] + m[4] * halfHeight - halfHeight;
    html.css({
      transform: 'matrix(' + m[0] + ',' + m[1] + ',' + m[3] + ',' + m[4] + ',' + m6 + ',' + m7 + ')'
    });
  },
  createPath() {
    const html = this.attr('html');
    const attrs = this.get('attrs');
    this.applyTransform();
    html.css(Util.mix({
      visibility: 'visible'
    }, attrs));
  },
  remove(bool) {
    const html = this.attr('html');
    html.css({
      visibility: 'hidden'
    });
    Html.superclass.remove.call(this, bool);
  },
  destroy() {
    const html = this.attr('html');
    html && html.destroy();
    Html.superclass.destroy.call(this);
  }
});
G.canvas.Shape.Html = Html;

module.exports = Html;
