const DELTA = 0.05;

module.exports = {
  getDefaultCfg() {
    return {
      sensitivity: 5,
      minZoom: 0.1,
      maxZoom: 10
    };
  },
  getEvents() {
    return {
      wheel: 'onWheel'
    };
  },
  onWheel(e) {
    e.preventDefault();
    if (!this.shouldUpdate.call(this, e)) {
      return;
    }
    const graph = this.graph;
    const canvas = graph.get('canvas');
    const point = canvas.getPointByClient(e.clientX, e.clientY);
    const pixelRatio = canvas.get('pixelRatio');
    const sensitivity = this.get('sensitivity');
    let ratio = graph.getZoom();
    if (e.wheelDelta > 0) {
      ratio = 1 - DELTA * sensitivity;
    } else {
      ratio = 1 + DELTA * sensitivity;
    }
    const zoom = ratio * graph.getZoom();
    if (zoom > this.get('maxZoom') || zoom < this.get('minZoom')) {
      return;
    }
    graph.zoom(ratio, { x: point.x / pixelRatio, y: point.y / pixelRatio });
    graph.paint();
    graph.emit('wheelzoom', e);
  }
};
