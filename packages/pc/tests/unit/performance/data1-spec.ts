import { Graph } from '../../../src';
import { Event } from '@antv/g-canvas';

/* nodes: 1589, edges: 2742, shapes: 5920 */

const div = document.createElement('div');
div.id = 'global-spec';
document.body.appendChild(div);

const fpsDiv = document.createElement('div');
fpsDiv.id = 'fps-div';
document.body.appendChild(fpsDiv);

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

  let be = Date.now(), fps=0;
  requestAnimationFrame(
    function loop(){
      let now = Date.now()
      fps = Math.round(1000 / (now - be))
      be = now
      requestAnimationFrame(loop)
      if (fps < 35){
        fpsDiv.style.color = "red"
        fpsDiv.innerHTML = fps 
      } if (fps >= 35 && fps <= 41) {
        fpsDiv.style.color = "deepskyblue"
        fpsDiv.innerHTML = fps + " FPS"
      } else {
        fpsDiv.style.color = "black"
        fpsDiv.innerHTML = fps + " FPS"
      }
      // kpFps.value = fps
    }
  )
  
  it('first render', done => {
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
  });
  it('global refresh: drag', done => {
    const times = 10;
    let begin, duration = 0;
    for (let i = 0; i < times; i ++) {
      begin = performance.now();
      graph.emit('dragstart', { clientX: 150, clientY: 150, target: graph.get('canvas') });
      graph.emit('drag', { clientX: 200, clientY: 200, target: graph.get('canvas') });
      graph.emit('dragend', { clientX: 250, clientY: 250 });
      duration += (performance.now() - begin);
    }
    console.log(`ave time (${times} times) for dragging canvas: `, duration / times, 'ms')
    graph.fitCenter();
    done()
  });
  it('global refresh: zoom', done => {
    const eIn = createWheelEvent(graph.get('canvas').get('el'), 1, 100, 100);
    const eOut = createWheelEvent(graph.get('canvas').get('el'), -1, 100, 100);
    const times = 10;
    let begin, duration = 0;
    for (let i = 0; i < times; i ++) {
      begin = performance.now();
      graph.emit('wheel', i > times / 2 ? eIn : eOut);
      duration += (performance.now() - begin);
    }
    console.log(`ave time (${times} times) for zooming canvas: `, duration / times, 'ms')
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
    const times = 10;
    let begin, duration = 0;
    const nodeNum = graph.getNodes().length;
    const edgeNum = graph.getEdges().length;
    for (let i = 0; i < times; i ++) {
      const item = i < times / 2 ?
        graph.getNodes()[Math.floor(Math.random() * nodeNum)] :
        graph.getEdges()[Math.floor(Math.random() * edgeNum)];
      const config = i < times / 2 ? {...nodeTargetConfig} : {...edgeTargetConfig};
      begin = performance.now();
      graph.updateItem(item, config);
      duration += (performance.now() - begin);
    }
    console.log(`ave time (${times} times) for updating one item: `, duration / times, 'ms')
    done()
  });
  it('state refresh: setting and clear one item state', done => {
    const times = 10;
    let begin, duration = 0;
    const items = [];
    const nodeNum = graph.getNodes().length;
    const edgeNum = graph.getEdges().length;
    for (let i = 0; i < times; i ++) {
      const item = i < times / 2 ?
        graph.getNodes()[Math.floor(Math.random() * nodeNum)] :
        graph.getEdges()[Math.floor(Math.random() * edgeNum)];
      begin = performance.now();
      graph.setItemState(item, 'a', true);
      graph.setItemState(item, 'a', false);
      duration += (performance.now() - begin);
      items.push(item);
    }
    console.log(`ave time (${times} times) for setting one item with one state: `, duration / times, 'ms')

    duration = 0;
    items.forEach(item => {
      begin = performance.now();
      graph.setItemState(item, 'highlight', false);
      duration += (performance.now() - begin);
    })
    console.log(`ave time (${times} times) for clearing one item with one state: `, duration / times, 'ms')
    
    duration = 0;
    items.forEach(item => {
      begin = performance.now();
      graph.setItemState(item, 'highlight', true);
      graph.setItemState(item, 'selected', true);
      graph.setItemState(item, 'active', true);
      duration += (performance.now() - begin);
    })
    console.log(`ave time (${times} times) for setting one item with 3 states: `, duration / times, 'ms')

    duration = 0;
    items.forEach(item => {
      begin = performance.now();
      graph.clearItemStates(item, ['highlight', 'selected', 'active']);
      duration += (performance.now() - begin);
    })
    console.log(`ave time (${times} times) for clearing all states on one item: `, duration / times, 'ms')
    done()
  });
});