import Graph from '../../../../src/graph/graph';
import G6 from '../../../../src';
import { GraphData } from '../../../../src/types';

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('marker test', () => {
  const data: GraphData = {
    nodes: [
      {
        id: '1',
        x: 100,
        y: 100,
      },
      {
        id: '2',
        x: 200,
        y: 200,
      },
    ],
    edges: [
      {
        source: '1',
        target: '2',
      },
    ],
  };

  it('collapse and expand arrow ', () => {
    G6.registerNode(
      'marker-node',
      {
        afterDraw: (cfg, group) => {
          group.addShape('marker', {
            attrs: {
              x: 20,
              y: 0,
              r: 6,
              symbol: G6.Marker.collapse,
              stroke: '#666',
              fill: '#fff',
              lineWidth: 1,
            },
            name: 'collapse-icon',
          });
          group.addShape('marker', {
            attrs: {
              x: -20,
              y: 0,
              r: 6,
              symbol: G6.Marker.expand,
              stroke: '#666',
              fill: '#fff',
              lineWidth: 1,
            },
            name: 'collapse-icon',
          });
          group.addShape('marker', {
            attrs: {
              x: 0,
              y: -20,
              r: 6,
              symbol: G6.Marker.downTriangle,
              stroke: '#666',
              fill: '#fff',
              lineWidth: 1,
            },
            name: 'collapse-icon',
          });
          group.addShape('marker', {
            attrs: {
              x: 0,
              y: 20,
              r: 6,
              symbol: G6.Marker.upTriangle,
              stroke: '#666',
              fill: '#fff',
              lineWidth: 1,
            },
            name: 'collapse-icon',
          });
        },
      },
      'circle',
    );
    const cfg = {
      container: div,
      width: 500,
      height: 500,
      defaultNode: {
        type: 'marker-node',
        style: {
          r: 20,
        },
        // size: [20, 20]
        // style: {
        //   opacity: 0.1
        // }
      },
    };
    const graph = new Graph(cfg);
    graph.data(data);
    graph.render();
  });
});
