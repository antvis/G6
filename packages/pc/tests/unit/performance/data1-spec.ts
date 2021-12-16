import { Graph } from '../../../src';
import { Event } from '@antv/g-canvas';
import Stats from 'stats-js';

/* nodes: 1589, edges: 2742, shapes: 5920 */

const TIMES = 10;

const div = document.createElement('div');
div.id = 'global-spec';
document.body.appendChild(div);

function createWheelEvent(canvas, delta, x, y) {
  const bbox = canvas.getBoundingClientRect();
  const e = new G6Event('wheel', {});
  e.clientX = bbox.left + x;
  e.clientY = bbox.top + y;
  e.wheelDelta = delta;
  return e;
}

class G6Event extends Event {
  wheelDelta: number;
}

describe('graph', () => {
  const graph = new Graph({
    container: div,
    width: 500,
    height: 500,
    defaultNode: {
      labelCfg: {
        // style: {
        //   fontSize: 2
        // }
      },
      style: {
        lineWidth: 0.3
      }
    },
    modes: {
      default: [{
        type: 'zoom-canvas',
        enableOptimize: true
      }, {
        type: 'drag-canvas',
        enableOptimize: true
      }, 'drag-node']
    }
  });

  const stats = new Stats();
  stats.showPanel(0);
  document.body.appendChild(stats.dom);


  it.only('first render', done => {
    fetch('https://gw.alipayobjects.com/os/basement_prod/da5a1b47-37d6-44d7-8d10-f3e046dabf82.json')
      .then((res) => res.json())
      .then((data) => {
        data.nodes.forEach(node => {
          node.label = node.olabel
        })
        const begin = performance.now();
        graph.once('afterrender', e => {
          console.log('first render time:', performance.now() - begin);
        })
        graph.data(data);
        graph.render();
        done();
      });
    setTimeout(() => done(), 1000);
  });
  it.only('global refresh: drag', done => {
    let begin, duration = 0;
    for (let i = 0; i < TIMES; i++) {
      begin = performance.now();
      graph.emit('dragstart', { clientX: 150, clientY: 150, target: graph.get('canvas') });
      graph.emit('drag', { clientX: 200, clientY: 200, target: graph.get('canvas') });
      graph.emit('dragend', { clientX: 250, clientY: 250 });
      duration += (performance.now() - begin);
    }
    console.log(`ave time (${TIMES} times) for dragging canvas: `, duration / TIMES, 'ms')
    graph.fitCenter();

    // fps monitor loops
    let count = 0;
    let currentPos = 150;
    function animate() {
      stats.update();
      graph.emit('dragstart', { clientX: currentPos, clientY: currentPos, target: graph.get('canvas') });
      if (Math.round(count / 100) % 2) currentPos += 5;
      else currentPos -= 5;
      graph.emit('drag', { clientX: currentPos, clientY: currentPos, target: graph.get('canvas') });
      graph.emit('dragend', { clientX: currentPos, clientY: currentPos });
      count++;
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
    done()
  });
  it('global refresh: zoom', done => {
    const eIn = createWheelEvent(graph.get('canvas').get('el'), 1, 100, 100);
    const eOut = createWheelEvent(graph.get('canvas').get('el'), -1, 100, 100);
    let begin, duration = 0;
    for (let i = 0; i < TIMES; i++) {
      begin = performance.now();
      graph.emit('wheel', i > TIMES / 2 ? eIn : eOut);
      duration += (performance.now() - begin);
    }
    console.log(`ave time (${TIMES} times) for zooming canvas: `, duration / TIMES, 'ms')


    // fps monitor loops
    // let count = 0;
    // let currentPos = 150;
    // function animate() {
    //   stats.update();
    //   let e = eIn;
    //   if (Math.round(count / 100) % 2) e = eOut;
    //   else  e = eIn;
    //   graph.emit('wheel', e);
    //   count ++;
    //   requestAnimationFrame( animate );
    // }
    // requestAnimationFrame( animate );
    done()
  });
  it('local refresh: update one item', done => {
    const nodeTargetConfig = {
      size: 10,
      style: {
        fill: '#f00',
        stroke: "#000",
        lineWidth: 2
      }
    }
    const edgeTargetConfig = {
      size: 5,
      style: {
        stroke: '#f00',
        lineWidth: 5
      }
    }
    let begin, duration = 0;
    const nodeNum = graph.getNodes().length;
    const edgeNum = graph.getEdges().length;
    for (let i = 0; i < TIMES; i++) {
      const item = i < TIMES / 2 ?
        graph.getNodes()[Math.floor(Math.random() * nodeNum)] :
        graph.getEdges()[Math.floor(Math.random() * edgeNum)];
      const config = i < TIMES / 2 ? { ...nodeTargetConfig } : { ...edgeTargetConfig };
      begin = performance.now();
      graph.updateItem(item, config);
      duration += (performance.now() - begin);
    }
    console.log(`ave time (${TIMES} times) for updating one item: `, duration / TIMES, 'ms')


    // // fps monitor loops
    // graph.fitView();
    // let count = 0;
    // let currentPos = 150;
    // function animate() {
    //   stats.update();
    //   let config;
    //   const seed = Math.random() > 0.5
    //   if (seed) config = {...nodeTargetConfig};
    //   else config = {...edgeTargetConfig};
    //   const item = seed ? 
    //     graph.getNodes()[Math.floor(Math.random() * nodeNum)] :
    //     graph.getEdges()[Math.floor(Math.random() * edgeNum)];
    //   graph.updateItem(item, config);
    //   count ++;
    //   requestAnimationFrame( animate );
    // }
    // requestAnimationFrame( animate );

    done()
  });
  it('state refresh: setting and clear one item state', done => {
    let begin, duration = 0;
    const items = [];
    const nodeNum = graph.getNodes().length;
    const edgeNum = graph.getEdges().length;
    for (let i = 0; i < TIMES; i++) {
      const item = i < TIMES / 2 ?
        graph.getNodes()[Math.floor(Math.random() * nodeNum)] :
        graph.getEdges()[Math.floor(Math.random() * edgeNum)];
      begin = performance.now();
      graph.setItemState(item, 'highlight', true);
      graph.setItemState(item, 'highlight', false);
      duration += (performance.now() - begin);
      items.push(item);
    }
    console.log(`ave time (${TIMES} times) for setting one item with one state: `, duration / TIMES, 'ms')

    duration = 0;
    items.forEach(item => {
      begin = performance.now();
      graph.setItemState(item, 'highlight', false);
      duration += (performance.now() - begin);
    })
    console.log(`ave time (${TIMES} times) for clearing one item with one state: `, duration / TIMES, 'ms')

    duration = 0;
    items.forEach(item => {
      begin = performance.now();
      graph.setItemState(item, 'highlight', true);
      graph.setItemState(item, 'selected', true);
      graph.setItemState(item, 'active', true);
      duration += (performance.now() - begin);
    })
    console.log(`ave time (${TIMES} times) for setting one item with 3 states: `, duration / TIMES, 'ms')

    duration = 0;
    items.forEach(item => {
      begin = performance.now();
      graph.clearItemStates(item, ['highlight', 'selected', 'active']);
      duration += (performance.now() - begin);
    })
    console.log(`ave time (${TIMES} times) for clearing all states on one item: `, duration / TIMES, 'ms')
    done()
  });

  xit('force layout FPS', done => {
    // fps monitor loops
    graph.set('minZoom', 0.000001);
    graph.fitView();

    const funcs = [];
    graph.updateLayout({
      type: 'force',
      tick: () => {
        funcs.push(() => { });
      }
    });


    function animate() {
      stats.update();
      const func = funcs.pop();
      if (func) func();
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
    done();
  });
});