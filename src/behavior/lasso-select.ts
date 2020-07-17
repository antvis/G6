import { G6Event, IG6GraphEvent, IPoint, Item } from '../types';
import { isPolygonsIntersect } from '@antv/path-util';
import { pathToPoints } from '../util/path'

const DEFAULT_TRIGGER = 'shift';
const ALLOW_EVENTS = ['drag', 'shift', 'ctrl', 'alt', 'control'];

const isItemIntersecPolygon = (item: Item, polyPoints: number[][]) => {
  let shapePoints;
  const shape = item.getKeyShape()
  if (item.get('type') === 'path') {
    shapePoints = pathToPoints(shape.attr('path'))
  } else {
    const shapeBBox = shape.getCanvasBBox();
    shapePoints = [[shapeBBox.minX, shapeBBox.minY], [shapeBBox.maxX, shapeBBox.minY], [shapeBBox.maxX, shapeBBox.maxY], [shapeBBox.minX, shapeBBox.maxY]];
  }
  return isPolygonsIntersect(polyPoints, shapePoints)
}

export default {
  getDefaultCfg(): object {
    return {
      delegateStyle: {
        fill: '#EEF6FF',
        fillOpacity: 0.4,
        stroke: '#DDEEFE',
        lineWidth: 1,
      },
      onSelect() { },
      onDeselect() { },
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
      console.warn("Behavior lasso-select 的 trigger 参数不合法，请输入 'drag'、'shift'、'ctrl' 或 'alt'");
    }
    if (this.trigger === 'drag') {
      return {
        dragstart: 'onDragStart',
        drag: 'onDragMove',
        dragend: 'onDragEnd',
      };
    }
    return {
      mousedown: 'onDragStart',
      mousemove: 'onDragMove',
      mouseup: 'onDragEnd',
      keyup: 'onKeyUp',
      keydown: 'onKeyDown',
    };
  },
  onDragStart(e: IG6GraphEvent) {
    let { lasso } = this;
    if (this.selectedNodes && this.selectedNodes.length !== 0) {
      this.clearStates();
    }

    if (!lasso) {
      lasso = this.createLasso();
    }

    this.originPoint = { x: e.x, y: e.y };
    this.points.push(this.originPoint)
    lasso.attr({ width: 0, height: 0 });
    lasso.show();
    this.dragging = true;
  },
  onDragMove(e: IG6GraphEvent) {
    if (!this.dragging) {
      return;
    }
    this.points.push({ x: e.x, y: e.y })
    this.updateLasso(e);
  },
  onDragEnd(e: IG6GraphEvent) {
    if (!this.lasso && !this.dragging) {
      return;
    }
    this.points.push(this.originPoint)
    this.getSelectedItems();

    this.lasso.remove(true);
    this.lasso = null;
    this.points = []
    this.dragging = false;
  },
  getLassoPath() {
    const points: IPoint[] = this.points
    const path = []
    if (points.length) {
      points.forEach((point, index) => {
        if (index === 0) {
          path.push(['M', point.x, point.y])
        } else {
          path.push(['L', point.x, point.y])
        }
      })
      path.push(['L', points[0].x, points[0].y])
    }
    return path
  },
  clearStates() {
    const { graph, selectedState } = this;
    const nodes = graph.findAllByState('node', selectedState);
    const edges = graph.findAllByState('edge', selectedState);
    nodes.forEach(node => graph.setItemState(node, selectedState, false));
    edges.forEach(edge => graph.setItemState(edge, selectedState, false));

    if (this.onDeselect) {
      this.onDeselect(this.selectedNodes, this.selectedEdges);
    }

    this.selectedNodes = [];
    this.selectedEdges = [];

    graph.emit('nodeselectchange', {
      selectedItems: {
        nodes: [],
        edges: [],
      },
      select: false,
    });
  },
  getSelectedItems() {
    const { graph, shouldUpdate } = this;
    const lassoContour = this.points.map(point => [graph.getCanvasByPoint(point.x, point.y).x, graph.getCanvasByPoint(point.x, point.y).y])
    const state = this.selectedState;
    const selectedNodes = [];
    const selectedIds = [];
    graph.getNodes().forEach(node => {
      if (isItemIntersecPolygon(node, lassoContour)) {
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
        const edges = node.getOutEdges();
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
  createLasso() {
    const self = this;
    const lasso = self.graph.get('delegateGroup').addShape('path', {
      attrs: {
        path: [],
        ...self.delegateStyle,
      },
      capture: false,
      name: 'lasso-shape',
    });
    this.lasso = lasso;
    this.points = [];
    return lasso;
  },
  updateLasso(e: IG6GraphEvent) {
    const self = this;
    this.lasso.attr({
      path: self.getLassoPath()
    });
  },
  onKeyDown(e: IG6GraphEvent) {
    const code = e.key;
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
    if (this.lasso) {
      // 清除所有选中状态后，设置拖得动状态为false，并清除框选的lasso
      this.lasso.remove(true);
      this.lasso = null;
      this.points = []
      this.dragging = false;
    }
    this.keydown = false;
  },
};
