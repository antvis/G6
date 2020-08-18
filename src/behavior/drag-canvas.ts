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
      enableOptimize: false
    };
  },
  getEvents(): { [key in G6Event]?: string } {
    return {
      dragstart: 'onMouseDown',
      mousedown: 'onMouseDown',
      drag: 'onMouseMove',
      dragend: 'onMouseUp',
      mouseup: 'onMouseUp',
      'canvas:click': 'onMouseUp',
      keyup: 'onKeyUp',
      focus: 'onKeyUp',
      keydown: 'onKeyDown',
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
    if ((graphCanvasBBox.minX <= width && graphCanvasBBox.minX + dx > width)
      || (graphCanvasBBox.maxX >= 0 && graphCanvasBBox.maxX + dx < 0)) {
      dx = 0;
    }
    if ((graphCanvasBBox.minY <= height && graphCanvasBBox.minY + dy > height)
      || (graphCanvasBBox.maxY >= 0 && graphCanvasBBox.maxY + dy < 0)) {
      dy = 0;
    }
    this.graph.translate(dx, dy);
  },
  onMouseDown(e: IG6GraphEvent) {
    const self = this as any;
    if (window && window.event && typeof window !== 'undefined' && !(window.event as any).buttons && !(window.event as any).button) {
      return;
    }

    if (self.keydown || e.shape) {
      return;
    }

    self.origin = { x: e.clientX, y: e.clientY };
    self.dragging = false;

    if (this.enableOptimize) {
      // 拖动 canvas 过程中隐藏所有的边及label
      const graph: IGraph = this.graph
      const edges = graph.getEdges()
      for (let i = 0, len = edges.length; i < len; i++) {
        graph.hideItem(edges[i])
      }
      const nodes = graph.getNodes()
      for (let j = 0, nodeLen = nodes.length; j < nodeLen; j++) {
        const container = nodes[j].getContainer()
        const children = container.get('children')
        for (let child of children) {
          const isKeyShape = child.get('isKeyShape')
          if (!isKeyShape) {
            child.hide()
          }
        }
      }
    }
  },
  onMouseMove(e: IG6GraphEvent) {
    const { graph } = this;
    if (this.keydown || e.shape) {
      return;
    }

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

    if (this.keydown || e.shape) {
      return;
    }

    if (this.enableOptimize) {
      // 拖动结束后显示所有的边
      const edges = graph.getEdges()
      for (let i = 0, len = edges.length; i < len; i++) {
        graph.showItem(edges[i])
      }
      const nodes = graph.getNodes()
      for (let j = 0, nodeLen = nodes.length; j < nodeLen; j++) {
        const container = nodes[j].getContainer()
        const children = container.get('children')
        for (let child of children) {
          const isKeyShape = child.get('isKeyShape')
          if (!isKeyShape) {
            child.show()
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
  }
};
