import { G6Event, IG6GraphEvent } from '../types';

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
    console.log('mouse dwo');
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

    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);
    this.brush.remove(true); // remove and destroy
    this.brush = null;
    console.log('mouse up')
    this.getSelectedNodes(e);
    this.dragging = false;
    graph.setAutoPaint(autoPaint);
    graph.autoPaint();
  },
  clearStates() {
    const { graph, selectedState } = this;
    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);

    const nodes = graph.findAllByState('node', selectedState);
    const edges = graph.findAllByState('edge', selectedState);
    nodes.forEach(node => graph.setItemState(node, selectedState, false));
    edges.forEach(edge => graph.setItemState(edge, selectedState, false));

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
    graph.setAutoPaint(autoPaint);
    graph.autoPaint();
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
    graph.getNodes().forEach(node => {
      const bbox = node.getBBox();
      console.log('aaa');
      if (
        bbox.centerX >= left &&
        bbox.centerX <= right &&
        bbox.centerY >= top &&
        bbox.centerY <= bottom
      ) {
        console.log('bbb');
        if (shouldUpdate(node, 'select')) {
          console.log('ccc');
          selectedNodes.push(node);
          const model = node.getModel();
          selectedIds.push(model.id);
          console.log(model.id);
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
    console.log('create brush');
    const self = this;
    const brush = self.graph.get('canvas').addShape('rect', {
      attrs: self.brushStyle,
      capture: false,
      name: 'brush-shape',
    });
    this.brush = brush;
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
    console.log('keydown', code);
    if (!code) {
      return;
    }
    // 按住control键时，允许用户设置trigger为ctrl
    if (code.toLowerCase() === this.trigger.toLowerCase() || code.toLowerCase() === 'control') {
      this.keydown = true;
    } else {
      this.keydown = false;
    }
  },
  onKeyUp() {
    console.log('key up')
    if (this.brush) {
      // 清除所有选中状态后，设置拖得动状态为false，并清除框选的brush
      this.brush.remove(true);
      this.brush = null;
      this.dragging = false;
    }
    this.keydown = false;
  },
};
