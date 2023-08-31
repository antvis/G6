import { Graph as BaseGraph, Extensions, extend } from '@antv/g6';

const Graph = extend(BaseGraph, {
  plugins: {
    legend: Extensions.Legend,
  },
  behaviors: {
    'brush-select': Extensions.BrushSelect,
    'activate-relations': Extensions.ActivateRelations,
    'zoom-canvas': Extensions.ZoomCanvas,
  },
});

// import { faker } from '@faker-js/faker';

const container = document.getElementById('container') as HTMLElement;
const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 50;

/** graph schema */
const GraphSchema = {
  nodes: [
    {
      nodeType: 'person',
      properties: {
        id: 'string',
        name: 'string',
        phoneNumber: 'number',
      },
      count: 10,
    },
    {
      nodeType: 'company',
      properties: {
        id: 'string',
        name: 'string',
      },
      count: 3,
    },
  ],
  edges: [
    {
      edgeType: 'friend',
      sourceType: 'person',
      targetType: 'person',
      properties: {},
      count: 3,
    },
    {
      edgeType: 'employ',
      sourceType: 'company',
      targetType: 'person',
      properties: {},
      count: 4,
    },
    {
      edgeType: 'legal',
      sourceType: 'person',
      targetType: 'company',
      properties: {},
      count: 5,
    },
  ],
};
const nodeMap = new Map();
const nodeTypeMap = new Map();
const edgeMap = new Map();
GraphSchema.nodes.forEach((item, index) => {
  const { nodeType, count, properties } = item;
  Array.from({ length: count }).map((c, i) => {
    const id = `${nodeType}-${index}-${i}`;
    const node = {
      id,
      data: {
        ...properties, // can import facker
        nodeType,
        id,
      },
    };
    nodeMap.set(id, node);
    const nty = nodeTypeMap.get(nodeType) || [];
    nodeTypeMap.set(nodeType, [...nty, node]);
  });
});

GraphSchema.edges.forEach((item, index) => {
  const { edgeType, count, properties, sourceType, targetType } = item;
  const sources = nodeTypeMap.get(sourceType);
  const targets = nodeTypeMap.get(targetType);
  console.log(sources, sourceType);
  Array.from({ length: count }).forEach((c, i) => {
    const id = `${edgeType}-${index}-${i}`;
    const edge = {
      id,
      data: {
        ...properties, // can import facker
        edgeType,
        id,
      },
      source: sources[i % sources.length].id,
      target: targets[i % targets.length].id,
    };
    edgeMap.set(id, edge);
  });
});

const data = {
  nodes: [...nodeMap.values()],
  edges: [...edgeMap.values()],
};

console.log(data);

const legend = {
  key: 'default-legend',
  type: 'legend',
  size: 'fit-content',
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
  },
  edge: {
    enable: true,
    padding: [10, 20],
    title: 'edge-legend',
    typeField: 'edgeType',
  },
};

new Graph({
  container: 'container',
  width,
  height,
  data,
  plugins: [legend],
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
    default: ['brush-select', 'zoom-canvas', 'activate-relations', 'drag-canvas', 'drag-node'],
  },
});
