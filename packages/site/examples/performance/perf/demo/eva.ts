import { Graph, Extensions, extend } from '@antv/g6';

const dataFormat = (data, options = {}, userGraphCore) => {
  const map = new Map();
  const nodes: any = [];
  data.nodes.forEach((node) => {
    if (map.has(node.id)) return;
    nodes.push(node);
    map.set(node.id, true);
  });
  data.edges.forEach((edge) => {
    const sourceDegree = map.get(edge.source) || 0;
    map.set(edge.source, sourceDegree + 1);
    const targetDegree = map.get(edge.target) || 0;
    map.set(edge.target, targetDegree + 1);
  });
  return {
    nodes: nodes.map((node) => {
      const { id, x, y, olabel } = node;
      return {
        id,
        data: {
          x,
          y,
          label: olabel,
          degree: map.get(id),
        },
      };
    }),
    edges: data.edges.map((edge) => ({
      id: `edge-${Math.random()}`,
      source: edge.source,
      target: edge.target,
    })),
  };
};
const ExtGraph = extend(Graph, {
  transforms: {
    'data-format': dataFormat,
  },
  behaviors: {
    'brush-select': Extensions.BrushSelect,
    'activate-relations': Extensions.ActivateRelations,
  },
});

const container = document.getElementById('container') as HTMLElement;
const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML = `正在渲染大规模数据，请稍等……`;
container.appendChild(descriptionDiv);

const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new ExtGraph({
  container: 'container',
  width,
  height,
  transform: [
    'data-format',
    {
      type: 'map-node-size',
      field: 'degree',
      range: [2, 24],
    },
  ],
  modes: {
    default: ['brush-select', 'zoom-canvas', 'activate-relations', 'drag-canvas', 'drag-node'],
  },
  node: (model) => {
    const { id, data } = model;
    const { degree, label } = data;
    let labelLod;
    if (degree > 30) labelLod = -2;
    else if (degree > 20) labelLod = -1;
    else if (degree > 15) labelLod = 0;
    else if (degree > 10) labelLod = 1;
    else if (degree > 6) labelLod = 2;
    else if (degree > 3) labelLod = 3;
    const config = {
      id,
      data: {
        ...data,
        animates: {
          hide: [
            {
              fields: ['opacity'],
              duration: 200,
              shapeId: 'labelShape',
            },
          ],
          update: [
            {
              fields: ['lineWidth'],
              shapeId: 'keyShape',
              duration: 100,
            },
            {
              fields: ['opacity'],
              shapeId: 'haloShape',
            },
          ],
        },
      },
    };
    if (labelLod !== undefined) {
      config.data.labelShape = {
        text: label,
        opacity: 0.8,
        maxWidth: '250%',
        lod: labelLod,
      };
      config.data.labelBackgroundShape = {
        lod: labelLod,
      };
      config.data.lodStrategy = {
        levels: [
          { zoomRange: [0, 1] }, // -2
          { zoomRange: [1, 1.2] }, // -1
          { zoomRange: [1.2, 0.4], primary: true }, // 0
          { zoomRange: [1.4, 1.6] }, // 1
          { zoomRange: [1.6, 1.8] }, // 2
          { zoomRange: [1.8, 2.5] }, // 3
          { zoomRange: [2.5, Infinity] }, // 4
        ],
        animateCfg: {
          duration: 500,
        },
      };
    }
    return config;
  },
  edge: {
    keyShape: {
      lineWidth: 0.3,
      opacity: 0.5,
    },
  },
  nodeState: {
    selected: {
      keyShape: {
        lineWidth: 1,
      },
      haloShape: {
        lineWidth: 4,
      },
    },
  },
  edgeState: {
    selected: {
      keyShape: {
        lineWidth: 2,
      },
      haloShape: {
        lineWidth: 4,
      },
    },
  },
});

fetch('https://gw.alipayobjects.com/os/basement_prod/0b9730ff-0850-46ff-84d0-1d4afecd43e6.json')
  .then((res) => res.json())
  .then((res) => {
    graph.read(res);

    const nodeLen = graph.getAllNodesData().length;
    const edgeLen = graph.getAllEdgesData().length;
    descriptionDiv.innerHTML = `节点数量：${nodeLen}, 边数量：${edgeLen}, 图元数量：${nodeLen * 3 + edgeLen}`;
  });
