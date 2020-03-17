import { G6Event, IG6GraphEvent } from '../types';
import { cloneEvent, isNaN } from '../util/base';

const { abs } = Math;
const DRAG_OFFSET = 10;
const ALLOW_EVENTS = ['shift', 'ctrl', 'alt', 'control'];

export default {
  getDefaultCfg(): object {
    return {
      direction: 'both',
    };
  },
  getEvents(): { [key in G6Event]?: string } {
    return {
      dragstart: 'onMouseDown',
      drag: 'onMouseMove',
      dragend: 'onMouseUp',
      'canvas:click': 'onMouseUp',
      keyup: 'onKeyUp',
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
    this.graph.translate(dx, dy);
    this.graph.paint();
  },
  onMouseDown(e: IG6GraphEvent) {
    const self = this as any;

    if (self.keydown || e.shape) {
      return;
    }

    self.origin = { x: e.clientX, y: e.clientY };
    self.dragging = false;
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
  },
};
