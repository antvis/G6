const Util = require('../util');

module.exports = {
  getDefaultCfg() {
    return {
      direction: 'both'
    };
  },
  bind(graph) {
    this.group = graph.get('group');
    this.graph = graph;
    this.events = {
      mousedown: Util.wrapBehavior(this, 'onMouseDown'),
      mousemove: Util.wrapBehavior(this, 'onMouseMove'),
      mouseup: Util.wrapBehavior(this, 'onMouseUp')
    };
    Util.each(this.events, (callback, event) => {
      graph.on('canvas:' + event, callback);
    });
  },
  unbind(graph) {
    Util.each(this.events, (callback, event) => {
      graph.off('canvas:' + event, callback);
    });
  },
  updateViewport(e) {
    const origin = this.origin;
    const clientX = +e.clientX;
    const clientY = +e.clientY;
    if (isNaN(clientX) || isNaN(clientY)) {
      return;
    }
    let dx = clientX - origin.x;
    let dy = clientY - origin.y;
    if (this.get('direction') === 'x') {
      dy = 0;
    } else if (this.get('direction') === 'y') {
      dx = 0;
    }
    this.origin = {
      x: clientX,
      y: clientY
    };
    this.graph.translate(dx, dy);
    this.graph.paint();
  },
  onMouseDown(e) {
    if (this.shouldBegin.call(this, e)) {
      this.origin = { x: e.clientX, y: e.clientY };
      this.dragging = false;
    }
  },
  onMouseMove(e) {
    if (!this.origin) { return; }
    if (this.origin && !this.dragging) {
      e.type = 'dragstart';
      this.graph.emit('canvas:dragstart', e);
      this.dragging = true;
      return;
    }
    if (this.dragging) {
      e.type = 'drag';
      this.graph.emit('canvas:drag', e);
    }
    if (this.get('shouldUpdate').call(this, e)) {
      this.updateViewport(e);
    }
  },
  onMouseUp(e) {
    if (!this.dragging) {
      return;
    }
    const graph = this.graph;
    if (this.get('shouldUpdate').call(this, e)) {
      this.updateViewport(e);
    }
    e.type = 'dragend';
    graph.emit('canvas:dragend', e);
    this.origin = null;
    this.dragging = false;
  }
};
