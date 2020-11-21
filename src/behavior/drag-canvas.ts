import { G6Event, IG6GraphEvent } from '../types';
import { cloneEvent, isNaN } from '../util/base';
import { IGraph } from '../interface/graph';

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
      scalableRange: 0
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
      touchstart: 'onMouseDown',
      touchmove: 'onMouseMove',
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

    if (
      (graphCanvasBBox.minX <= width + this.scalableRange && graphCanvasBBox.minX + dx > width + this.scalableRange) ||
      (graphCanvasBBox.maxX + this.scalableRange >= 0 && graphCanvasBBox.maxX + this.scalableRange + dx < 0)
    ) {
      dx = 0;
    }
    if (
      (graphCanvasBBox.minY <= height + this.scalableRange && graphCanvasBBox.minY + dy > height + this.scalableRange) ||
      (graphCanvasBBox.maxY + this.scalableRange >= 0 && graphCanvasBBox.maxY + this.scalableRange + dy < 0)
    ) {
      dy = 0;
    }
    this.graph.translate(dx, dy);
  },
  onMouseDown(e: IG6GraphEvent) {
    const self = this as any;
    const event = e.originalEvent as MouseEvent;

    if (event && event.button !== 0) {
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

    if (self.keydown) return;
    if (!(e.target && e.target.isCanvas && e.target.isCanvas())) return;

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
            child.hide();
          }
        }
      }
    }
  },
  onMouseMove(e: IG6GraphEvent) {
    const { graph } = this;
    if (this.keydown) return;
    if (!(e.target && e.target.isCanvas && e.target.isCanvas())) return;

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
          shape.show();
        });
      }
      const nodes = graph.getNodes();
      for (let j = 0, nodeLen = nodes.length; j < nodeLen; j++) {
        const container = nodes[j].getContainer();
        const children = container.get('children');
        for (const child of children) {
          const isKeyShape = child.get('isKeyShape');
          if (!isKeyShape) {
            child.show();
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
