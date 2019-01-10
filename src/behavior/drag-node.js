const { isArray, mix } = require('../util');
const { delegateStyle } = require('../global');

module.exports = {
  getDefaultCfg() {
    return {
      updateEdge: true,
      delegate: true,
      delegateStyle: {}
    };
  },
  getEvents() {
    return {
      'node:dragstart': 'onDragStart',
      'node:drag': 'onDrag',
      'node:dragend': 'onDragEnd'
    };
  },
  onDragStart(e) {
    if (!this.shouldBegin.call(this, e)) {
      return;
    }
    this.target = e.target;
    this.origin = {
      x: e.clientX,
      y: e.clientY
    };
  },
  onDrag(e) {
    if (!this.origin) {
      return;
    }
    if (!this.get('shouldUpdate').call(this, e)) {
      return;
    }
    this._update(this.target, e);
  },
  onDragEnd(e) {
    if (!this.shouldEnd.call(this, e)) {
      return;
    }
    if (!this.origin) {
      return;
    }
    const delegateShape = e.target.get('delegateShape');
    if (delegateShape) {
      delegateShape.remove();
      this.target.set('delegateShape', null);
    }
    this._update(this.target, e, true);
    this.point = null;
    this.origin = null;
  },
  _update(item, e, force) {
    const origin = this.origin;
    const model = item.get('model');
    if (!this.point) {
      this.point = {
        x: model.x,
        y: model.y
      };
    }
    const x = e.clientX - origin.x + this.point.x;
    const y = e.clientY - origin.y + this.point.y;
    this.origin = { x: e.clientX, y: e.clientY };
    this.point = { x, y };
    if (this.delegate && !force) {
      this._updateDelegate(item, x, y);
      return;
    }
    if (this.get('updateEdge')) {
      this.graph.updateItem(item, { x, y });
    } else {
      item.update({ x, y });
      this.graph.paint();
    }
  },
  _updateDelegate(item, x, y) {
    const self = this;
    let shape = item.get('delegateShape');
    let size = item.get('model').size;
    if (!isArray(size)) {
      size = [ size, size ];
    }
    if (!shape) {
      const parent = self.graph.get('group');
      const attrs = mix({}, delegateStyle, this.delegateStyle);
      shape = parent.addShape('rect', {
        attrs: {
          width: size[0],
          height: size[1],
          ...attrs
        }
      });
      shape.set('capture', false);
      item.set('delegateShape', shape);
    }
    // model上的x, y是相对于图形中心的，delegateShape是g实例，x,y是绝对坐标
    x -= size[0] / 2;
    y -= size[1] / 2;
    shape.attr({ x, y });
    this.graph.paint();
  }
};
