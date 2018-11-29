/**
 * @fileOverview 拓展分析交互
 * @author huangtonger@aliyun.com
 */
const G6 = require('@antv/g6');
const Util = G6.Util;

function panCanvas(graph, button = 'left', panBlank = false) {
  let lastPoint;
  if (button === 'right') {
    graph.behaviourOn('contextmenu', ev => {
      ev.domEvent.preventDefault();
    });
  }
  graph.behaviourOn('mousedown', ev => {
    if (button === 'left' && ev.domEvent.button === 0 ||
    button === 'right' && ev.domEvent.button === 2) {
      if (panBlank) {
        if (!ev.shape) {
          lastPoint = {
            x: ev.domX,
            y: ev.domY
          };
        }
      } else {
        lastPoint = {
          x: ev.domX,
          y: ev.domY
        };
      }
    }
  });
  graph.behaviourOn('canvas:mouseenter', () => {
    graph.css({
      cursor: '-webkit-grab'
    });
  });
  graph.behaviourOn('dragstart', () => {
    if (lastPoint) {
      graph.setCapture(false);
      graph.css({
        cursor: '-webkit-grabbing'
      });
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
    resetStatus();
  });
  graph.behaviourOn('canvas:mouseleave', () => {
    resetStatus();
  });
  function resetStatus() {
    lastPoint = undefined;
    graph.css({
      cursor: '-webkit-grab'
    });
    graph.setCapture(true);
  }
}

// 鼠标拖拽平移画布交互
G6.registerBehaviour('panCanvas', panCanvas);

// 鼠标右键平移画布交互
G6.registerBehaviour('rightPanCanvas', graph => {
  panCanvas(graph, 'right');
});

// 鼠标拖拽画布空白处平移画布交互
G6.registerBehaviour('panBlank', graph => {
  panCanvas(graph, 'left', true);
});

// 鼠标右键拖拽画布空白处平移画布交互
G6.registerBehaviour('rightPanBlank', graph => {
  panCanvas(graph, 'right', true);
});

// 鼠标拖拽平移节点交互
G6.registerBehaviour('panNode', graph => {
  let node;
  let dx;
  let dy;
  graph.behaviourOn('node:mouseenter', () => {
    graph.css({
      cursor: 'move'
    });
  });
  graph.behaviourOn('node:mouseleave', () => {
    graph.css({
      cursor: 'default'
    });
  });
  graph.behaviourOn('node:dragstart', ({ item, x, y }) => {
    graph.css({
      cursor: 'move'
    });
    const model = item.getModel();
    node = item;
    dx = model.x - x;
    dy = model.y - y;
  });
  graph.behaviourOn('node:drag', ev => {
    graph.preventAnimate(() => {
      graph.update(node, {
        x: ev.x + dx,
        y: ev.y + dy
      });
    });
  });
  graph.behaviourOn('node:dragend', () => {
    node = undefined;
  });
  graph.behaviourOn('canvas:mouseleave', () => {
    node = undefined;
  });
});

// wheel zoom
G6.registerBehaviour('wheelZoom', graph => {
  let timeout;
  graph.behaviourOn('wheel', ev => {
    const { domEvent } = ev;
    domEvent.preventDefault();
  });
  graph.behaviourOn('wheel', Util.throttle(update, 16));

  function update(ev) {
    const {
      domEvent
    } = ev;
    const delta = domEvent.wheelDelta;
    const times = 1.05;
    if (Math.abs(delta) > 10) { // 控制灵敏度
      const originScale = graph.getMatrix()[0];
      if (delta > 0) {
        graph.zoom({
          x: ev.x,
          y: ev.y
        }, originScale * times);
      } else {
        graph.zoom({
          x: ev.x,
          y: ev.y
        }, originScale * (1 / times));
      }
    }
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = undefined;
    }, 50);
  }
});

module.exports = true;
