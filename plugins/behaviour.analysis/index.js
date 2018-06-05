/**
 * @fileOverview 拓展分析交互
 * @author huangtonger@aliyun.com
 */
const G6 = require('@antv/g6');

function panCanvas(graph, button = 'left') {
  let lastPoint;
  if (button === 'right') {
    graph.behaviourOn('contextmenu', ev => {
      ev.domEvent.preventDefault();
    });
  }
  graph.behaviourOn('mousedown', ev => {
    if (button === 'left' && ev.domEvent.button === 0 || button === 'right' && ev.domEvent.button === 2) {
      lastPoint = {
        x: ev.domX,
        y: ev.domY
      };
    }
  });
  graph.behaviourOn('canvas:mouseenter', () => {
    graph.css({
      cursor: '-webkit-grab'
    });
  });
  graph.behaviourOn('dragstart', ev => {
    graph.css({
      cursor: '-webkit-grabbing'
    });
    if (ev.domEvent.button === button) {
      lastPoint = {
        x: ev.domX,
        y: ev.domY
      };
    }
  });
  graph.behaviourOn('drag', ev => {
    if (lastPoint) {
      graph.translate(ev.domX - lastPoint.x, ev.domY - lastPoint.y);
      lastPoint = {
        x: ev.domX,
        y: ev.domY
      };
    }
  });
  graph.behaviourOn('dragend', () => {
    lastPoint = undefined;
    graph.css({
      cursor: '-webkit-grab'
    });
  });
  graph.behaviourOn('canvas:mouseleave', () => {
    lastPoint = undefined;
  });
}

// 鼠标拖拽平移画布交互
G6.registerBehaviour('panCanvas', panCanvas);

// 鼠标右键平移画布交互
G6.registerBehaviour('rightPanCanvas', graph => {
  panCanvas(graph, 'right');
});

// 鼠标拖拽平移节点交互
G6.registerBehaviour('panNode', graph => {
  let node;
  let dx;
  let dy;
  graph.on('node:dragstart', ev => {
    const { item } = ev;
    const model = item.getModel();
    node = item;
    dx = model.x - ev.x;
    dy = model.y - ev.y;
    graph.forcePreventAnimate(true);
  });
  graph.on('node:drag', ev => {
    graph.update(node, {
      x: ev.x + dx,
      y: ev.y + dy
    });
  });
  graph.on('node:dragend', () => {
    node = undefined;
    graph.forcePreventAnimate(false);
  });
  graph.on('canvas:mouseleave', () => {
    node = undefined;
    graph.forcePreventAnimate(false);
  });
});
