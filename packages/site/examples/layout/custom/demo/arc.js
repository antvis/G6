import { BaseEdge, BaseLayout, ExtensionCategory, Graph, register } from '@antv/g6';

class ArcLayout extends BaseLayout {
  async execute(data, options) {
    const { nodeSep = 20, nodeSize } = { ...this.options, ...options };
    const { nodes } = data;
    return {
      nodes: nodes.map((node, index) => ({
        id: node.id,
        style: {
          x: index * (nodeSep + nodeSize),
          y: 0,
        },
      })),
    };
  }
}

class ArcEdge extends BaseEdge {
  getKeyPath(attributes) {
    const [sourcePoint, targetPoint] = this.getEndpoints(attributes);
    const [sx, sy] = sourcePoint;
    const [tx] = targetPoint;
    const r = Math.abs(tx - sx) / 2;

    return [
      ['M', sx, sy],
      ['A', r, r, 0, 0, sx < tx ? 1 : 0, tx, sy],
    ];
  }
}

register(ExtensionCategory.LAYOUT, 'arc', ArcLayout);
register(ExtensionCategory.EDGE, 'arc', ArcEdge);

const palette = {
  analytics: 'rgb(158, 1, 66)',
  data: 'rgb(213, 62, 79)',
  animate: 'rgb(244, 109, 67)',
  display: 'rgb(253, 174, 97)',
  flex: 'rgb(254, 224, 139)',
  physics: 'rgb(230, 245, 152)',
  query: 'rgb(171, 221, 164)',
  scale: 'rgb(102, 194, 165)',
  util: 'rgb(50, 136, 189)',
  vis: 'rgb(94, 79, 162)',
};

fetch('https://gw.alipayobjects.com/os/basement_prod/70cde3be-22e8-4291-98f1-4d5a5b75b62f.json')
  .then((res) => res.json())
  .then((data) => {
    const getCluster = (id) => data.nodes.find((node) => node.id === id).cluster;

    const graph = new Graph({
      container: 'container',
      data,
      autoFit: 'view',
      node: {
        style: {
          size: 20,
          fill: (d) => palette[d.cluster],
          ports: [{ position: 'top' }],
          labelText: (d) => d.name,
          labelTextAlign: 'start',
          labelTextBaseline: 'middle',
          labelTransform: [['rotate', 90]],
        },
      },
      edge: {
        type: 'arc',
        style: {
          stroke: (d) => `linear-gradient(${palette[getCluster(d.source)]}, ${palette[getCluster(d.source)]})`,
          strokeOpacity: 0.5,
        },
      },
      layout: {
        type: 'arc',
        nodeSize: 20,
        preLayout: true,
      },
      behaviors: ['zoom-canvas', 'drag-canvas'],
    });

    graph.render();
  });
