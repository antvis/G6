const { htmlSizeMeasure } = require('./sizeMeasure');
const PluginBase = require('../base');
const { Shape } = require('@antv/g6');
const nodeFactory = Shape.getFactory('node');

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
