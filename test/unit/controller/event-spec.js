const Graph = require('../../../src/graph');
const expect = require('chai').expect;
const Util = require('../../../src/util/');
const data = require('../../fixtures/sample-graph-data.json');
const Simulate = require('event-simulate');

const div = document.createElement('div');
div.setAttribute('data-test-spec', 'controller/event-spec.js');
div.id = 'event-chart';
Util.modifyCSS(div, {
  position: 'fixed',
  left: '500px',
  top: '100px'
});
document.body.appendChild(div);

const width = 500;
const height = 500;
const graph = new Graph({
  container: div,
  width,
  height
});
const items = [ '', 'node', 'edge' ];
graph.source(Util.clone(data));
graph.render();
const nodePoint = { x: 209, y: 161 };
const emptyPoint = { x: 188, y: 86 };
const el = graph.getMouseEventWrapper();
Util.modifyCSS(el, {
  border: '1px solid red'
});
const canvas = graph.getCanvas();

const client = getClientByPoint(canvas, nodePoint.x, nodePoint.y);


// 事件测试
describe('graph event test', () => {
  generateIt('click', () => {
    Simulate.simulate(el, 'mousedown', {
      clientX: client.clientX,
      clientY: client.clientY
    });
    Simulate.simulate(el, 'mouseup', {
      clientX: client.clientX,
      clientY: client.clientY
    });
  });
  it('text shake tolrance', () => {
    let hasBeenClick = false;
    graph.on('click', () => {
      hasBeenClick = true;
    });
    Simulate.simulate(el, 'mousedown', { ...getClientByPoint(canvas, emptyPoint.x, emptyPoint.y), button: 2 });
    Simulate.simulate(el, 'mousemove', { ...getClientByPoint(canvas, emptyPoint.x + 10, emptyPoint.y), button: 0 });
    Simulate.simulate(el, 'mouseup', { ...getClientByPoint(canvas, emptyPoint.x + 10, emptyPoint.y), button: 0 });
    expect(hasBeenClick).eql(false);
    Simulate.simulate(el, 'mousedown', { ...getClientByPoint(canvas, emptyPoint.x, emptyPoint.y), button: 2 });
    Simulate.simulate(el, 'mousemove', { ...getClientByPoint(canvas, emptyPoint.x, emptyPoint.y + 1), button: 0 });
    Simulate.simulate(el, 'mouseup', { ...getClientByPoint(canvas, emptyPoint.x, emptyPoint.y + 1), button: 0 });
    expect(hasBeenClick).eql(true);
    let hasBeenDragStrat = false;
    graph.on('dragstart', () => {
      hasBeenDragStrat = true;
    });
    Simulate.simulate(el, 'mousedown', { ...getClientByPoint(canvas, 10, 10), button: 0 });
    Simulate.simulate(el, 'mousemove', { ...getClientByPoint(canvas, 11, 10), button: 0 });
    Simulate.simulate(el, 'mouseup', { ...getClientByPoint(canvas, 11, 11), button: 0 });
    expect(hasBeenDragStrat).eql(false);
    Simulate.simulate(el, 'mousedown', { ...getClientByPoint(canvas, 10, 10), button: 0 });
    Simulate.simulate(el, 'mousemove', { ...getClientByPoint(canvas, 20, 20), button: 0 });
    Simulate.simulate(el, 'mouseup', { ...getClientByPoint(canvas, 20, 20), button: 0 });
    expect(hasBeenDragStrat).eql(true);
  });

  generateIt('dblclick');
  generateIt('mousedown');
  generateIt('mouseup');
  generateIt('mousemove');
  generateIt('mouseenter', () => {
    Simulate.simulate(el, 'mousemove', getClientByPoint(canvas, emptyPoint.x, emptyPoint.y));
    Simulate.simulate(el, 'mousemove', getClientByPoint(canvas, nodePoint.x, nodePoint.y));
  });
  generateIt('mouseleave', () => {
    Simulate.simulate(el, 'mousemove', getClientByPoint(canvas, nodePoint.x, nodePoint.y));
    Simulate.simulate(el, 'mousemove', getClientByPoint(canvas, emptyPoint.x, emptyPoint.y));
  });

  generateIt('dragstart', () => {
    Simulate.simulate(el, 'mousedown', {
      clientX: client.clientX,
      clientY: client.clientY
    });
    Simulate.simulate(el, 'mousemove', {
      clientX: client.clientX,
      clientY: client.clientY
    });
  });

  generateIt('drag', () => {
    Simulate.simulate(el, 'mousedown', {
      clientX: client.clientX,
      clientY: client.clientY
    });
    Simulate.simulate(el, 'mousemove', {
      clientX: client.clientX,
      clientY: client.clientY
    });
    Simulate.simulate(el, 'mouseleave', {
      clientX: client.clientX,
      clientY: client.clientY
    });
  });

  generateIt('dragend', () => {
    Simulate.simulate(el, 'mousedown', {
      clientX: client.clientX,
      clientY: client.clientY
    });
    Simulate.simulate(el, 'mousemove', {
      clientX: client.clientX,
      clientY: client.clientY
    });
    Simulate.simulate(el, 'mouseup', {
      clientX: client.clientX,
      clientY: client.clientY
    });
  });
  generateIt('drop', () => {
    Simulate.simulate(el, 'mousedown', {
      clientX: client.clientX,
      clientY: client.clientY
    });
    Simulate.simulate(el, 'mousemove', {
      clientX: client.clientX,
      clientY: client.clientY
    });
    Simulate.simulate(el, 'mouseup', {
      clientX: client.clientX,
      clientY: client.clientY
    });
  });

  generateIt('dragenter', () => {
    Simulate.simulate(el, 'mousedown', { ...getClientByPoint(canvas, emptyPoint.x, emptyPoint.y), button: 0 });
    Simulate.simulate(el, 'mousemove', { ...getClientByPoint(canvas, emptyPoint.x, emptyPoint.y), button: 0 });
    Simulate.simulate(el, 'mousemove', { ...getClientByPoint(canvas, nodePoint.x, nodePoint.y), button: 0 });
    Simulate.simulate(el, 'mousemove', { ...getClientByPoint(canvas, emptyPoint.x, emptyPoint.y), button: 0 });
    Simulate.simulate(el, 'mouseup', getClientByPoint(canvas, emptyPoint.x, emptyPoint.y));
  });
  generateIt('dragleave', () => {
    Simulate.simulate(el, 'mousedown', { ...getClientByPoint(canvas, emptyPoint.x, emptyPoint.y) });
    Simulate.simulate(el, 'mousemove', { ...getClientByPoint(canvas, emptyPoint.x, emptyPoint.y), button: 0 });
    Simulate.simulate(el, 'mousemove', { ...getClientByPoint(canvas, nodePoint.x, nodePoint.y), button: 0 });
    Simulate.simulate(el, 'mousemove', { ...getClientByPoint(canvas, emptyPoint.x, emptyPoint.y), button: 0 });
    Simulate.simulate(el, 'mouseup', getClientByPoint(canvas, emptyPoint.x, emptyPoint.y));
  });
  generateIt('contextmenu', () => {
    Simulate.simulate(el, 'mousedown', { ...getClientByPoint(canvas, emptyPoint.x, emptyPoint.y), button: 2 });
  });
  it('graph event  contextmenu ', () => {
    Simulate.simulate(el, 'mousedown', { ...getClientByPoint(canvas, emptyPoint.x, emptyPoint.y), button: 2 });
  });
  // it('graph event mousewheel', () => {
  //   graph.on('node:mousewheel', e => {
  //     console.log('node', e);
  //   });
  //   graph.on('mousewheel', e => {
  //     console.log('graph', e);
  //   });
  // });
  // it('graph event key', () => {
  //   graph.on('node:keydown', e => {
  //     console.log('node keydown', e);
  //   });
  //   graph.on('keydown', e => {
  //     console.log('graph key down', e);
  //   });
  //   graph.on('keyup', e => {
  //     console.log('graph key up', e);
  //   });
  //   graph.on('keypress', e => {
  //     console.log('graph keypress', e);
  //   });
  // });

  it('graph destroy', () => {
    graph.destroy();
  });

});
function getClientByPoint(canvas, x, y) {
  const pixelRatio = canvas.get('pixelRatio');
  return canvas.getClientByPoint(x * pixelRatio, y * pixelRatio);
}
// 根据type 生成测试函数
function generateIt(type, simulateFn) {
  it('graph event: ' + type, () => {
    items.forEach(item => {
      let tmpType = type;
      if (item) {
        tmpType = item + ':' + type;
      }
      graph.on(tmpType, function(tmpType, ev) {
        expect(ev._type).to.equal(tmpType);
      }.bind(null, tmpType));
    });
    if (!simulateFn) {
      Simulate.simulate(el, type, {
        clientX: client.clientX,
        clientY: client.clientY
      });
    } else {
      simulateFn();
    }
  });
}
