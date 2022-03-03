import G6 from '../../../src';
import { mathEqual } from './util';
import { GraphData } from '@antv/g6-core';

const div = document.createElement('div');
div.id = 'dagre';
document.body.appendChild(div);

const data: any = {
  nodes: [
    {
      id: '2',
      type: 'alps',
      name: 'alps_file2',
      label: '2',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf',
        },
        {
          label: 'dot',
          value: 'pai_graph.dot',
        },
        {
          label: 'init',
          value: 'init.rc',
        },
      ],
    },
    {
      id: '1',
      type: 'alps',
      name: 'alps_file1',
      label: '1',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf',
        },
        {
          label: 'dot',
          value: 'pai_graph.dot',
        },
        {
          label: 'init',
          value: 'init.rc',
        },
      ],
    },
    {
      id: '4',
      type: 'sql',
      name: 'sql_file1',
      label: '4',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf',
        },
        {
          label: 'dot',
          value: 'pai_graph.dot',
        },
        {
          label: 'init',
          value: 'init.rc',
        },
      ],
    },
    {
      id: '5',
      type: 'sql',
      name: 'sql_file2',
      label: '5',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf',
        },
        {
          label: 'dot',
          value: 'pai_graph.dot',
        },
        {
          label: 'init',
          value: 'init.rc',
        },
      ],
    },
    {
      id: '6',
      type: 'feature_etl',
      name: 'feature_etl_1',
      label: '6',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf',
        },
        {
          label: 'dot',
          value: 'pai_graph.dot',
        },
        {
          label: 'init',
          value: 'init.rc',
        },
      ],
    },
    {
      id: '3',
      type: 'alps',
      name: 'alps_file3',
      label: '3',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf',
        },
        {
          label: 'dot',
          value: 'pai_graph.dot',
        },
        {
          label: 'init',
          value: 'init.rc',
        },
      ],
    },
    {
      id: '7',
      type: 'feature_etl',
      name: 'feature_etl_1',
      label: '7',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf',
        },
        {
          label: 'dot',
          value: 'pai_graph.dot',
        },
        {
          label: 'init',
          value: 'init.rc',
        },
      ],
    },
    {
      id: '8',
      type: 'feature_extractor',
      name: 'feature_extractor',
      label: '8',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf',
        },
        {
          label: 'dot',
          value: 'pai_graph.dot',
        },
        {
          label: 'init',
          value: 'init.rc',
        },
      ],
    },
  ],
  edges: [
    {
      source: '1',
      target: '2',
    },
    {
      source: '1',
      target: '3',
    },
    {
      source: '2',
      target: '4',
    },
    {
      source: '3',
      target: '4',
    },
    {
      source: '4',
      target: '5',
    },
    {
      source: '5',
      target: '6',
    },
    {
      source: '6',
      target: '7',
    },
    {
      source: '7',
      target: '8',
    },
  ],
};
describe('dagre layout with combo', () => {
  const data2: GraphData = {
    nodes: [
      {
        id: '1',
        comboId: 'c1',
      },
      {
        id: '2',
      },
      {
        id: '3',
      },
      {
        id: '4',
      },
      {
        id: '1-1',
      },
      {
        id: '1-2',
        comboId: 'c1',
      },
      {
        id: '1-3',
        comboId: 'c1',
      },
      {
        id: '1-4',
      },
      {
        id: '1-5',
      },
      {
        id: '1-6',
      },
      {
        id: '1-1-1',
      },
      {
        id: '1-1-2',
      },
      {
        id: '1-1-3',
      },
      {
        id: '1-1-4',
      },
      {
        id: '1-1-5',
      },
      {
        id: '1-1-6',
      },
    ],
    edges: [
      { source: '2', target: '3' },
      { source: '3', target: '4' },
      { source: '1', target: '1-1' },
      { source: '1', target: '1-2' },
      { source: '1-2', target: '2' },
      { source: '1', target: '1-3' },
      { source: '1-3', target: '2' },
      { source: '1', target: '1-4' },
      { source: '1-4', target: '2' },
      { source: '1', target: '1-5' },
      { source: '1-5', target: '2' },
      { source: '1', target: '1-6' },
      { source: '1-6', target: '2' },
      { source: '1-1', target: '1-1-1' },
      { source: '1-1-1', target: '2' },
      { source: '1-1', target: '1-1-2' },
      { source: '1-1-2', target: '2' },
      { source: '1-1', target: '1-1-3' },
      { source: '1-1-3', target: '2' },
      { source: '1-1', target: '1-1-4' },
      { source: '1-1-4', target: '2' },
      { source: '1-1', target: '1-1-5' },
      { source: '1-1-5', target: '2' },
      { source: '1-1', target: '1-1-6' },
      { source: '1-1-6', target: '2' },
    ],
    combos: [
      {
        id: 'c1',
        type: 'rect',
        label: 'c1',
      },
    ],
  };
  data2.nodes.forEach((node) => {
    node.label = node.id;
  });
  it('layout with one level combo', (done) => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      layout: {
        type: 'dagre',
        controlPoints: true,
        sortByCombo: true,
        ranksep: 1,
        nodesep: 10,
      },
      defaultEdge: {
        type: 'polyline',
        style: {
          endArrow: true,
        },
      },
      modes: {
        default: ['drag-combo'],
      },
    });
    graph.data(data2);
    graph.render();

    graph.on('afterlayout', () => {
      console.log(graph.findById('1').getModel());
      console.log(graph.findById('1-2').getModel());
      console.log(graph.findById('1-1-1').getModel());

      expect(graph.findById('1').getModel().x).toBe(145);
      expect(graph.findById('1').getModel().y).toBe(21.5);
      expect(graph.findById('1-2').getModel().x).toBe(45);
      expect(graph.findById('1-2').getModel().y).toBe(107.5);
      expect(graph.findById('1-1-1').getModel().x).toBe(470);
      expect(graph.findById('1-1-1').getModel().y).toBe(107.5);

      graph.destroy();
      done()
    })
  });

  it('layout with nested combos', () => {

    const data3 = {
      nodes: [
        {
          id: "0",
          label: "0"
        },
        {
          id: "1",
          label: "1"
        },
        {
          id: "2",
          label: "2"
        },
        {
          id: "3",
          label: "3"
        },
        {
          id: "4",
          label: "4",
          comboId: "A"
        },
        {
          id: "5",
          label: "5",
          comboId: "B"
        },
        {
          id: "6",
          label: "6",
          comboId: "A"
        },
        {
          id: "7",
          label: "7",
          comboId: "C"
        },
        {
          id: "8",
          label: "8",
          comboId: "C"
        },
        {
          id: "9",
          label: "9",
          comboId: "A"
        },
        {
          id: "10",
          label: "10",
          comboId: "B"
        },
        {
          id: "11",
          label: "11",
          comboId: "B"
        }
      ],
      edges: [
        {
          source: "0",
          target: "1"
        },
        {
          source: "0",
          target: "2"
        },
        {
          source: "1",
          target: "4"
        },
        {
          source: "0",
          target: "3"
        },
        {
          source: "3",
          target: "4"
        },
        {
          source: "2",
          target: "5"
        },
        {
          source: "1",
          target: "6"
        },
        {
          source: "1",
          target: "7"
        },
        {
          source: "3",
          target: "8"
        },
        {
          source: "3",
          target: "9"
        },
        {
          source: "5",
          target: "10"
        },
        {
          source: "5",
          target: "11"
        }
      ],
      combos: [
        {
          id: "A",
          label: "combo A"
        },
        {
          id: "B",
          label: "combo B"
        },
        {
          id: "C",
          label: "combo C",
          parentId: "A"
        }
      ]
    };
    const graph = new G6.Graph({
      container: div,
      width: 800,
      height: 500,
      fitView: true,
      fitViewPadding: 50,
      layout: {
        type: 'dagre',
        controlPoints: true,
        sortByCombo: true,
        ranksep: 20,
        nodesep: 10,
      },
      defaultEdge: {
        type: 'polyline',
        style: {
          endArrow: true,
        },
      },
      modes: {
        default: ['drag-combo'],
      },
      defaultCombo: {
        type: 'rect'
      }
    });
    graph.data(data3);
    graph.render();

    graph.on('afterlayout', () => {
      console.log(graph.findById('5').getModel());
      console.log(graph.findById('7').getModel());
      console.log(graph.findById('8').getModel());
      console.log(graph.findById('9').getModel());

      expect(graph.findById('5').getModel().x).toBe(527.5);
      expect(graph.findById('5').getModel().y).toBe(260);
      expect(graph.findById('7').getModel().x).toBe(282.5);
      expect(graph.findById('7').getModel().y).toBe(260);
      expect(graph.findById('8').getModel().x).toBe(352.5);
      expect(graph.findById('8').getModel().y).toBe(260);
      expect(graph.findById('9').getModel().x).toBe(192.5);
      expect(graph.findById('9').getModel().y).toBe(260);

      graph.destroy();
    })
  });
});

describe('dagre layout', () => {
  it('layout with default configs', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      layout: {
        type: 'dagre',
        controlPoints: true,
      },
      defaultEdge: {
        type: 'polyline',
        style: {
          endArrow: true,
        },
      },
      defaultNode: {
        style: {
          opacity: 0.1,
        },
      },
    });
    graph.data(data);
    graph.render();

    graph.on('afterlayout', () => {
      const endNode = data.nodes[0];
      const startNode = data.nodes[1];
      const edge = data.edges[0];
      expect(mathEqual(startNode.x, 165)).toEqual(true);
      expect(mathEqual(startNode.y, 70)).toEqual(true);
      expect(mathEqual(endNode.x, 70)).toEqual(true);
      expect(mathEqual(endNode.y, 260)).toEqual(true);
      expect(mathEqual(edge.controlPoints[0].x, 70)).toEqual(true);
      expect(mathEqual(edge.controlPoints[0].y, 165)).toEqual(true);
      graph.destroy();
    });
  });
  it('dagre with number nodeSize and sepFunc', () => {
    data.edges.forEach((edgeItem) => {
      delete edgeItem.startPoint;
      delete edgeItem.endPoint;
      delete edgeItem.controlPoints;
      delete edgeItem.type;
    });
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'dagre',
        rankdir: 'LR',
        controlPoints: false,
        nodeSize: 30,
        nodesepFunc: () => {
          return 10;
        },
        ranksepFunc: () => {
          return 30;
        },
      },
      width: 500,
      height: 500,
      fitView: true,
      modes: {
        default: ['drag-canvas'],
      },
    });
    graph.data(data);
    graph.render();

    graph.on('afterlayout', () => {
      const node = data.nodes[0];
      const edge = data.edges[0];

      expect(mathEqual(node.x, 185)).toEqual(true);
      expect(mathEqual(node.y, 25)).toEqual(true);
      expect(edge.controlPoints).toBe(undefined);
      // console.log(graph);
      // graph.destroy();
    });
  });
  it('dagre with array nodeSize', () => {
    data.edges.forEach((edgeItem) => {
      delete edgeItem.startPoint;
      delete edgeItem.endPoint;
      delete edgeItem.controlPoints;
    });
    const nodeSize = [100, 50];
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'dagre',
        controlPoints: false,
        nodeSize,
        nodesepFunc: () => {
          return 10;
        },
        ranksepFunc: () => {
          return 30;
        },
      },
      defaultNode: {
        size: nodeSize,
        type: 'rect',
      },
      width: 500,
      height: 500,
      fitView: true,
    });
    graph.data(data);
    graph.render();

    graph.on('afterlayout', () => {
      const node = data.nodes[0];
      const edge = data.edges[0];

      expect(mathEqual(node.x, 60)).toEqual(true);
      expect(mathEqual(node.y, 215)).toEqual(true);
      expect(edge.controlPoints).toEqual(undefined);
      graph.destroy();
    });
  });

  it('dagre with number size in node data, controlpoints', () => {
    data.edges.forEach((edgeItem) => {
      delete edgeItem.startPoint;
      delete edgeItem.endPoint;
      delete edgeItem.controlPoints;
    });
    data.nodes.forEach((node, i) => {
      node.size = 20 + i * 5;
    });
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'dagre',
        rankdir: 'LR',
        controlPoints: true,
        ranksep: null,
      },
      defaultEdge: {
        type: 'polyline',
        style: {
          radius: 20,
        },
      },
      defaultNode: {
        type: 'rect',
      },
      width: 500,
      height: 500,
      fitView: true,
    });
    graph.data(data);
    graph.render();

    graph.on('afterlayout', () => {
      const node = data.nodes[0];
      const edge = data.edges[0];

      expect(mathEqual(node.x, 197.5)).toEqual(true);
      expect(mathEqual(node.y, 60)).toEqual(true);
      expect(edge.controlPoints).not.toEqual(undefined);
      expect(mathEqual(edge.controlPoints[0].x, 125)).toEqual(true);
      expect(mathEqual(edge.controlPoints[0].y, 60)).toEqual(true);
      graph.destroy();
    });
  });
  it('dagre with array size in node data', () => {
    data.edges.forEach((edgeItem) => {
      delete edgeItem.startPoint;
      delete edgeItem.endPoint;
      delete edgeItem.controlPoints;
    });
    data.nodes.forEach((node, i) => {
      node.size = [100, 70];
    });
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'dagre',
        rankdir: 'LR',
      },
      defaultNode: {
        type: 'rect',
      },
      width: 500,
      height: 500,
      fitView: true,
    });
    graph.data(data);
    graph.render();

    graph.on('afterlayout', () => {
      const node = data.nodes[0];
      const edge = data.edges[0];

      expect(mathEqual(node.x, 350)).toEqual(true);
      expect(mathEqual(node.y, 85)).toEqual(true);
      expect(edge.controlPoints).toEqual(undefined);

      graph.destroy();
    });
  });
});
