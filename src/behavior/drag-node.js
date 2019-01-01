const Util = require('../util');

module.exports = {
  getDefaultCfg() {
    return {
      updateEdge: true,
      afterDrag() {}
    };
  },
  bind(graph) {
    this.events = {
      dragstart: Util.wrapBehavior(this, 'onDragStart'),
      drag: Util.wrapBehavior(this, 'onDrag'),
      dragend: Util.wrapBehavior(this, 'onDrag')
    };
    this.graph = graph;
    Util.each(this.events, (callback, event) => {
      graph.on('node:' + event, callback);
    });
  },
  unbind(graph) {
    Util.each(this.events, (callback, event) => {
      graph.off('node:' + event, callback);
    });
  },
  onDragStart(e) {
    if (!this.shouldBegin.call(this, e)) {
      return;
    }
    if (e.target.getType() !== 'node') {
      return;
    }
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
    const item = e.target;
    if (item) {
      this._update(item, e);
      this.afterDrag.call(this, e);
    }
  },
  _update(item, e) {
    const origin = this.origin;
    const dx = e.clientX - origin.x;
    const dy = e.clientY - origin.y;
    const model = item.get('model');
    this.graph.update(item, { x: model.x + dx, y: model.y + dy });
    this.origin = { x: e.clientX, y: e.clientY };
    if (this.get('updateEdge')) {
      Util.each(item.getEdges(), edge => {
        edge.refresh();
      });
    }
    this.graph.paint();
  }
};
