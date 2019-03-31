const min = Math.min;
const max = Math.max;
const abs = Math.abs;
const hypot = Math.hypot;

module.exports = {
  getDefaultCfg() {
    return {
      brushStyle: {
        fill: '#EEF6FF',
        fillOpacity: 0.4,
        stroke: '#DDEEFE',
        lineWidth: 1
      },
      onSelect() {},
      onDeselect() {},
      selectedState: 'selected'
    };
  },
  getEvents() {
    return {
      mousedown: 'onMouseDown',
      mousemove: 'onMouseMove',
      mouseup: 'onMouseUp',
      'canvas:click': 'clearStates'
    };
  },
  onMouseDown(e) {
    if (this.selectedNodes && this.selectedNodes.length !== 0) {
      this.clearStates();
    }
    let brush = this.brush;
    if (!brush) {
      brush = this._createBrush();
    }
    this.originPoint = { x: e.canvasX, y: e.canvasY };
    brush.attr({ width: 0, height: 0 });
    brush.show();
    this.dragging = true;
  },
  onMouseMove(e) {
    const originPoint = this.originPoint;
    if (!this.dragging || hypot(originPoint.x - e.canvasX, originPoint.y - e.canvasY) < 10) {
      return;
    }
    this._updateBrush(e);
    this.graph.paint();
  },
  onMouseUp(e) {
    const graph = this.graph;
    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);
    this.brush.hide();
    this._getSelectedNodes(e);
    this.dragging = false;
    this.graph.paint();
    graph.setAutoPaint(autoPaint);
  },
  clearStates() {
    const graph = this.graph;
    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);
    const selectedState = this.selectedState;
    const shouldUpdate = this.shouldUpdate;
    const selectedNodes = [];
    const result = this.selectedNodes.filter(node => {
      if (shouldUpdate(node, 'deselect')) {
        graph.setItemState(node, selectedState, false);
        return true;
      }
      selectedNodes.push(node);
      return false;
    });
    this.onDeselect && this.onDeselect(result);
    this.selectedNodes = selectedNodes;
    graph.paint();
    graph.setAutoPaint(autoPaint);
  },
  _getSelectedNodes(e) {
    const graph = this.graph;
    const state = this.selectedState;
    const originPoint = this.originPoint;
    const p1 = { x: e.x, y: e.y };
    const p2 = graph.getPointByCanvas(originPoint.x, originPoint.y);
    const left = min(p1.x, p2.x);
    const right = max(p1.x, p2.x);
    const top = min(p1.y, p2.y);
    const bottom = max(p1.y, p2.y);
    const selectedNodes = [];
    const shouldUpdate = this.shouldUpdate;
    graph.getNodes().forEach(node => {
      const bbox = node.getBBox();
      if (bbox.centerX >= left
        && bbox.centerX <= right
        && bbox.centerY >= top
        && bbox.centerY <= bottom
      ) {
        if (shouldUpdate(node, 'select')) {
          selectedNodes.push(node);
          graph.setItemState(node, state, true);
        }
      }
    });
    this.selectedNodes = selectedNodes;
    this.onSelect && this.onSelect(selectedNodes);
  },
  _createBrush() {
    const self = this;
    const brush = self.graph.get('canvas').addShape('rect', {
      attrs: self.brushStyle,
      capture: false
    });
    this.brush = brush;
    return brush;
  },
  _updateBrush(e) {
    const originPoint = this.originPoint;
    this.brush.attr({
      width: abs(e.canvasX - originPoint.x),
      height: abs(e.canvasY - originPoint.y),
      x: min(e.canvasX, originPoint.x),
      y: min(e.canvasY, originPoint.y)
    });
  }
};
