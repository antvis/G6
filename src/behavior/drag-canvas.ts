import { G6Event, IG6GraphEvent } from '../../types';
import { cloneEvent } from '../util/base'
const abs = Math.abs
const DRAG_OFFSET = 10
const ALLOW_EVENTS = [ 'shift', 'ctrl', 'alt', 'control' ];

export default {
  getDefaultCfg(): object {
    return {
      direction: 'both'
    }
  },
  getEvents(): { [key in G6Event]?: string } {
    return {
      'dragstart': 'onMouseDown',
      'drag': 'onMouseMove',
      'dragend': 'onMouseUp',
      'click': 'onMouseUp',
      'mouseleave': 'onOutOfRange',
      keyup: 'onKeyUp',
      keydown: 'onKeyDown'
    };
  },
  updateViewport(e: IG6GraphEvent) {
    const origin = this.origin;
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
      y: clientY
    };
    this.graph.translate(dx, dy);
    this.graph.paint();
  },
  onMouseDown(e: IG6GraphEvent) {
    console.log('on mouse down')
    if (this.keydown) {
      return;
    }

    this.origin = { x: e.clientX, y: e.clientY };
    this.dragging = false;
    this.dragbegin = true;
  },
  onMouseMove(e: IG6GraphEvent) {
    if (this.keydown || !this.dragbegin) {
      return;
    }

    e = cloneEvent(e);
    const graph = this.graph;
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
    if (this.keydown || !this.dragbegin) {
      return;
    }

    if (!this.dragging) {
      this.origin = null;
      return;
    }

    e = cloneEvent(e);
    
    const graph = this.graph;
    if (this.shouldEnd.call(this, e)) {
      this.updateViewport(e);
    }
    e.type = 'dragend';
    graph.emit('canvas:dragend', e);
    this.endDrag();
  },
  endDrag() {
    const self = this;
    self.origin = null;
    self.dragging = false;
    self.dragbegin = false;
  },
  // 若在拖拽时，鼠标移出画布区域，此时放开鼠标无法终止 drag 行为。在画布外监听 mouseup 事件，放开则终止
  onOutOfRange(e: IG6GraphEvent) {
    if (!this.dragging) {
      return;
    }
    const self = this;
    self.onMouseUp(e);
    // const canvasElement = self.graph.get('canvas').get('el');
    // function listener(ev) {
    //   console.log(ev.target, canvasElement, ev.target !== canvasElement);
    //   if (ev.target !== canvasElement) {
    //     self.onMouseUp(e);
    //     // 终止时需要判断此时是否在监听画布外的 mouseup 事件，若有则解绑
    //     document.removeEventListener('mouseup', listener, false);
    //   }
    // };
    // document.addEventListener('mouseup', listener, false);
  },
  onKeyDown(e: KeyboardEvent) {
    const code = e.key;
    if (!code) {
      return;
    }
    if (ALLOW_EVENTS.indexOf(code.toLowerCase()) > -1) {
      this.keydown = true;
    } else {
      this.keydown = false;
    }
  },
  onKeyUp() {
    this.keydown = false;
  }
}