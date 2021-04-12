import { G6Event, IG6GraphEvent } from '@antv/g6-core';
import { IGraph } from '../interface/graph';
import Util from '../util';

const { cloneEvent, isNaN } = Util;

const { abs } = Math;
const DRAG_OFFSET = 10;
const ALLOW_EVENTS = ['shift', 'ctrl', 'alt', 'control'];

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
      dragstart: 'onMouseDown',
      drag: 'onMouseMove',
      dragend: 'onMouseUp',
      'canvas:click': 'onMouseUp',
      keyup: 'onKeyUp',
      focus: 'onKeyUp',
      keydown: 'onKeyDown',
      touchstart: 'onTouchStart',
      touchmove: 'onTouchMove',
      touchend: 'onMouseUp',
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

    let expandWidth = this.scalableRange;
    let expandHeight = this.scalableRange;
    // 若 scalableRange 是 0~1 的小数，则作为比例考虑
    if (expandWidth < 1 && expandWidth > -1) {
      expandWidth = width * expandWidth;
      expandHeight = height * expandHeight;
    }
    if (
      (graphCanvasBBox.minX <= width + expandWidth &&
        graphCanvasBBox.minX + dx > width + expandWidth) ||
      (graphCanvasBBox.maxX + expandWidth >= 0 &&
        graphCanvasBBox.maxX + expandWidth + dx < 0)
    ) {
      dx = 0;
    }
    if (
      (graphCanvasBBox.minY <= height + expandHeight &&
        graphCanvasBBox.minY + dy > height + expandHeight) ||
      (graphCanvasBBox.maxY + expandHeight >= 0 &&
        graphCanvasBBox.maxY + expandHeight + dy < 0)
    ) {
      dy = 0;
    }
    this.graph.translate(dx, dy);
  },
  onTouchStart(e: IG6GraphEvent) {
    const self = this as any;
    const touches = (e.originalEvent as any).touches;
    const event1 = touches[0];
    const event2 = touches[1];

    // 如果是双指操作，不允许拖拽画布
    if (event1 && event2) {
      return;
    }
    e.preventDefault();
    self.onMouseDown(e);
  },
  onMouseDown(e: IG6GraphEvent) {
    const self = this as any;
    const event = e.originalEvent as MouseEvent;

    if (event && e.name !== G6Event.TOUCHSTART && event.button !== 0) {
      return;
    }

    if (
      e.name !== G6Event.TOUCHSTART &&
      typeof window !== 'undefined' &&
      window.event &&
      !(window.event as any).buttons &&
      !(window.event as any).button
    ) {
      return;
    }

    if (!this.shouldBegin.call(this, e)) {
      return;
    }

    if (self.keydown) return;
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
  onTouchMove(e: IG6GraphEvent) {
    const self = this as any;
    const touches = (e.originalEvent as any).touches;
    const event1 = touches[0];
    const event2 = touches[1];

    // 如果是双指操作，不允许拖拽画布，结束拖拽
    if (event1 && event2) {
      this.onMouseUp(e);
      return;
    }
    e.preventDefault();
    self.onMouseMove(e);
  },
  onMouseMove(e: IG6GraphEvent) {
    const { graph } = this;
    if (this.keydown) return;
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
        graph.emit('canvas:dragstart', e);
        this.dragging = true;
      }
    } else {
      e.type = 'drag';
      graph.emit('canvas:drag', e);
    }

    if (this.shouldUpdate.call(this, e)) {
      this.updateViewport(e);
    }
  },
  onMouseUp(e: IG6GraphEvent) {
    const { graph } = this;

    if (this.keydown) return;

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
    graph.emit('canvas:dragend', e);
    this.endDrag();
  },
  endDrag() {
    this.origin = null;
    this.dragging = false;
    this.dragbegin = false;
  },
  onKeyDown(e: KeyboardEvent) {
    const self = this as any;
    const code = e.key;
    if (!code) {
      return;
    }
    if (ALLOW_EVENTS.indexOf(code.toLowerCase()) > -1) {
      self.keydown = true;
    } else {
      self.keydown = false;
    }
  },
  onKeyUp() {
    (this as any).keydown = false;
    this.origin = null;
    this.dragging = false;
    this.dragbegin = false;
  },
};
