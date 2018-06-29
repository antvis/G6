/**
 * @fileOverview html node shape
 * @author huangtonger@aliyun.com
 */

const Shape = require('../shape');
const Util = require('../../util/');

// html node
Shape.registerNode('html', {
  getHtml(item) {
    return item.getModel().html;
  },
  cssSize: true,
  draw(item) {
    const containerDOM = Util.createDOM('<div class="g6-html-node-container"></div>');
    const group = item.getGraphicGroup();
    const model = item.getModel();
    const size = this.getSize(item);
    const style = this.getStyle(item);
    const canvas = group.get('canvas');
    const htmlElementContaniner = canvas.get('htmlElementContaniner');
    const cssSize = this.cssSize;
    let html = this.getHtml(item);

    if (!html) {
      html = Util.createDOM('<div></div>');
    } else {
      html = Util.createDOM(html);
    }

    containerDOM.css({
      position: 'absolute',
      padding: '0px',
      margin: '0px',
      visibility: 'hidden'
    });
    containerDOM.appendChild(html);
    if (cssSize) {
      htmlElementContaniner.appendChild(containerDOM);
      size[0] = containerDOM.width();
      size[1] = containerDOM.height();
    }
    const x = -size[0] / 2;
    const y = -size[1] / 2;
    const width = size[0];
    const height = size[1];
    const keyShape = group.addShape('rect', {
      attrs: Util.mix({}, style, {
        x,
        y,
        width,
        height
      })
    });
    group.addShape('html', {
      attrs: Util.mix({
        x,
        y,
        width,
        height,
        html: containerDOM
      }, model.style)
    });
    return keyShape;
  }
});
