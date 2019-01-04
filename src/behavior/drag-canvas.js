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
      'canvas:mouseup': 'onMouseUp'
    };
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
    const graph = this.graph;
    if (!this.origin) { return; }
    if (this.origin && !this.dragging) {
      e.type = 'dragstart';
      graph.emit('canvas:dragstart', e);
      this.dragging = true;
      return;
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
      return;
    }
    const graph = this.graph;
    if (this.shouldEnd.call(this, e)) {
      this.updateViewport(e);
    }
    e.type = 'dragend';
    graph.emit('canvas:dragend', e);
    this.origin = null;
    this.dragging = false;
  }
};
