const { htmlSizeMeasure } = require('./sizeMeasure');
const PluginBase = require('../base');
const { Global, registerNode, Shape } = require('@antv/g6');
const mix = require('@antv/util/lib/mix');
const nodeFactory = Shape.getFactory('node');

registerNode('dom', {
  getShapeStyle(cfg) {
    const size = this.getSize(cfg);
    const width = size[0];
    const height = size[1];
    const x = -width / 2;
    const y = -height / 2;
    const color = cfg.color || Global.defaultNode.color;
    const style = mix({}, {
      x,
      y,
      width,
      height,
      stroke: color,
      html: cfg.html
    }, Global.defaultNode.style, cfg.style);
    return style;
  },
  drawShape(cfg, group) {
    const style = this.getShapeStyle(cfg);
    const dom = group.addShape('dom', {
      attrs: style
    });
    return dom;
  }
}, 'single-shape');


class FitSize extends PluginBase {
  getEvents() {
    return {
      aftereadditem: 'calculateNodeSize'
    };
  }


  calculateNodeSize({ type, model, item }) {
    if (type === 'node') {
      const keyShape = item.getKeyShape();
      let size;
      if (keyShape.type === 'dom') {
        const style = nodeFactory.getShape('dom').getShapeStyle(model);
        size = htmlSizeMeasure(keyShape._attrs.html, style);
      } else {
        const bbox = item.get('group').getBBox();
        size = [ bbox.width, bbox.height ];
      }
      item.update({ size });
    }
  }
}

module.exports = FitSize;
