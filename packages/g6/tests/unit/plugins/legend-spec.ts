import { Graph } from '../../../src/index';
import { pxCompare } from '../util';

const container = document.createElement('div');
container.id = 'container';
document.querySelector('body').appendChild(container);

const createGraph = (plugins) => {
  return new Graph({
    container,
    width: 500,
    height: 500,
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
    node: {
      labelShape: {
        text: {
          fields: ['id'],
          formatter: (model) => {
            return model.id;
          },
        },
      },
    },
    modes: {
      default: ['brush-select'],
    },
    plugins,
  });
};
describe('plugin', () => {
  test('legend with string config', () => {
    const graph = createGraph([
      {
        type: 'legend',
        size: 'fit-content',
        // orientation: "vertical",
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
          // markerStyle: {
          //   shape: "circle",
          //   size: (type) => {
          //     return type === "a" ? 10 : 20;
          //   },
          //   color: (type) => {
          //     return type === "a" ? "#f00" : "#0f0";
          //   },
          // },
        },
        edge: {
          enable: true,
          padding: [10, 20],
          title: 'edge-legend',
          typeField: 'edgeType',
          // markerStyle: {
          //   color: (type) => {
          //     console.log("color", type === "e1" ? "#00f" : "#000");
          //     switch (type) {
          //       case "e1":
          //         return "#00f";
          //       case "e2":
          //         return "#f0f";
          //       case "e3":
          //         return "#0ff";
          //     }
          //   },
          // },
        },
      },
    ]);
    // graph.translate(0, -180);
  });
});
