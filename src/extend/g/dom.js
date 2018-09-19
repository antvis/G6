/**
 * @fileOverview extend G.Shape
 * @author huangtonger@aliyun.com
 * @ignore
 */


const Util = require('../../util/');
const G = require('@antv/g/lib');
const domToImage = require('dom-to-image');
const Mixin = function() {};

Util.augment(Mixin, {
  createPath() {},
  // temporary solution
  isPointInPath(x, y) {
    if (this._cfg.el) {
      const box = this._cfg.el.getBBox();
      if (x <= box.x + box.width && y <= box.y + box.height && x >= box.x && y >= box.y) {
        return true;
      }
    }
    return false;
  },
  drawInner(context) {
    let { html, x, y, width, height } = this._attrs;
    const canvas = this.get('canvas');
    const el = canvas.get('el');
    const tm = Util.clone(this.getTotalMatrix());
    if (Util.isString(html)) {
      html = Util.createDOM(html);
    } else {
      html = html.cloneNode(true);
    }
    el.parentNode.appendChild(html);
    domToImage.toPng(html, {
      width,
      height
    })
    .then(dataUrl => {
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        context.setTransform(tm[0], tm[1], tm[3], tm[4], tm[6], tm[7]);
        context.drawImage(img, x, y, width, height);
      };
    });
    html.remove();
  }
});

Util.mixin(G.Dom, [ Mixin ]);

module.exports = Mixin;
