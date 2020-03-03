import G6 from '../../../src';
import { mathEqual } from './util';

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

describe('dagre layout', () => {
  it('layout with default configs', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      layout: {
        type: 'dagre',
      },
      defaultEdge: {
        type: 'polyline',
        style: {
          endArrow: true
        }
      },
      defaultNode: {
        style: {
          opacity: 0.1
        }
      }
    });
    graph.data(data);
    graph.render();

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
  it.only('dagre with number nodeSize and sepFunc', () => {
    data.edges.forEach(edgeItem => {
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
        default: ['drag-canvas']
      }
    });
    graph.data(data);
    graph.render();

    const node = data.nodes[0];
    const edge = data.edges[0];

    expect(mathEqual(node.x, 185)).toEqual(true);
    expect(mathEqual(node.y, 25)).toEqual(true);
    expect(edge.controlPoints).toBe(undefined);
    console.log(graph);
    // graph.destroy();
  });
  it.only('dagre with array nodeSize', () => {
    data.edges.forEach(edgeItem => {
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

    const node = data.nodes[0];
    const edge = data.edges[0];

    expect(mathEqual(node.x, 60)).toEqual(true);
    expect(mathEqual(node.y, 215)).toEqual(true);
    expect(edge.controlPoints).toEqual(undefined);
    graph.destroy();
  });

  it.only('dagre with number size in node data, controlpoints', () => {
    data.edges.forEach(edgeItem => {
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

    const node = data.nodes[0];
    const edge = data.edges[0];

    expect(mathEqual(node.x, 197.5)).toEqual(true);
    expect(mathEqual(node.y, 60)).toEqual(true);
    expect(edge.controlPoints).not.toEqual(undefined);
    expect(mathEqual(edge.controlPoints[0].x, 125)).toEqual(true);
    expect(mathEqual(edge.controlPoints[0].y, 60)).toEqual(true);
    graph.destroy();
  });
  it.only('dagre with array size in node data', () => {
    data.edges.forEach(edgeItem => {
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

    const node = data.nodes[0];
    const edge = data.edges[0];

    expect(mathEqual(node.x, 350)).toEqual(true);
    expect(mathEqual(node.y, 85)).toEqual(true);
    expect(edge.controlPoints).not.toEqual(undefined);
    expect(mathEqual(edge.controlPoints[0].x, 225)).toEqual(true);
    expect(mathEqual(edge.controlPoints[0].y, 85)).toEqual(true);
    
    graph.destroy();
  });
});
