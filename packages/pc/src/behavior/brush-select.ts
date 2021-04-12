import { G6Event, IG6GraphEvent } from '@antv/g6-core';

const { min, max, abs } = Math;

const DEFAULT_TRIGGER = 'shift';
const ALLOW_EVENTS = ['drag', 'shift', 'ctrl', 'alt', 'control'];

export default {
  getDefaultCfg(): object {
    return {
      brushStyle: {
        fill: '#EEF6FF',
        fillOpacity: 0.4,
        stroke: '#DDEEFE',
        lineWidth: 1,
      },
      onSelect() {},
      onDeselect() {},
      selectedState: 'selected',
      trigger: DEFAULT_TRIGGER,
      includeEdges: true,
      selectedEdges: [],
      selectedNodes: [],
    };
  },
  getEvents(): { [key in G6Event]?: string } {
    // 检测输入是否合法
    if (!(ALLOW_EVENTS.indexOf(this.trigger.toLowerCase()) > -1)) {
      this.trigger = DEFAULT_TRIGGER;
      console.warn(
        "Behavior brush-select 的 trigger 参数不合法，请输入 'drag'、'shift'、'ctrl' 或 'alt'",
      );
    }
    if (this.trigger === 'drag') {
      return {
        dragstart: 'onMouseDown',
        drag: 'onMouseMove',
        dragend: 'onMouseUp',
        'canvas:click': 'clearStates',
      };
    }
    return {
      dragstart: 'onMouseDown',
      drag: 'onMouseMove',
      dragend: 'onMouseUp',
      'canvas:click': 'clearStates',
      keyup: 'onKeyUp',
      keydown: 'onKeyDown',
    };
  },
  onMouseDown(e: IG6GraphEvent) {
    // 按在node上面拖动时候不应该是框选
    const { item } = e;
    let { brush } = this;
    if (item) {
      return;
    }

    if (this.trigger !== 'drag' && !this.keydown) {
      return;
    }

    if (this.selectedNodes && this.selectedNodes.length !== 0) {
      this.clearStates();
    }

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
  },
  onMouseUp(e: IG6GraphEvent) {
    const { graph } = this;
    // TODO: 触发了 canvas:click 导致 clearStates
    if (!this.brush && !this.dragging) {
      return;
    }

    if (this.trigger !== 'drag' && !this.keydown) {
      return;
    }

    this.brush.remove(true); // remove and destroy
    this.brush = null;
    this.getSelectedNodes(e);
    this.dragging = false;
  },
  clearStates() {
    const { graph, selectedState } = this;

    const nodes = graph.findAllByState('node', selectedState);
    const edges = graph.findAllByState('edge', selectedState);
    nodes.forEach((node) => graph.setItemState(node, selectedState, false));
    edges.forEach((edge) => graph.setItemState(edge, selectedState, false));

    this.selectedNodes = [];

    this.selectedEdges = [];
    if (this.onDeselect) {
      this.onDeselect(this.selectedNodes, this.selectedEdges);
    }

    graph.emit('nodeselectchange', {
      selectedItems: {
        nodes: [],
        edges: [],
      },
      select: false,
    });
  },
  getSelectedNodes(e: IG6GraphEvent) {
    const { graph, originPoint, shouldUpdate } = this;
    const state = this.selectedState;
    const p1 = { x: e.x, y: e.y };
    const p2 = graph.getPointByCanvas(originPoint.x, originPoint.y);
    const left = min(p1.x, p2.x);
    const right = max(p1.x, p2.x);
    const top = min(p1.y, p2.y);
    const bottom = max(p1.y, p2.y);
    const selectedNodes = [];
    const selectedIds = [];
    graph.getNodes().forEach((node) => {
      if (!node.isVisible()) return; // 隐藏节点不能被选中
      const bbox = node.getBBox();
      if (
        bbox.centerX >= left &&
        bbox.centerX <= right &&
        bbox.centerY >= top &&
        bbox.centerY <= bottom
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
      selectedNodes.forEach((node) => {
        const edges = node.getOutEdges();
        edges.forEach((edge) => {
          if (!edge.isVisible()) return; // 隐藏边不能够被选中
          const model = edge.getModel();
          const { source, target } = model;
          if (
            selectedIds.includes(source) &&
            selectedIds.includes(target) &&
            shouldUpdate(edge, 'select')
          ) {
            selectedEdges.push(edge);
            graph.setItemState(edge, this.selectedState, true);
          }
        });
      });
    }

    this.selectedEdges = selectedEdges;
    this.selectedNodes = selectedNodes;
    if (this.onSelect) {
      this.onSelect(selectedNodes, selectedEdges);
    }
    graph.emit('nodeselectchange', {
      selectedItems: {
        nodes: selectedNodes,
        edges: selectedEdges,
      },
      select: true,
    });
  },
  createBrush() {
    const self = this;
    const brush = self.graph.get('canvas').addShape('rect', {
      attrs: self.brushStyle,
      capture: false,
      name: 'brush-shape',
    });
    this.brush = brush;
    this.delegate = brush;
    return brush;
  },
  updateBrush(e: IG6GraphEvent) {
    const { originPoint } = this;
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
    const triggerLowerCase = this.trigger.toLowerCase();
    const codeLowerCase = code.toLowerCase();
    // 按住 control 键时，允许用户设置 trigger 为 ctrl
    if (
      codeLowerCase === triggerLowerCase ||
      (codeLowerCase === 'control' && triggerLowerCase === 'ctrl') ||
      (codeLowerCase === 'ctrl' && triggerLowerCase === 'control')
    ) {
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
  },
};
