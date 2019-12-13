---
title: Lock Node
order: 10
---

G6 3.1.4 版本中新增了 `lock()`、`unlock()` 和 `hasLocked()` 三个 API，方便用户锁定某个节点。默认情况下，当锁定某个节点后，拖动节点时锁定的节点不会有任何反应，但拖动画布和缩放画布时，仍然会对锁定的节点有影响，如果不想让锁定的节点收到拖动画布和缩放画布的影响，可以通过[自定义 Behavior](/zh/docs/manual/advanced/custom-behavior) 的方式来实现。


## 拖动画布时候不处理锁定的节点
G6 内置的 `drag-canvas` 不区分节点是否锁定，全部一视同仁。绝大数情况下，这种行为是完全没问题的，但某些业务可能会要求锁定的节点，拖动画布时也不能移动，对于这种情况，可以通过重新定义拖动画布的 Behavior 来实现。

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
    // 和内置 drag-canvas 不同的地方是在这里
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
      // 终止时需要判断此时是否在监听画布外的 mouseup 事件，若有则解绑
      const fn = this.fn;
      if (fn) {
        body.removeEventListener('mouseup', fn, false);
        this.fn = null;
      }
    }
  },
  // 若在拖拽时，鼠标移出画布区域，此时放开鼠标无法终止 drag 行为。在画布外监听 mouseup 事件，放开则终止
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


## 缩放画布时不处理锁定的节点
默认情况下，G6 内置的 `zoom-canvas` 在缩放画布时候也会对锁定的节点缩放，如果缩放过程中不需要操作锁定的节点，则可以通过下面的方式来实现。

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
    // 兼容 IE、Firefox 及 Chrome
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

