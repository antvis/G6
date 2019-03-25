const Util = require('../util');
const abs = Math.abs;
const DRAG_OFFSET = 10;

module.exports = {
  getDefaultCfg() {
    return {
      direction: 'both'
    };
  },
  getEvents() {
    return {
      'canvas:mousedown': 'onMouseDown',
      'canvas:mousemove': 'onMouseMove',
      'canvas:mouseup': 'onMouseUp',
      'canvas:click': 'onClick'
    };
  },
  updateViewport(e) {
    const origin = this.origin;
    const x = +e.x;
    const y = +e.y;
    if (isNaN(x) || isNaN(y)) {
      return;
    }
    let dx = x - origin.x;
    let dy = y - origin.y;
    if (this.get('direction') === 'x') {
      dy = 0;
    } else if (this.get('direction') === 'y') {
      dx = 0;
    }
    this.origin = {
      x,
      y
    };
    this.graph.translate(dx, dy);
    this.graph.paint();
  },
  onMouseDown(e) {
    this.origin = { x: e.x, y: e.y };
    this.dragging = false;
  },
  onMouseMove(e) {
    e = Util.cloneEvent(e);
    const graph = this.graph;
    if (!this.origin) { return; }
    if (this.origin && !this.dragging) {
      if (abs(this.origin.x - e.x) + abs(this.origin.y - e.y) < DRAG_OFFSET) {
        return;
      }
      if (this.shouldBegin.call(this, e)) {
        e.type = 'dragstart';
        graph.emit('canvas:dragstart', e);
        this.dragging = true;
      }
    }
    if (this.dragging) {
      e.type = 'drag';
      graph.emit('canvas:drag', e);
    }
    if (this.shouldUpdate.call(this, e)) {
      this.updateViewport(e);
    }
  },
  onMouseUp(e) {
    if (!this.dragging) {
      this.origin = null;
      return;
    }
    e = Util.cloneEvent(e);
    const graph = this.graph;
    if (this.shouldEnd.call(this, e)) {
      this.updateViewport(e);
    }
    e.type = 'dragend';
    graph.emit('canvas:dragend', e);
    this.origin = null;
    this.dragging = false;
  },
  onClick() {
    this.origin = null;
    this.dragging = false;
  }
};
