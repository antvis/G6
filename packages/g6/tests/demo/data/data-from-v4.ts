import { Layout, LayoutMapping } from '@antv/layout';
import {
  Graph,
  extend,
  stdLib,
  Extensions,
  GraphCore,
} from '../../../src/index';
import { TestCaseContext } from '../interface';
import { GraphDataChanges } from '../../../src/types/data';

const edgeClusterTransform = (
  data: GraphDataChanges,
  options = {},
  graphCore?: GraphCore,
): GraphDataChanges => {
  const { dataAdded, dataRemoved, dataUpdated } = data;
  const handler = (data, options = {}, userGraphCore) => {
    const { nodes, edges } = data;
    const nodeMap = new Map();
    nodes?.forEach((node) => nodeMap.set(node.id, node));
    edges?.forEach((edge) => {
      edge.data.cluster = nodeMap.get(edge.source).data.cluster;
    });
    return data;
  };
  return {
    dataAdded: handler(dataAdded, options, graphCore),
    dataUpdated: handler(dataUpdated, options, graphCore),
    dataRemoved: handler(dataRemoved, options, graphCore),
  };
};

class LineLayout implements Layout<{}> {
  id = 'line-layout';

  constructor(public options = {}) {
    this.options = options;
  }
  /**
   * Return the positions of nodes and edges(if needed).
   */
  async execute(graph, options = {}) {
    return this.genericLineLayout(false, graph, options);
  }
  /**
   * To directly assign the positions to the nodes.
   */
  async assign(graph, options = {}) {
    this.genericLineLayout(true, graph, options);
  }

  private async genericLineLayout(
    assign: boolean,
    graph,
    options = {},
  ): Promise<LayoutMapping | void> {
    const { height = 500 } = { ...this.options, ...options };

    const nodes = graph.getAllNodes();
    const edges = graph.getAllEdges();
    const layoutNodes = [];
    let x = 10;
    let lastNodeRadius = 0;
    nodes.forEach((node, i) => {
      const currentRadius = node.data.keyShape?.r || 16;
      if (i > 0) {
        x = layoutNodes[i - 1].data.x + lastNodeRadius + currentRadius + 4;
      }
      layoutNodes.push({
        id: node.id,
        data: {
          x,
          y: height * 0.7,
        },
      });
      lastNodeRadius = currentRadius;
    });
    const result = {
      nodes: layoutNodes,
      edges,
    };

    if (assign) {
      layoutNodes.forEach((node) => {
        graph.mergeNodeData(node.id, {
          x: node.data.x,
          y: node.data.y,
        });
      });
    }
    return result;
  }
}

const data = {
  nodes: [
    {
      id: '0',
      name: 'analytics.cluster',
      cluster: 'analytics',
      value: 21,
    },
    {
      id: '1',
      name: 'analytics.graph',
      cluster: 'analytics',
      value: 34,
    },
    {
      id: '2',
      name: 'analytics.optimization',
      cluster: 'analytics',
      value: 8,
    },
    {
      id: '3',
      name: 'animate',
      cluster: 'animate',
      value: 40,
    },
    {
      id: '4',
      name: 'animate.interpolate',
      cluster: 'animate',
      value: 18,
    },
    {
      id: '5',
      name: 'data.converters',
      cluster: 'data',
      value: 25,
    },
    {
      id: '6',
      name: 'data',
      cluster: 'data',
      value: 10,
    },
    {
      id: '7',
      name: 'display',
      cluster: 'display',
      value: 4,
    },
    {
      id: '8',
      name: 'flex',
      cluster: 'flex',
      value: 6,
    },
    {
      id: '9',
      name: 'physics',
      cluster: 'physics',
      value: 22,
    },
    {
      id: '10',
      name: 'query',
      cluster: 'query',
      value: 67,
    },
    {
      id: '11',
      name: 'query.methods',
      cluster: 'query',
      value: 71,
    },
    {
      id: '12',
      name: 'scale',
      cluster: 'scale',
      value: 33,
    },
    {
      id: '13',
      name: 'util',
      cluster: 'util',
      value: 23,
    },
    {
      id: '14',
      name: 'util.heap',
      cluster: 'util',
      value: 2,
    },
    {
      id: '15',
      cluster: 'util',
      name: 'util.math',
      value: 2,
    },
    {
      id: '16',
      name: 'util.palette',
      cluster: 'util',
      value: 5,
    },
    {
      id: '17',
      name: 'vis.axis',
      cluster: 'vis',
      value: 24,
    },
    {
      id: '18',
      name: 'vis.controls',
      cluster: 'vis',
      value: 28,
    },
    {
      id: '19',
      name: 'vis.data',
      cluster: 'vis',
      value: 70,
    },
    {
      id: '20',
      name: 'vis.data.render',
      cluster: 'vis',
      value: 11,
    },
    {
      id: '21',
      name: 'vis.events',
      cluster: 'vis',
      value: 8,
    },
    {
      id: '22',
      name: 'vis.legend',
      cluster: 'vis',
      value: 27,
    },
    {
      id: '23',
      name: 'vis.operator.distortion',
      cluster: 'vis',
      value: 9,
    },
    {
      id: '24',
      name: 'vis.operator.encoder',
      cluster: 'vis',
      value: 30,
    },
    {
      id: '25',
      name: 'vis.operator.filter',
      cluster: 'vis',
      value: 17,
    },
    {
      id: '26',
      name: 'vis.operator',
      cluster: 'vis',
      value: 27,
    },
    {
      id: '27',
      name: 'vis.operator.label',
      cluster: 'vis',
      value: 18,
    },
    {
      id: '28',
      name: 'vis.operator.layout',
      cluster: 'vis',
      value: 91,
    },
    {
      id: '29',
      name: 'vis',
      cluster: 'vis',
      value: 13,
    },
  ],
  edges: [
    {
      source: '10',
      target: '10',
      sourceWeight: 61,
      targetWeight: 61,
    },
    {
      source: '11',
      target: '11',
      sourceWeight: 39,
      targetWeight: 39,
    },
    {
      source: '3',
      target: '3',
      sourceWeight: 30,
      targetWeight: 30,
    },
    {
      source: '19',
      target: '19',
      sourceWeight: 26,
      targetWeight: 26,
    },
    {
      source: '13',
      target: '13',
      sourceWeight: 23,
      targetWeight: 23,
    },
    {
      source: '9',
      target: '9',
      sourceWeight: 22,
      targetWeight: 22,
    },
    {
      source: '12',
      target: '12',
      sourceWeight: 19,
      targetWeight: 19,
    },
    {
      source: '28',
      target: '19',
      sourceWeight: 34,
      targetWeight: 0,
    },
    {
      source: '4',
      target: '4',
      sourceWeight: 16,
      targetWeight: 16,
    },
    {
      source: '11',
      target: '10',
      sourceWeight: 32,
      targetWeight: 0,
    },
    {
      source: '28',
      target: '28',
      sourceWeight: 14,
      targetWeight: 14,
    },
    {
      source: '18',
      target: '18',
      sourceWeight: 12,
      targetWeight: 12,
    },
    {
      source: '26',
      target: '26',
      sourceWeight: 11,
      targetWeight: 11,
    },
    {
      source: '28',
      target: '13',
      sourceWeight: 20,
      targetWeight: 0,
    },
    {
      source: '5',
      target: '6',
      sourceWeight: 17,
      targetWeight: 2,
    },
    {
      source: '19',
      target: '13',
      sourceWeight: 17,
      targetWeight: 0,
    },
    {
      source: '17',
      target: '17',
      sourceWeight: 7,
      targetWeight: 7,
    },
    {
      source: '6',
      target: '6',
      sourceWeight: 7,
      targetWeight: 7,
    },
    {
      source: '12',
      target: '13',
      sourceWeight: 14,
      targetWeight: 0,
    },
    {
      source: '1',
      target: '19',
      sourceWeight: 14,
      targetWeight: 0,
    },
    {
      source: '5',
      target: '5',
      sourceWeight: 7,
      targetWeight: 7,
    },
    {
      source: '21',
      target: '19',
      sourceWeight: 6,
      targetWeight: 4,
    },
    {
      source: '25',
      target: '19',
      sourceWeight: 10,
      targetWeight: 0,
    },
    {
      source: '0',
      target: '0',
      sourceWeight: 5,
      targetWeight: 5,
    },
    {
      source: '3',
      target: '13',
      sourceWeight: 9,
      targetWeight: 0,
    },
    {
      source: '20',
      target: '19',
      sourceWeight: 5,
      targetWeight: 4,
    },
    {
      source: '19',
      target: '12',
      sourceWeight: 9,
      targetWeight: 0,
    },
    {
      source: '0',
      target: '19',
      sourceWeight: 8,
      targetWeight: 0,
    },
    {
      source: '24',
      target: '19',
      sourceWeight: 8,
      targetWeight: 0,
    },
    {
      source: '22',
      target: '22',
      sourceWeight: 4,
      targetWeight: 4,
    },
    {
      source: '24',
      target: '24',
      sourceWeight: 4,
      targetWeight: 4,
    },
    {
      source: '26',
      target: '3',
      sourceWeight: 7,
      targetWeight: 0,
    },
    {
      source: '24',
      target: '16',
      sourceWeight: 7,
      targetWeight: 0,
    },
    {
      source: '16',
      target: '16',
      sourceWeight: 3,
      targetWeight: 3,
    },
    {
      source: '10',
      target: '13',
      sourceWeight: 6,
      targetWeight: 0,
    },
    {
      source: '7',
      target: '7',
      sourceWeight: 3,
      targetWeight: 3,
    },
    {
      source: '22',
      target: '13',
      sourceWeight: 6,
      targetWeight: 0,
    },
    {
      source: '20',
      target: '20',
      sourceWeight: 3,
      targetWeight: 3,
    },
    {
      source: '1',
      target: '26',
      sourceWeight: 6,
      targetWeight: 0,
    },
    {
      source: '27',
      target: '19',
      sourceWeight: 6,
      targetWeight: 0,
    },
    {
      source: '28',
      target: '12',
      sourceWeight: 6,
      targetWeight: 0,
    },
    {
      source: '22',
      target: '7',
      sourceWeight: 6,
      targetWeight: 0,
    },
    {
      source: '28',
      target: '3',
      sourceWeight: 6,
      targetWeight: 0,
    },
    {
      source: '17',
      target: '7',
      sourceWeight: 5,
      targetWeight: 0,
    },
    {
      source: '26',
      target: '13',
      sourceWeight: 5,
      targetWeight: 0,
    },
    {
      source: '27',
      target: '13',
      sourceWeight: 5,
      targetWeight: 0,
    },
    {
      source: '1',
      target: '13',
      sourceWeight: 5,
      targetWeight: 0,
    },
    {
      source: '1',
      target: '3',
      sourceWeight: 5,
      targetWeight: 0,
    },
    {
      source: '26',
      target: '29',
      sourceWeight: 3,
      targetWeight: 2,
    },
    {
      source: '22',
      target: '16',
      sourceWeight: 5,
      targetWeight: 0,
    },
    {
      source: '18',
      target: '21',
      sourceWeight: 4,
      targetWeight: 0,
    },
    {
      source: '22',
      target: '12',
      sourceWeight: 4,
      targetWeight: 0,
    },
    {
      source: '23',
      target: '23',
      sourceWeight: 2,
      targetWeight: 2,
    },
    {
      source: '17',
      target: '29',
      sourceWeight: 2,
      targetWeight: 2,
    },
    {
      source: '28',
      target: '17',
      sourceWeight: 4,
      targetWeight: 0,
    },
    {
      source: '15',
      target: '15',
      sourceWeight: 2,
      targetWeight: 2,
    },
    {
      source: '17',
      target: '12',
      sourceWeight: 4,
      targetWeight: 0,
    },
    {
      source: '27',
      target: '27',
      sourceWeight: 2,
      targetWeight: 2,
    },
    {
      source: '14',
      target: '14',
      sourceWeight: 2,
      targetWeight: 2,
    },
    {
      source: '18',
      target: '29',
      sourceWeight: 3,
      targetWeight: 1,
    },
    {
      source: '25',
      target: '26',
      sourceWeight: 3,
      targetWeight: 0,
    },
    {
      source: '28',
      target: '9',
      sourceWeight: 3,
      targetWeight: 0,
    },
    {
      source: '27',
      target: '7',
      sourceWeight: 3,
      targetWeight: 0,
    },
    {
      source: '24',
      target: '12',
      sourceWeight: 3,
      targetWeight: 0,
    },
    {
      source: '17',
      target: '13',
      sourceWeight: 3,
      targetWeight: 0,
    },
    {
      source: '18',
      target: '13',
      sourceWeight: 3,
      targetWeight: 0,
    },
    {
      source: '20',
      target: '13',
      sourceWeight: 3,
      targetWeight: 0,
    },
    {
      source: '0',
      target: '13',
      sourceWeight: 3,
      targetWeight: 0,
    },
    {
      source: '24',
      target: '13',
      sourceWeight: 3,
      targetWeight: 0,
    },
    {
      source: '19',
      target: '6',
      sourceWeight: 3,
      targetWeight: 0,
    },
    {
      source: '29',
      target: '3',
      sourceWeight: 3,
      targetWeight: 0,
    },
    {
      source: '25',
      target: '3',
      sourceWeight: 3,
      targetWeight: 0,
    },
    {
      source: '24',
      target: '3',
      sourceWeight: 3,
      targetWeight: 0,
    },
    {
      source: '17',
      target: '3',
      sourceWeight: 3,
      targetWeight: 0,
    },
    {
      source: '0',
      target: '15',
      sourceWeight: 2,
      targetWeight: 0,
    },
    {
      source: '28',
      target: '26',
      sourceWeight: 2,
      targetWeight: 0,
    },
    {
      source: '24',
      target: '26',
      sourceWeight: 2,
      targetWeight: 0,
    },
    {
      source: '16',
      target: '13',
      sourceWeight: 2,
      targetWeight: 0,
    },
    {
      source: '1',
      target: '14',
      sourceWeight: 2,
      targetWeight: 0,
    },
    {
      source: '29',
      target: '21',
      sourceWeight: 2,
      targetWeight: 0,
    },
    {
      source: '21',
      target: '21',
      sourceWeight: 1,
      targetWeight: 1,
    },
    {
      source: '29',
      target: '19',
      sourceWeight: 2,
      targetWeight: 0,
    },
    {
      source: '19',
      target: '14',
      sourceWeight: 2,
      targetWeight: 0,
    },
    {
      source: '4',
      target: '13',
      sourceWeight: 2,
      targetWeight: 0,
    },
    {
      source: '19',
      target: '15',
      sourceWeight: 2,
      targetWeight: 0,
    },
    {
      source: '8',
      target: '17',
      sourceWeight: 2,
      targetWeight: 0,
    },
    {
      source: '2',
      target: '13',
      sourceWeight: 2,
      targetWeight: 0,
    },
    {
      source: '18',
      target: '19',
      sourceWeight: 2,
      targetWeight: 0,
    },
    {
      source: '1',
      target: '1',
      sourceWeight: 1,
      targetWeight: 1,
    },
    {
      source: '23',
      target: '17',
      sourceWeight: 2,
      targetWeight: 0,
    },
    {
      source: '23',
      target: '19',
      sourceWeight: 2,
      targetWeight: 0,
    },
    {
      source: '0',
      target: '3',
      sourceWeight: 2,
      targetWeight: 0,
    },
    {
      source: '18',
      target: '3',
      sourceWeight: 2,
      targetWeight: 0,
    },
    {
      source: '19',
      target: '3',
      sourceWeight: 2,
      targetWeight: 0,
    },
    {
      source: '29',
      target: '13',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '8',
      target: '29',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '21',
      target: '3',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '22',
      target: '3',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '3',
      target: '4',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '2',
      target: '29',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '22',
      target: '19',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '23',
      target: '3',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '2',
      target: '26',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '2',
      target: '19',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '26',
      target: '19',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '2',
      target: '17',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '27',
      target: '3',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '5',
      target: '13',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '2',
      target: '12',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '28',
      target: '20',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '18',
      target: '28',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '23',
      target: '21',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '8',
      target: '6',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '2',
      target: '3',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '1',
      target: '29',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '23',
      target: '28',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '6',
      target: '13',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '25',
      target: '13',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '8',
      target: '7',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '7',
      target: '13',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '27',
      target: '26',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '18',
      target: '7',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '0',
      target: '26',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '19',
      target: '7',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '8',
      target: '19',
      sourceWeight: 1,
      targetWeight: 0,
    },
    {
      source: '28',
      target: '29',
      sourceWeight: 1,
      targetWeight: 0,
    },
  ],
};

const data2 = {
  nodes: [
    {
      id: '0',
      label: '0',
    },
    {
      id: '1',
      label: '1',
    },
    {
      id: '2',
      label: '2',
    },
    {
      id: '3',
      label: '3',
    },
    {
      id: '4',
      label: '4',
    },
    {
      id: '5',
      label: '5',
    },
    {
      id: '6',
      label: '6',
    },
    {
      id: '7',
      label: '7',
    },
    {
      id: '8',
      label: '8',
    },
    {
      id: '9',
      label: '9',
    },
    {
      id: '10',
      label: '10',
    },
    {
      id: '11',
      label: '11',
    },
    {
      id: '12',
      label: '12',
    },
    {
      id: '13',
      label: '13',
    },
    {
      id: '14',
      label: '14',
    },
    {
      id: '15',
      label: '15',
    },
    {
      id: '16',
      label: '16',
    },
    {
      id: '17',
      label: '17',
    },
    {
      id: '18',
      label: '18',
    },
    {
      id: '19',
      label: '19',
    },
    {
      id: '20',
      label: '20',
    },
    {
      id: '21',
      label: '21',
    },
    {
      id: '22',
      label: '22',
    },
    {
      id: '23',
      label: '23',
    },
    {
      id: '24',
      label: '24',
    },
    {
      id: '25',
      label: '25',
    },
    {
      id: '26',
      label: '26',
    },
    {
      id: '27',
      label: '27',
    },
    {
      id: '28',
      label: '28',
    },
    {
      id: '29',
      label: '29',
    },
    {
      id: '30',
      label: '30',
    },
    {
      id: '31',
      label: '31',
    },
    {
      id: '32',
      label: '32',
    },
    {
      id: '33',
      label: '33',
    },
  ],
  edges: [
    {
      source: '0',
      target: '1',
    },
    {
      source: '0',
      target: '2',
    },
    {
      source: '0',
      target: '3',
    },
    {
      source: '0',
      target: '4',
    },
    {
      source: '0',
      target: '5',
    },
    {
      source: '0',
      target: '7',
    },
    {
      source: '0',
      target: '8',
    },
    {
      source: '0',
      target: '9',
    },
    {
      source: '0',
      target: '10',
    },
    {
      source: '0',
      target: '11',
    },
    {
      source: '0',
      target: '13',
    },
    {
      source: '0',
      target: '14',
    },
    {
      source: '0',
      target: '15',
    },
    {
      source: '0',
      target: '16',
    },
    {
      source: '2',
      target: '3',
    },
    {
      source: '4',
      target: '5',
    },
    {
      source: '4',
      target: '6',
    },
    {
      source: '5',
      target: '6',
    },
    {
      source: '7',
      target: '13',
    },
    {
      source: '8',
      target: '14',
    },
    {
      source: '9',
      target: '10',
    },
    {
      source: '10',
      target: '22',
    },
    {
      source: '10',
      target: '14',
    },
    {
      source: '10',
      target: '12',
    },
    {
      source: '10',
      target: '24',
    },
    {
      source: '10',
      target: '21',
    },
    {
      source: '10',
      target: '20',
    },
    {
      source: '11',
      target: '24',
    },
    {
      source: '11',
      target: '22',
    },
    {
      source: '11',
      target: '14',
    },
    {
      source: '12',
      target: '13',
    },
    {
      source: '16',
      target: '17',
    },
    {
      source: '16',
      target: '18',
    },
    {
      source: '16',
      target: '21',
    },
    {
      source: '16',
      target: '22',
    },
    {
      source: '17',
      target: '18',
    },
    {
      source: '17',
      target: '20',
    },
    {
      source: '18',
      target: '19',
    },
    {
      source: '19',
      target: '20',
    },
    {
      source: '19',
      target: '33',
    },
    {
      source: '19',
      target: '22',
    },
    {
      source: '19',
      target: '23',
    },
    {
      source: '20',
      target: '21',
    },
    {
      source: '21',
      target: '22',
    },
    {
      source: '22',
      target: '24',
    },
    {
      source: '22',
      target: '25',
    },
    {
      source: '22',
      target: '26',
    },
    {
      source: '22',
      target: '23',
    },
    {
      source: '22',
      target: '28',
    },
    {
      source: '22',
      target: '30',
    },
    {
      source: '22',
      target: '31',
    },
    {
      source: '22',
      target: '32',
    },
    {
      source: '22',
      target: '33',
    },
    {
      source: '23',
      target: '28',
    },
    {
      source: '23',
      target: '27',
    },
    {
      source: '23',
      target: '29',
    },
    {
      source: '23',
      target: '30',
    },
    {
      source: '23',
      target: '31',
    },
    {
      source: '23',
      target: '33',
    },
    {
      source: '32',
      target: '33',
    },
  ],
};

export default (context: TestCaseContext, options?: {}) => {
  const CustomGraph = extend(Graph, {
    transforms: {
      'edge-cluster': edgeClusterTransform,
      'transform-v4-data': Extensions.TransformV4Data,
      'map-node-size': Extensions.MapNodeSize,
    },
    edges: {
      'quadratic-edge': Extensions.QuadraticEdge,
    },
    layouts: {
      'line-layout': LineLayout,
    },
  });

  const { width, height } = context;
  const graph = new CustomGraph({
    ...context,
    transforms: [
      'transform-v4-data',
      {
        type: 'map-node-size',
        field: 'value',
      },
      'edge-cluster',
    ],
    layout: {
      type: 'circular',
    },
    theme: {
      type: 'spec',
      specification: {
        node: {
          dataTypeField: 'cluster',
        },
        edge: {
          dataTypeField: 'cluster',
        },
      },
    },
    node: (model) => {
      return {
        id: model.id,
        data: {
          ...model.data,
          labelShape: {
            position: 'right',
            textAlign: 'left',
            offsetX: 0,
            offsetY: 0,
            ...model.data.labelShape,
            text: model.data.name,
            maxWidth: 100,
          },
          animates: {
            update: [
              {
                fields: ['opacity'],
                shapeId: 'haloShape',
              },
              {
                fields: ['lineWidth'],
                shapeId: 'keyShape',
              },
            ],
          },
        },
      };
    },
    edge: {
      type: 'quadratic-edge',
      keyShape: {
        opacity: 0.4,
        controlPoints: [{ x: width / 2, y: height / 2 }],
      },
    },
    modes: {
      default: ['drag-node', 'click-select', 'zoom-canvas', 'drag-canvas'],
    },
    data,
  });

  // const graph = new CustomGraph({
  //   ...context,
  //   transforms: [
  //     'transform-v4-data',
  //     'edge-cluster',
  //     {
  //       type: 'map-node-size',
  //       field: 'value',
  //     },
  //   ],
  //   data,
  //   layout: { type: 'line-layout' },
  //   theme: {
  //     type: 'spec',
  //     specification: {
  //       node: {
  //         dataTypeField: 'cluster',
  //       },
  //       edge: {
  //         dataTypeField: 'cluster',
  //       },
  //     },
  //   },
  //   node: {
  //     keyShape: {
  //       r: 8,
  //     },
  //     labelShape: {
  //       text: {
  //         fields: ['name'],
  //         formatter: (model) => model.data.name,
  //       },
  //       angle: Math.PI / 2,
  //       textAlign: 'left',
  //       offsetX: 10,
  //       maxWidth: 100,
  //     },
  //     anchorPoints: [[0.5, 0]],
  //   },
  //   edge: {
  //     type: 'quadratic-edge',
  //     keyShape: {
  //       opacity: 0.4,
  //     },
  //   },
  //   modes: {
  //     default: ['click-select', 'drag-canvas', 'drag-node'],
  //   },
  // });
  // graph.on('afterlayout', (e) => {
  //   const edgeDatas = graph.getAllEdgesData().map((edge) => {
  //     const { id, source, target } = edge;
  //     const sourceData = graph.getNodeData(source);
  //     const targetData = graph.getNodeData(target);
  //     const xSep = (graph.getSize()[0] - 20) / graph.getAllNodesData().length;
  //     const endsSepStep = (targetData.data.x - sourceData.data.x) / xSep;
  //     const sign = endsSepStep < 0 ? 1 : -1;
  //     return {
  //       id,
  //       data: {
  //         keyShape: {
  //           curveOffset: sign * 10 * Math.ceil(Math.abs(endsSepStep)),
  //         },
  //       },
  //     };
  //   });
  //   graph.updateData('edge', edgeDatas);
  // });
  graph.on('afterlayout', (e) => {
    const angleUpdates = graph.getAllNodesData().map((node) => {
      const { x, y } = node.data;
      const vecX = x - width / 2;
      const vecY = y - height / 2;
      const dist = Math.sqrt(vecX * vecX + vecY * vecY);
      let angle = Math.asin(vecY / dist);
      if (vecX < 0) angle = -angle;
      return {
        id: node.id,
        data: {
          labelShape: {
            position: vecX < 0 ? 'center' : 'right',
            textAlign: vecX < 0 ? 'right' : 'left',
            angle,
          },
        },
      };
    });
    graph.updateData('node', angleUpdates);
    graph.fitView();
  });
  return graph;
};
