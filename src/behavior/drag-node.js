const Util = require('../util');

module.exports = {
  getDefaultCfg() {
    return {
      updateEdge: true,
      delegate: true,
      delegateStyle: {
        fillOpacity: 0.6,
        strokeOpacity: 0.6
      }
    };
  },
  initEvents() {
    this.events = {
      'node:dragstart': Util.wrapBehavior(this, 'onDragStart'),
      'node:drag': Util.wrapBehavior(this, 'onDrag'),
      'node:dragend': Util.wrapBehavior(this, 'onDragEnd')
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
    if (this.delegateShape) {
      this.delegateShape.remove();
      this.delegateShape = null;
      this.target.set('delegateShape', null);
    }
    this._update(this.target, e, true);
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
    const autoPaint = this.graph.get('autoPaint');
    this.graph.setAutoPaint(false);
    this.graph.updateItem(item, { x, y });
    if (this.get('updateEdge')) {
      Util.each(item.getEdges(), edge => {
        edge.refresh();
      });
    }
    this.graph.setAutoPaint(autoPaint);
    this.graph.paint();
  },
  _updateDelegate(item, x, y) {
    const self = this;
    let shape = self.delegateShape;
    if (!this.delegateShape) {
      const group = self.graph.get('group');
      shape = item.get('keyShape').clone();
      shape.attr(this.delegateStyle);
      shape.set('capture', false);
      group.add(shape);
      item.set('delegateShape', shape);
      this.delegateShape = shape;
    }
    shape.attr({ x, y });
    this.graph.paint();
  }
};
