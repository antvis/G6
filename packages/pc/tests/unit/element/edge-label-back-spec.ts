import { Canvas, Shape } from '@antv/g-canvas';
import { Graph } from '../../../src';
import '../../../src';
import { numberEqual } from '../layout/util';

const div = document.createElement('div');
div.id = 'edge-shape';
document.body.appendChild(div);

const canvas = new Canvas({
  container: 'edge-shape',
  width: 600,
  height: 600,
});

describe('text background label', () => {
  const data = {
    nodes: [
      {
        id: 'node1',
        x: 150,
        y: 50,
        label: 'node1',
      },
      {
        id: 'node2',
        x: 250,
        y: 200,
        label: 'node2',
      },
      {
        id: 'node3',
        x: 100,
        y: 350,
        label: 'node3',
      },
    ],
    edges: [
      {
        source: 'node1',
        target: 'node2',
        label: 'edge 1',
      },
      {
        source: 'node2',
        target: 'node3',
        label: 'edge 2asdfasdfasdfasdf',
        labelCfg: {
          position: 'end',
          refX: 10,
          refY: -20,
          style: {
            textBaseline: 'bottom'
          }
        }
      },
      {
        source: 'node3',
        target: 'node1',
        label: 'edge 3',
      },
    ],
  };

  const graph = new Graph({
    container: 'edge-shape',
    width: 500,
    height: 500,
    // translate the graph to align the canvas's center, support by v3.5.1
    // fitCenter: true,
    defaultNode: {
      type: 'circle',
      labelCfg: {
        position: 'bottom',
      },
    },
    defaultEdge: {
      labelCfg: {
        autoRotate: true,
        style: {
          fill: '#1890ff',
          fontSize: 14,
          background: {
            fill: '#ffffff',
            stroke: '#9EC9FF',
            padding: [2, 2, 2, 2],
            radius: 2,
          },
        },
      },
    },
    modes: {
      default: ['drag-canvas', 'drag-node', 'activate-relations'],
    },
    nodeStateStyles: {
      // style configurations for hover state
      hover: {
        fillOpacity: 0.8,
      },
      // style configurations for selected state
      selected: {
        lineWidth: 5,
      },
    },
  });
  graph.data(data);
  graph.render();
  it('text background label', done => {
    const edge1bg = graph.getEdges()[1].getContainer().find(ele => ele.get('classname') === 'edge-label-bg');
    let edge1bgMatrix = edge1bg.getMatrix();
    expect(edge1bgMatrix[0]).toBe(0.7071067811865476);
    expect(edge1bgMatrix[6]).toBe(-223.7023625196221);
    expect(edge1bgMatrix[7]).toBe(187.5118869365008);

    graph.updateItem('node3', {
      x: 110,
      y: 250,
    });
    setTimeout(() => {
      edge1bgMatrix = edge1bg.getMatrix();
      expect(edge1bgMatrix[0]).toBe(0.9417419115948376);
      expect(edge1bgMatrix[6]).toBe(-83.53467171518344);
      expect(edge1bgMatrix[7]).toBe(55.06982476376146);
      graph.updateItem('node3', {
        x: 250,
        y: 200,
      });
      setTimeout(() => {
        edge1bgMatrix = edge1bg.getMatrix();
        expect(edge1bgMatrix[0]).toBe(1);
        expect(edge1bgMatrix[6]).toBe(0);
        expect(edge1bgMatrix[7]).toBe(0);
        expect(edge1bg.attr('x')).toBe(258);
        expect(edge1bg.attr('y')).toBe(164);
        done();
      }, 30);
    }, 100);
  });
  it('text background with autoRotate false and clearItemStates', (done) => {
    let edge = graph.getEdges()[0];
    let labelBgShape = edge.getContainer().get('children')[1];
    let { x, y } = labelBgShape.attr();
    expect(x).toBe(176.85302734375);
    expect(y).toBe(116);

    graph.updateItem(graph.getNodes()[0], {
      x: graph.getNodes()[0].getModel().x + 100,
      y: graph.getNodes()[0].getModel().y + 100,
    });
    graph.clearItemStates(edge, ['active']);

    labelBgShape = edge.getContainer().get('children')[1];
    setTimeout(() => {
      const { x: newX, y: newY } = labelBgShape.attr();
      expect(numberEqual(newX, 226, 2)).toBe(true);
      expect(numberEqual(newY, 166, 2)).toBe(true);
      done();
    }, 16);
  });
});