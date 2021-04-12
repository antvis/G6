import { G6Event, IG6GraphEvent } from '@antv/g6-core';
import { IGraph } from '../interface/graph';
import Util from '../util';

const { cloneEvent, isNaN } = Util;

const { abs } = Math;
const DRAG_OFFSET = 10;

export default {
  getDefaultCfg(): object {
    return {
      direction: 'both',
      enableOptimize: false,
      // drag-canvas 可拖动的扩展范围，默认为 0，即最多可以拖动一屏的位置
      // 当设置的值大于 0 时，即拖动可以超过一屏
      // 当设置的值小于 0 时，相当于缩小了可拖动范围
      // 具体实例可参考：https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IFfoS67_HssAAAAAAAAAAAAAARQnAQ
      scalableRange: 0,
      allowDragOnItem: false,
    };
  },
  getEvents(): { [key in G6Event]?: string } {
    return {
      'canvas:dragstart': 'onDragStart',
      'canvas:drag': 'onDragMove',
      'canvas:dragend': 'onDragEnd',
      'canvas:tap': 'onDragEnd',
    };
  },
  updateViewport(e: IG6GraphEvent) {
    const { origin } = this;
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
      y: clientY,
    };
    const width = this.graph.get('width');
    const height = this.graph.get('height');
    const graphCanvasBBox = this.graph.get('canvas').getCanvasBBox();

    if (
      (graphCanvasBBox.minX <= width + this.scalableRange &&
        graphCanvasBBox.minX + dx > width + this.scalableRange) ||
      (graphCanvasBBox.maxX + this.scalableRange >= 0 &&
        graphCanvasBBox.maxX + this.scalableRange + dx < 0)
    ) {
      dx = 0;
    }
    if (
      (graphCanvasBBox.minY <= height + this.scalableRange &&
        graphCanvasBBox.minY + dy > height + this.scalableRange) ||
      (graphCanvasBBox.maxY + this.scalableRange >= 0 &&
        graphCanvasBBox.maxY + this.scalableRange + dy < 0)
    ) {
      dy = 0;
    }
    this.graph.translate(dx, dy);
  },
  onDragStart(e: IG6GraphEvent) {
    const self = this as any;
    const event = e.originalEvent as Event;
    if (!this.shouldBegin.call(this, e)) {
      return;
    }

    const target = e.target;
    const targetIsCanvas = target && target.isCanvas && target.isCanvas();
    if (!this.allowDragOnItem && !targetIsCanvas) return;

    self.origin = { x: e.clientX, y: e.clientY };
    self.dragging = false;

    if (this.enableOptimize) {
      // 拖动 canvas 过程中隐藏所有的边及label
      const graph: IGraph = this.graph;
      const edges = graph.getEdges();
      for (let i = 0, len = edges.length; i < len; i++) {
        const shapes = edges[i].get('group').get('children');
        if (!shapes) continue;
        shapes.forEach((shape) => {
          shape.set('ori-visibility', shape.get('ori-visibility') || shape.get('visible'));
          shape.hide();
        });
      }
      const nodes = graph.getNodes();
      for (let j = 0, nodeLen = nodes.length; j < nodeLen; j++) {
        const container = nodes[j].getContainer();
        const children = container.get('children');
        for (const child of children) {
          const isKeyShape = child.get('isKeyShape');
          if (!isKeyShape) {
            child.set('ori-visibility', child.get('ori-visibility') || child.get('visible'));
            child.hide();
          }
        }
      }
    }
  },

  onDragMove(e: IG6GraphEvent) {
    const { graph } = this;
    const target = e.target;
    const targetIsCanvas = target && target.isCanvas && target.isCanvas();
    if (!this.allowDragOnItem && !targetIsCanvas) return;

    e = cloneEvent(e);
    if (!this.origin) {
      return;
    }

    if (!this.dragging) {
      if (abs(this.origin.x - e.clientX) + abs(this.origin.y - e.clientY) < DRAG_OFFSET) {
        return;
      }
      if (this.shouldBegin.call(this, e)) {
        e.type = 'dragstart';
        this.dragging = true;
      }
    }
    if (this.shouldUpdate.call(this, e)) {
      this.updateViewport(e);
    }
  },
  onDragEnd(e: IG6GraphEvent) {
    const { graph } = this;

    if (this.enableOptimize) {
      // 拖动结束后显示所有的边
      const edges = graph.getEdges();
      for (let i = 0, len = edges.length; i < len; i++) {
        const shapes = edges[i].get('group').get('children');
        if (!shapes) continue;
        shapes.forEach((shape) => {
          const oriVis = shape.get('ori-visibility');
          if (oriVis) shape.show();
        });
      }
      const nodes = graph.getNodes();
      for (let j = 0, nodeLen = nodes.length; j < nodeLen; j++) {
        const container = nodes[j].getContainer();
        const children = container.get('children');
        for (const child of children) {
          const isKeyShape = child.get('isKeyShape');
          if (!isKeyShape) {
            const oriVis = child.get('ori-visibility');
            if (oriVis) child.show();
          }
        }
      }
    }

    if (!this.dragging) {
      this.origin = null;
      return;
    }

    e = cloneEvent(e);

    if (this.shouldEnd.call(this, e)) {
      this.updateViewport(e);
    }
    e.type = 'dragend';
    //graph.emit('canvas:dragend', e);
    this.endDrag();
  },
  endDrag() {
    this.origin = null;
    this.dragging = false;
    this.dragbegin = false;
  },
};
