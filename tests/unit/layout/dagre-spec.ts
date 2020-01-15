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
          value: 'pai_graph.conf'
        },
        {
          label: 'dot',
          value: 'pai_graph.dot'
        },
        {
          label: 'init',
          value: 'init.rc'
        }
      ]
    },
    {
      id: '1',
      type: 'alps',
      name: 'alps_file1',
      label: '1',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf'
        },
        {
          label: 'dot',
          value: 'pai_graph.dot'
        },
        {
          label: 'init',
          value: 'init.rc'
        }
      ]
    },
    {
      id: '4',
      type: 'sql',
      name: 'sql_file1',
      label: '4',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf'
        },
        {
          label: 'dot',
          value: 'pai_graph.dot'
        },
        {
          label: 'init',
          value: 'init.rc'
        }
      ]
    },
    {
      id: '5',
      type: 'sql',
      name: 'sql_file2',
      label: '5',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf'
        },
        {
          label: 'dot',
          value: 'pai_graph.dot'
        },
        {
          label: 'init',
          value: 'init.rc'
        }
      ]
    },
    {
      id: '6',
      type: 'feature_etl',
      name: 'feature_etl_1',
      label: '6',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf'
        },
        {
          label: 'dot',
          value: 'pai_graph.dot'
        },
        {
          label: 'init',
          value: 'init.rc'
        }
      ]
    },
    {
      id: '3',
      type: 'alps',
      name: 'alps_file3',
      label: '3',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf'
        },
        {
          label: 'dot',
          value: 'pai_graph.dot'
        },
        {
          label: 'init',
          value: 'init.rc'
        }
      ]
    },
    {
      id: '7',
      type: 'feature_etl',
      name: 'feature_etl_1',
      label: '7',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf'
        },
        {
          label: 'dot',
          value: 'pai_graph.dot'
        },
        {
          label: 'init',
          value: 'init.rc'
        }
      ]
    },
    {
      id: '8',
      type: 'feature_extractor',
      name: 'feature_extractor',
      label: '8',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf'
        },
        {
          label: 'dot',
          value: 'pai_graph.dot'
        },
        {
          label: 'init',
          value: 'init.rc'
        }
      ]
    }
  ],
  edges: [
    {
      source: '1',
      target: '2'
    },
    {
      source: '1',
      target: '3'
    },
    {
      source: '2',
      target: '4'
    },
    {
      source: '3',
      target: '4'
    },
    {
      source: '4',
      target: '5'
    },
    {
      source: '5',
      target: '6'
    },
    {
      source: '6',
      target: '7'
    },
    {
      source: '7',
      target: '8'
    }
  ]
};

describe.only('dagre layout', () => {
  it('layout with default configs', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      layout: {
        type: 'dagre'
      },
      defaultEdge: {
        shape: 'polyline'
      }
    });
    graph.data(data);
    graph.render();
    const node = data.nodes[0];
    const edge = data.edges[0];

    expect(mathEqual(node.x, 70)).toEqual(true);
    expect(mathEqual(node.y, 260)).toEqual(true);
    expect(mathEqual(edge.startPoint.x, 157)).toEqual(true);
    expect(mathEqual(edge.startPoint.y, 77)).toEqual(true);
    expect(mathEqual(edge.endPoint.x, 70)).toEqual(true);
    expect(mathEqual(edge.endPoint.y, 249)).toEqual(true);
    // graph.destroy();
  });
  it('dagre with number nodeSize and sepFunc', () => {
    data.edges.forEach((edgeItem) => {
      delete edgeItem.startPoint;
      delete edgeItem.endPoint;
      delete edgeItem.controlPoints;
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
        }
      },
      width: 500,
      height: 500,
      fitView: true,
    });
    graph.data(data);
    graph.render();

    const node = data.nodes[0];
    const edge = data.edges[0];

    expect(mathEqual(node.x, 185)).toEqual(true);
    expect(mathEqual(node.y, 25)).toEqual(true);
    expect(mathEqual(edge.startPoint.x, 54)).toEqual(true);
    expect(mathEqual(edge.startPoint.y, 71)).toEqual(true);
    expect(mathEqual(edge.endPoint.x, 175)).toEqual(true);
    expect(mathEqual(edge.endPoint.y, 28)).toEqual(true);
    expect(edge.controlPoints).toEqual(undefined);
    graph.destroy();
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
        }
      },
      defaultNode: {
        size: nodeSize,
        shape: 'rect'
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
    expect(mathEqual(edge.startPoint.x, 94)).toEqual(true);
    expect(mathEqual(edge.startPoint.y, 55)).toEqual(true);
    expect(mathEqual(edge.endPoint.x, 110)).toEqual(true);
    expect(mathEqual(edge.endPoint.y, 215)).toEqual(true);
    expect(edge.controlPoints).toEqual(undefined);
    graph.destroy();
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
        ranksep: null
      },
      defaultEdge: {
        shape: 'polyline',
        style: {
          radius: 20
        }
      },
      defaultNode: {
        shape: 'rect'
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
    expect(mathEqual(edge.startPoint.x, 75.5)).toEqual(true);
    expect(mathEqual(edge.startPoint.y, 151)).toEqual(true);
    expect(mathEqual(edge.endPoint.x, 187)).toEqual(true);
    expect(mathEqual(edge.endPoint.y, 60)).toEqual(true);
    expect(mathEqual(edge.controlPoints[0].x, 125)).toEqual(true);
    expect(mathEqual(edge.controlPoints[0].y, 60)).toEqual(true);
    expect(edge.controlPoints).not.toEqual(undefined);
    // graph.destroy();
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
        rankdir: 'LR'
      },
      defaultNode: {
        shape: 'rect'
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
    expect(mathEqual(edge.startPoint.x, 150.5)).toEqual(true);
    expect(mathEqual(edge.startPoint.y, 195)).toEqual(true);
    expect(mathEqual(edge.endPoint.x, 300)).toEqual(true);
    expect(mathEqual(edge.endPoint.y, 85)).toEqual(true);
    graph.destroy();
  });
});
