import { Graph, extend, Extensions } from '@antv/g6';

class CustomNode extends Extensions.CircleNode {
  drawOtherShapes(model, shapeMap, diffData) {
    return {
      responseShape: this.upsertShape(
        'circle',
        'responseShape',
        {
          r: 8,
          fill: '#0f0',
          cx: 0,
          cy: -25,
          zIndex: 10,
        },
        shapeMap,
      ),
    };
  }
}

const ExtGraph = extend(Graph, {
  nodes: {
    'custom-node': CustomNode,
  },
});

const data = {
  nodes: [
    {
      id: 'node1',
      data: {
        x: 100,
        y: 150,
        label: 'Click the Green Circle',
        size: 100,
      },
    },
    {
      id: 'node2',
      data: {
        x: 300,
        y: 150,
        label: 'Click the Green Circle',
        size: 100,
      },
    },
  ],
  edges: [
    {
      id: 'edge-1',
      source: 'node1',
      target: 'node2',
    },
  ],
};

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new ExtGraph({
  container,
  width,
  height,
  modes: {
    default: ['drag-node'],
  },
  plugins: [
    {
      // lod-controller will be automatically assigned to graph with `disableLod: false` to graph if it is not configured as following
      type: 'lod-controller',
      disableLod: true,
    },
  ],
  node: {
    type: 'custom-node',
    keyShape: {
      r: {
        fields: ['size'],
        formatter: (model) => model.data.size / 2,
      },
    },
    labelShape: {
      position: 'center',
      text: {
        fields: ['label'],
        formatter: (model) => model.data.label,
      },
    },
    labelBackgroundShape: {},
    otherShapes: {},
  },
  data,
});

// 节点上的点击事件
graph.on('node:click', (event) => {
  const { itemId, target } = event;
  if (target.id === 'responseShape') {
    graph.updateData('node', {
      id: itemId,
      data: {
        label: 'Response!',
      },
    });
    graph.setItemState(itemId, 'selected', true);
  }
});

graph.on('canvas:click', (event) => {
  const nodeIds = graph.getAllNodesData().map((node) => node.id);
  graph.setItemState(nodeIds, 'selected', false);
  graph.updateData(
    'node',
    nodeIds.map((id) => ({
      id,
      data: {
        label: 'Click the Green Circle',
      },
    })),
  );
});

window.graph = graph;