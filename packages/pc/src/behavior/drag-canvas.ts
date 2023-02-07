import { G6Event, IG6GraphEvent } from '@antv/g6-core';
import { isBoolean, isObject } from '@antv/util';
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
      mousedown: 'onMouseDown',
      drag: 'onDragMove',
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
      (graphCanvasBBox.maxX + expandWidth >= 0 && graphCanvasBBox.maxX + expandWidth + dx < 0)
    ) {
      dx = 0;
    }
    if (
      (graphCanvasBBox.minY <= height + expandHeight &&
        graphCanvasBBox.minY + dy > height + expandHeight) ||
      (graphCanvasBBox.maxY + expandHeight >= 0 && graphCanvasBBox.maxY + expandHeight + dy < 0)
    ) {
      dy = 0;
    }
    this.graph.translate(dx, dy);
  },
  onTouchStart(e: IG6GraphEvent) {
    const self = this as any;
    const touches = (e.originalEvent as TouchEvent).touches;
    const event1 = touches[0];
    const event2 = touches[1];

    // 如果是双指操作，不允许拖拽画布
    if (event1 && event2) {
      return;
    }
    e.preventDefault();
    this.mousedown = true;
    self.onDragStart(e);
  },
  onMouseDown(e: IG6GraphEvent) {
    this.mousedown = true;
  },
  onDragMove(evt: IG6GraphEvent) {
    if (!this.mousedown) return;
    if (!this.dragstart) {
      // dragstart
      this.dragstart = true;
      this.onDragStart(evt);
    } else {
      // drag
      this.onDrag(evt);
    }
  },
  onDragStart(e: IG6GraphEvent) {
    const self = this as any;
    const event = e.originalEvent as MouseEvent;

    // TODO: 'name' doesn't exist on `IG6GraphEvent`, we should consider typing it so users get autocomplete and other benefits
    if (event && e.name !== 'touchstart' && event.button !== 0) {
      return;
    }

    if (
      e.name !== 'touchstart' &&
      typeof window !== 'undefined' &&
      window.event &&
      !(window.event as any).buttons &&
      !(window.event as any).button
    ) {
      return;
    }

    if (!this.shouldBegin(e, this)) {
      return;
    }

    if (self.keydown) return;
    if (!this.allowDrag(e)) return;

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

    // 绑定浏览器右键监听，触发拖拽结束，结束拖拽时移除
    if (typeof window !== 'undefined') {
      const self = this;
      this.handleDOMContextMenu = (e) => self.onMouseUp(e);
      document.body.addEventListener('contextmenu', this.handleDOMContextMenu);
    }
  },
  onTouchMove(e: IG6GraphEvent) {
    const self = this as any;
    const touches = (e.originalEvent as TouchEvent).touches;
    const event1 = touches[0];
    const event2 = touches[1];

    // 如果是双指操作，不允许拖拽画布，结束拖拽
    if (event1 && event2) {
      this.onMouseUp(e);
      return;
    }
    e.preventDefault();
    self.onDrag(e);
  },
  onDrag(e: IG6GraphEvent) {
    if (!this.mousedown) return;
    const { graph } = this;
    if (this.keydown) return;
    if (!this.allowDrag(e)) return;

    e = cloneEvent(e);
    if (!this.origin) {
      return;
    }

    if (!this.dragging) {
      if (abs(this.origin.x - e.clientX) + abs(this.origin.y - e.clientY) < DRAG_OFFSET) {
        return;
      }
      if (this.shouldBegin(e, this)) {
        e.type = 'dragstart';
        graph.emit('canvas:dragstart', e);
        this.originPosition = { x: e.clientX, y: e.clientY };
        this.dragging = true;
      }
    } else {
      e.type = 'drag';
      graph.emit('canvas:drag', e);
    }

    if (this.shouldUpdate(e, this)) {
      this.updateViewport(e);
    }
  },
  onMouseUp(e: IG6GraphEvent) {
    this.mousedown = false;
    this.dragstart = false;
    const { graph } = this;

    if (this.keydown) return;

    const currentZoom = graph.getZoom();
    const modeController = graph.get('modeController');
    const zoomCanvas = modeController?.modes[modeController.mode]?.filter(
      (behavior) => behavior.type === 'zoom-canvas',
    )?.[0];
    const optimizeZoom = zoomCanvas ? zoomCanvas.optimizeZoom || 0.1 : 0;

    if (this.enableOptimize) {
      // 拖动结束后显示所有的边
      const edges = graph.getEdges();
      for (let i = 0, len = edges.length; i < len; i++) {
        const shapes = edges[i].get('group').get('children');
        if (!shapes) continue;
        shapes.forEach((shape) => {
          const oriVis = shape.get('ori-visibility');
          shape.set('ori-visibility', undefined);
          if (oriVis) shape.show();
        });
      }
      if (currentZoom > optimizeZoom) {
        const nodes = graph.getNodes();
        for (let j = 0, nodeLen = nodes.length; j < nodeLen; j++) {
          const container = nodes[j].getContainer();
          const children = container.get('children');
          for (const child of children) {
            const isKeyShape = child.get('isKeyShape');
            if (!isKeyShape) {
              const oriVis = child.get('ori-visibility');
              child.set('ori-visibility', undefined);
              if (oriVis) child.show();
            }
          }
        }
      }
    }

    if (!this.dragging) {
      this.origin = null;
      return;
    }

    e = cloneEvent(e);

    if (this.shouldEnd(e, this)) {
      this.updateViewport(e);
    }
    e.type = 'dragend';
    e.dx = e.clientX - this.originPosition.x;
    e.dy = e.clientY - this.originPosition.y;

    graph.emit('canvas:dragend', e);
    this.endDrag();

    // 结束拖拽时移除浏览器右键监听
    if (typeof window !== 'undefined') {
      document.body.removeEventListener('contextmenu', this.handleDOMContextMenu);
    }
  },
  endDrag() {
    this.origin = null;
    this.dragging = false;
    this.dragbegin = false;
    this.mousedown = false;
    this.dragstart = false;
  },
  onKeyDown(e: KeyboardEvent) {
    const self = this as any;
    const code = e.key;
    if (!code) {
      return;
    }
    if (ALLOW_EVENTS.indexOf(code.toLowerCase()) > -1) {
      self.keydown = false;
    } else {
      self.keydown = true;
    }
  },
  onKeyUp() {
    (this as any).keydown = false;
    this.origin = null;
    this.dragging = false;
    this.dragbegin = false;
  },
  allowDrag(evt: IG6GraphEvent) {
    const target = evt.target;
    const targetIsCanvas = target && target.isCanvas && target.isCanvas();
    if (isBoolean(this.allowDragOnItem) && !this.allowDragOnItem && !targetIsCanvas) return false;
    if (isObject(this.allowDragOnItem)) {
      const { node, edge, combo } = this.allowDragOnItem;
      const itemType = evt.item?.getType?.();
      if (!node && itemType === 'node') return false;
      if (!edge && itemType === 'edge') return false;
      if (!combo && itemType === 'combo') return false;
    }
    return true;
  }
};
