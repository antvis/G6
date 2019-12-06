---
title: Lock Node
order: 10
---

The functions for locking a node `lock()`, `unlock()`, and `hasLocked()` are supported by the versions from G6 V3.1.4. The locked node will not response the drag event any more. But it still can be moved while dragging and zooming the canvas. You can register a [Custom Behavior](/en/docs/manual/advanced/custom-behavior) to fix the node when dragging and zooming.


## Fix the Locked Node While Dragging
The built-in `drag-canvas` in G6 does not take the locked node into consideration. In most situations, it is a reasonable Behavior. For some special requirements that require to fix hte locked node when dragging, you can register a custom Behavior as shown bolow to achieve them.
```javascript
import G6 from '@antv/g6';
const Util = G6.Util;
const abs = Math.abs;
const DRAG_OFFSET = 10;
const body = document.body;
const ALLOW_EVENTS = [ 16, 17, 18 ];

G6.registerBehavior('drag-canvas-exclude-lockedNode', {
  getDefaultCfg() {
    return {
      direction: 'both'
    };
  },
  getEvents() {
    return {
      'canvas:mousedown': 'onMouseDown',
      'canvas:mousemove': 'onMouseMove',
      'canvas:mouseup': 'onMouseUp',
      'canvas:click': 'onMouseUp',
      'canvas:mouseleave': 'onOutOfRange',
      keyup: 'onKeyUp',
      keydown: 'onKeyDown'
    };
  },
  updateViewport(e) {
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
    // The difference to built-in drag-canvas:
    const lockedNodes = this.graph.findAll('node', node => !node.hasLocked());
    lockedNodes.forEach(node => {
      node.get('group').translate(dx, dy);
    });
    this.graph.paint();
  },
  onMouseDown(e) {
    if (this.keydown) {
      return;
    }

    this.origin = { x: e.clientX, y: e.clientY };
    this.dragging = false;
  },
  onMouseMove(e) {
    if (this.keydown) {
      return;
    }

    e = Util.cloneEvent(e);
    const graph = this.graph;
    if (!this.origin) { return; }
    if (this.origin && !this.dragging) {
      if (abs(this.origin.x - e.clientX) + abs(this.origin.y - e.clientY) < DRAG_OFFSET) {
        return;
      }
      if (this.shouldBegin.call(this, e)) {
        e.type = 'dragstart';
        graph.emit('canvas:dragstart', e);
        this.dragging = true;
      }
    }
    if (this.dragging) {
      e.type = 'drag';
      graph.emit('canvas:drag', e);
    }
    if (this.shouldUpdate.call(this, e)) {
      this.updateViewport(e);
    }
  },
  onMouseUp(e) {
    if (this.keydown) {
      return;
    }

    if (!this.dragging) {
      this.origin = null;
      return;
    }
    e = Util.cloneEvent(e);
    const graph = this.graph;
    if (this.shouldEnd.call(this, e)) {
      this.updateViewport(e);
    }
    e.type = 'dragend';
    graph.emit('canvas:dragend', e);
    this.endDrag();
  },
  endDrag() {
    if (this.dragging) {
      this.origin = null;
      this.dragging = false;
      // Check whether it exists mouseup event outside. Unbind it if it exists.
      const fn = this.fn;
      if (fn) {
        body.removeEventListener('mouseup', fn, false);
        this.fn = null;
      }
    }
  },
  // If user move the mouse out of the canvas when dragging, the drag event might not be ended by releasing the mouse. Thus, listen to the mouseup event ouside the canvas to end it.
  onOutOfRange(e) {
    if (this.dragging) {
      const self = this;
      const canvasElement = self.graph.get('canvas').get('el');
      const fn = ev => {
        if (ev.target !== canvasElement) {
          self.onMouseUp(e);
        }
      };
      this.fn = fn;
      body.addEventListener('mouseup', fn, false);
    }
  },
  onKeyDown(e) {
    const code = e.keyCode || e.which;
    if (!code) {
      return;
    }
    if (ALLOW_EVENTS.indexOf(code) > -1) {
      this.keydown = true;
    } else {
      this.keydown = false;
    }
  },
  onKeyUp() {
    this.keydown = false;
  }
});

```


## Fix the Locked Node While Zooming
Built-in Behavior `zoom-canvas` zooms all the nodes including locked nodes. Register a custom Behavior to fix the locked nodes.

```javascript
const DELTA = 0.05;

G6.registerBehavior('zoom-canvas-exclude-lockedNode', {
  getDefaultCfg() {
    return {
      sensitivity: 2,
      minZoom: 0.1,
      maxZoom: 10
    };
  },
  getEvents() {
    return {
      wheel: 'onWheel'
    };
  },
  onWheel(e) {
    e.preventDefault();
    if (!this.shouldUpdate.call(this, e)) {
      return;
    }
    const graph = this.graph;
    const canvas = graph.get('canvas');
    const point = canvas.getPointByClient(e.clientX, e.clientY);
    const pixelRatio = canvas.get('pixelRatio');
    const sensitivity = this.get('sensitivity');
    let ratio = graph.getZoom();
    // To be Compatible with IE, Firefox, and Chrome
    if (e.wheelDelta < 0) {
      ratio = 1 - DELTA * sensitivity;
    } else {
      ratio = 1 + DELTA * sensitivity;
    }
    const zoom = ratio * graph.getZoom();
    if (zoom > this.get('maxZoom') || zoom < this.get('minZoom')) {
      return;
    }
    graph.zoom(ratio, { x: point.x / pixelRatio, y: point.y / pixelRatio });
    const lockedNodes = this.graph.findAll('node', node => !node.hasLocked());
    lockedNodes.forEach(node => {
      const matrix = Util.clone(node.get('group').getMatrix());
      const center = node.getModel();
      Util.mat3.translate(matrix, matrix, [ -center.x, -center.y ]);
      Util.mat3.scale(matrix, matrix, [ ratio, ratio ]);
      Util.mat3.translate(matrix, matrix, [ center.x, center.y ]);
      node.get('group').setMatrix(matrix);
    });
    graph.paint();
    graph.emit('wheelzoom', e);
  }
});

```

