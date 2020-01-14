import { G6Event, IG6GraphEvent } from '../../types';

const min = Math.min;
const max = Math.max;
const abs = Math.abs;
const DEFAULT_TRIGGER = 'shift';
const ALLOW_EVENTS = [ 'drag', 'shift', 'ctrl', 'alt', 'control' ];

export default {
  getDefaultCfg(): object {
    return {
      brushStyle: {
        fill: '#EEF6FF',
        fillOpacity: 0.4,
        stroke: '#DDEEFE',
        lineWidth: 1
      },
      onSelect() {},
      onDeselect() {},
      selectedState: 'selected',
      trigger: DEFAULT_TRIGGER,
      includeEdges: true,
      selectedEdges: [],
      selectedNodes: []
    };
  },
  getEvents(): { [key in G6Event]?: string } {
    // 检测输入是否合法
    if (!(ALLOW_EVENTS.indexOf(this.trigger.toLowerCase()) > -1)) {
      this.trigger = DEFAULT_TRIGGER;
      console.warn('Behavior brush-select 的 trigger 参数不合法，请输入 \'drag\'、\'shift\'、\'ctrl\' 或 \'alt\'');
    }
    if (this.trigger === 'drag') {
      return {
        mousedown: 'onMouseDown',
        mousemove: 'onMouseMove',
        mouseup: 'onMouseUp',
        'canvas:click': 'clearStates'
      };
    }
    return {
      mousedown: 'onMouseDown',
      mousemove: 'onMouseMove',
      mouseup: 'onMouseUp',
      'canvas:click': 'clearStates',
      keyup: 'onKeyUp',
      keydown: 'onKeyDown'
    };
  },
  onMouseDown(e: IG6GraphEvent) {
    // 按在node上面拖动时候不应该是框选
    const { item } = e;
    if (item) {
      return;
    }

    if (this.trigger !== 'drag' && !this.keydown) {
      return;
    }

    if (this.selectedNodes && this.selectedNodes.length !== 0) {
      this.clearStates();
    }

    let brush = this.brush;
    if (!brush) {
      brush = this.createBrush();
    }
    this.originPoint = { x: e.canvasX, y: e.canvasY };
    brush.attr({ width: 0, height: 0 });
    brush.show();
    this.dragging = true;
  },
  onMouseMove(e: IG6GraphEvent) {
    if (!this.dragging) {
      return;
    }

    if (this.trigger !== 'drag' && !this.keydown) {
      return;
    }

    this.updateBrush(e);
    this.graph.paint();
  },
  onMouseUp(e: IG6GraphEvent) {

    // TODO: 触发了 canvas:click 导致 clearStates
    if (!this.brush && !this.dragging) {
      return;
    }

    if (this.trigger !== 'drag' && !this.keydown) {
      return;
    }

    const graph = this.graph;
    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);
    this.brush.remove(true); // remove and destroy
    this.brush = null;
    this.getSelectedNodes(e);
    this.dragging = false;
    graph.paint();
    graph.setAutoPaint(autoPaint);
  },
  clearStates() {
    const graph = this.graph;
    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);
    const selectedState = this.selectedState;

    const nodes = graph.findAllByState('node', selectedState);
    const edges = graph.findAllByState('edge', selectedState);
    nodes.forEach(node => graph.setItemState(node, selectedState, false));
    edges.forEach(edge => graph.setItemState(edge, selectedState, false));

    this.selectedNodes = [];

    this.selectedEdges = [];
    this.onDeselect && this.onDeselect(this.selectedNodes, this.selectedEdges);
    graph.emit('nodeselectchange', { selectedItems: {
      nodes: [],
      edges: []
    }, select: false });
    graph.paint();
    graph.setAutoPaint(autoPaint);
  },
  getSelectedNodes(e: IG6GraphEvent) {
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
    const selectedIds = [];
    graph.getNodes().forEach(node => {
      const bbox = node.getBBox();
      if (bbox.centerX >= left
        && bbox.centerX <= right
        && bbox.centerY >= top
        && bbox.centerY <= bottom
      ) {
        if (shouldUpdate(node, 'select')) {
          selectedNodes.push(node);
          const model = node.getModel();
          selectedIds.push(model.id);
          graph.setItemState(node, state, true);
        }
      }
    });
    const selectedEdges = [];
    if (this.includeEdges) {
      // 选中边，边的source和target都在选中的节点中时才选中
      selectedNodes.forEach(node => {
        const edges = node.getEdges();
        edges.forEach(edge => {
          const model = edge.getModel();
          const { source, target } = model;
          if (selectedIds.includes(source)
            && selectedIds.includes(target)
            && shouldUpdate(edge, 'select')) {
            selectedEdges.push(edge);
            graph.setItemState(edge, this.selectedState, true);
          }
        });
      });
    }

    this.selectedEdges = selectedEdges;
    this.selectedNodes = selectedNodes;
    this.onSelect && this.onSelect(selectedNodes, selectedEdges);
    graph.emit('nodeselectchange', { selectedItems: {
      nodes: selectedNodes,
      edges: selectedEdges
    }, select: true });
  },
  createBrush() {
    const self = this;
    const brush = self.graph.get('canvas').addShape('rect', {
      attrs: self.brushStyle,
      capture: false
    });
    this.brush = brush;
    return brush;
  },
  updateBrush(e: IG6GraphEvent) {
    const originPoint = this.originPoint;
    this.brush.attr({
      width: abs(e.canvasX - originPoint.x),
      height: abs(e.canvasY - originPoint.y),
      x: min(e.canvasX, originPoint.x),
      y: min(e.canvasY, originPoint.y),
    });
  },
  onKeyDown(e: IG6GraphEvent) {
    const code = e.key;
    if (!code) {
      return;
    }
    // 按住control键时，允许用户设置trigger为ctrl
    if (code.toLowerCase() === this.trigger.toLowerCase()
      || code.toLowerCase() === 'control') {
      this.keydown = true;
    } else {
      this.keydown = false;
    }
  },
  onKeyUp() {
    if (this.brush) {
      // 清除所有选中状态后，设置拖得动状态为false，并清除框选的brush
      this.brush.remove(true);
      this.brush = null;
      this.dragging = false;
    }
    this.keydown = false;
  }
};
