
import G6 from '../../../src'
import '../../../src/behavior'
import { GraphData, Item } from '../../../types';
import { ETIME } from 'constants';

const div = document.createElement('div');
div.id = 'global-spec';
document.body.appendChild(div);

describe('graph', () => {
  const data = {
    nodes: [{
      id: 'node1',
      x: 100,
      y: 100
    }, {
      id: 'node2',
      x: 200,
      y: 100
    }]
  }

  // it will disapear when the hover state is restored to false becuase there is no default value for shape opacity in G
  // wait for G's opacity default value
  it('global nodeStateStyles and defaultNode, state change with opacity changed', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      nodeStateStyles: {
        hover: {
          opacity: 0.8
        }
      },
      defaultNode: {
        size: 25,
        style: {
          fill: 'steelblue'
        }
      }
    });
    graph.data(data);
    graph.render();
    const node3 = graph.addItem('node', { id: 'node3', x: 100, y: 200 });
    graph.on('node:mouseenter', e => {
      console.log(e);
      const item = e.item;
      graph.setItemState(item, 'hover', true);
    });
    graph.on('node:mouseout', e => {
      const item = e.item;
      graph.setItemState(item, 'hover', false);
    });
    graph.destroy();
  });

  // setState to change the height, when the state is restored, the height can not be restored though the attrs are correct.
  // wait for G to repair this problem
  it('global nodeStateStyles and defaultNode, state change with fill/r/width/height/stroke changed', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      nodeStateStyles: {
        hover: {
          // fill: '#f00',
          // stroke: '#0f0',
          // lineWidth: 3,
          // r: 25,
          // width: 50,
          height: 20
        }
      },
      defaultNode: {
        // size: 25,
        style: {
          // lineWdith: 1,
          width: 30,
          height: 30
        }
      }
    });
    // const canvas = graph.get('canvas');
    // canvas.set('localRefresh', false);
    graph.data(data);
    graph.render();
    const node3 = graph.addItem('node', { id: 'node3', x: 100, y: 150, shape: 'rect' });
    graph.paint();
    graph.on('node:mouseenter', e => {
      const item = e.item;
      graph.setItemState(item, 'hover', true);
    });
    graph.on('node:mouseleave', e => {
      const item = e.item;
      graph.setItemState(item, 'hover', false);
    });
    graph.destroy();
  });
  
  it('global defaultNode and stateStyle in data, state change with fill/r/width/height/stroke changed', () => {
    const data2 = {
      nodes: [{
        id: 'node1',
        x: 100,
        y: 100,
        stateStyles: {
          hover: {
            lineWidth: 3
          }
        }
      }, {
        id: 'node2',
        x: 200,
        y: 100,
        shape: 'rect',
        stateStyles: {
          hover: {
            lineWidth: 3,
            stroke: '#0f0'
          }
        }
      }, {
        id: 'node2',
        x: 300,
        y: 100,
        shape: 'triangle',
        stateStyles: {
          hover: {
            lineWidth: 3,
            fill: '#0f0'
          }
        }
      }, {
        id: 'node2',
        x: 400,
        y: 100,
        shape: 'ellipse',
        stateStyles: {
          hover: {
            lineWidth: 3,
            fillOpacity: 0.5
          }
        }
      }, {
        id: 'node2',
        x: 100,
        y: 200,
        shape: 'diamond',
        stateStyles: {
          hover: {
            lineWidth: 3,
            strokeOpacity: 0.3
          }
        }
      }, {
        id: 'node2',
        x: 200,
        y: 200,
        shape: 'star',
        stateStyles: {
          hover: {
            lineWidth: 3,
            shadowColor: '#00f',
            shadowBlur: 10,
            shadowOffsetX: 10,
            shadowOffsetY: -10
          }
        }
      }]
    }
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      defaultNode: {
        style: {
          stroke: '#f00',
          lineWdith: 1
        }
      }
    });
    graph.data(data2);
    graph.render();
    graph.paint();
    graph.on('node:mouseenter', e => {
      const item = e.item;
      graph.setItemState(item, 'hover', true);
    });
    graph.on('node:mouseleave', e => {
      const item = e.item;
      graph.setItemState(item, 'hover', false);
    });
    // graph.destroy();
  });
})