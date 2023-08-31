import { Graph, Extensions, extend } from '../../../src/index';
import { TestCaseContext } from '../interface';

export default (context: TestCaseContext) => {
  const { renderer, legendCanvas } = context;

  const ExtGraph = extend(Graph, {
    plugins: {
      legend: Extensions.Legend,
    },
  });

  return new ExtGraph({
    ...context,
    type: 'graph',
    data: {
      nodes: [
        { id: 'node1', data: { x: 100, y: 200, nodeType: 'a' } },
        { id: 'node2', data: { x: 200, y: 250, nodeType: 'b' } },
        { id: 'node3', data: { x: 200, y: 350, nodeType: 'b' } },
        { id: 'node4', data: { x: 300, y: 250, nodeType: 'c' } },
      ],
      edges: [
        {
          id: 'edge1',
          source: 'node1',
          target: 'node2',
          data: { edgeType: 'e1' },
        },
        {
          id: 'edge2',
          source: 'node2',
          target: 'node3',
          data: { edgeType: 'e2' },
        },
        {
          id: 'edge3',
          source: 'node3',
          target: 'node4',
          data: { edgeType: 'e3' },
        },
        {
          id: 'edge4',
          source: 'node1',
          target: 'node4',
          data: { edgeType: 'e3' },
        },
      ],
    },
    plugins: [
      {
        type: 'legend',
        key: 'legend1',
        size: 'fit-content',
        renderer,
        canvas: legendCanvas,
        background: '#ccc',
        orientation: 'horizontal',
        node: {
          enable: true,
          padding: [20, 20],
          title: 'node-legend',
          typeField: 'nodeType',
          rows: 1,
          cols: 4,
          labelStyle: {
            spacing: 8,
            fontSize: 20,
          },
          markerStyle: {
            shape: 'circle',
            size: (type) => {
              return type === 'a' ? 10 : 20;
            },
            color: (type) => {
              return type === 'a' ? '#f00' : '#0f0';
            },
          },
        },
        edge: {
          enable: true,
          padding: [10, 20],
          title: 'edge-legend',
          typeField: 'edgeType',
          markerStyle: {
            color: (type) => {
              switch (type) {
                case 'e1':
                  return '#00f';
                case 'e2':
                  return '#f0f';
                case 'e3':
                  return '#0ff';
              }
            },
          },
        },
      },
    ],
  });
};
