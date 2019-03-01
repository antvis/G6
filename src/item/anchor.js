const Util = require('../util/');
const Item = require('./item');

class Anchor extends Item {
  getDefaultCfg() {
    return {
      type: 'anchor',
      nodeId: 0,
      id: 0
    };
  }

  init(cfg) {
    super.init(cfg);
    const { node } = cfg;
    const { id: nodeId } = cfg.model;
    this.set('nodeId', nodeId);
    this.set('node', node);
    this.updatePosition();
  }

  updatePosition() {
    const node = this.get('node');
    const model = this.getModel();
    const bbox = node.getBBox();
    const newModel = Util.mix({}, model, {
      x: bbox.minX + model.xRatio * bbox.width,
      y: bbox.minY + model.yRatio * bbox.height
    });
    this.set('model', newModel);
  }

  getShapeCfg(model) {
    const node = this.get('node');
    const bbox = node.getBBox();
    const cfg = {
      x: bbox.minX + model.xRatio * bbox.width,
      y: bbox.minY + model.yRatio * bbox.height
    };

    return Util.mix({}, model, cfg);
  }

  setState(state) {
    this.setShapeState(state);
  }
}

module.exports = Anchor;