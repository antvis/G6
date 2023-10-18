import { Graph, Extensions, extend } from '@antv/g6';

// This site has mounted Algorithm to window. 本站点已将 Algorithm 挂载到 window 上
// Import Algorithm for node clustering in your project. 在你的项目中需要引入 Algorithm 用于下面的节点聚类计算
// import Algorithm from '@antv/layout'

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const themes = {
  '🌞 Light': {
    type: 'spec',
    base: 'light',
    specification: {
      node: {
        dataTypeField: 'cluster',
      },
    },
  },
  '🌚 Dark': {
    type: 'spec',
    base: 'dark',
    specification: {
      node: {
        dataTypeField: 'cluster',
      },
    },
  },
  '🌎 Blue': {
    type: 'spec',
    base: 'light',
    specification: {
      canvas: {
        backgroundColor: '#f3faff',
      },
      node: {
        dataTypeField: 'cluster',
        palette: ['#bae0ff', '#91caff', '#69b1ff', '#4096ff', '#1677ff', '#0958d9', '#003eb3', '#002c8c', '#001d66'],
      },
    },
  },
  '🌕 yellow': {
    type: 'spec',
    base: 'light',
    specification: {
      canvas: {
        backgroundColor: '#fcf9f1',
      },
      node: {
        dataTypeField: 'cluster',
        palette: ['#ffe7ba', '#ffd591', '#ffc069', '#ffa940', '#fa8c16', '#d46b08', '#ad4e00', '#873800', '#612500'],
      },
    },
  },
};

const getDefaultNodeAnimates = (delay) => ({
  buildIn: [
    {
      fields: ['opacity'],
      duration: 1000,
      delay: delay === undefined ? 1000 + Math.random() * 1000 : delay,
    },
  ],
  buildOut: [
    {
      fields: ['opacity'],
      duration: 200,
    },
  ],
  update: [
    {
      fields: ['lineWidth', 'fill', 'r'],
      shapeId: 'keyShape',
    },
    {
      fields: ['fontSize'],
      shapeId: 'iconShape',
    },
    {
      fields: ['opacity'],
      shapeId: 'haloShape',
    },
  ],
  hide: [
    {
      fields: ['size'],
      duration: 200,
    },
    {
      fields: ['opacity'],
      duration: 200,
      shapeId: 'keyShape',
    },
    {
      fields: ['opacity'],
      duration: 200,
      shapeId: 'labelShape',
    },
  ],
  show: [
    {
      fields: ['size'],
      duration: 200,
    },
    {
      fields: ['opacity'],
      duration: 200,
      shapeId: 'keyShape',
      order: 0,
    },
  ],
});

const getDefaultEdgeAnimates = (delay) => ({
  buildIn: [
    {
      fields: ['opacity'],
      duration: 300,
      delay: delay === undefined ? 1000 + Math.random() * 1000 : delay,
    },
  ],
  buildOut: [
    {
      fields: ['opacity'],
      duration: 200,
    },
  ],
  update: [
    {
      fields: ['lineWidth'],
      shapeId: 'keyShape',
    },
    {
      fields: ['opacity'],
      shapeId: 'haloShape',
    },
  ],
});

const lodStrategyLevels = [
  { zoomRange: [0, 0.6] }, // -2
  { zoomRange: [0.6, 0.8] }, // -1
  { zoomRange: [0.8, 1], primary: true }, // 0
  { zoomRange: [1, 1.2] }, // 1
  { zoomRange: [1.2, 1.4] }, // 2
  { zoomRange: [1.4, 2.5] }, // 3
  { zoomRange: [2.5, Infinity] }, // 4
];

const dataFormat = (dataAUR, options = {}, graphCore) => {
  const { dataAdded, dataUpdated, dataRemoved } = dataAUR;
  return {
    dataAdded: dataFormatHandler(dataAdded, options, graphCore),
    dataUpdated: dataFormatHandler(dataUpdated, options, graphCore),
    dataRemoved,
  };
};

const dataFormatHandler = (data, options = {}, graphCore) => {
  if (!data.nodes || !data.edges) return {};
  const map = new Map();
  const nodes = [];
  data.nodes?.forEach((node) => {
    if (map.has(node.id)) return;
    nodes.push(node);
    map.set(node.id, true);
  });
  data.edges?.forEach((edge) => {
    const sourceDegree = map.get(edge.source) || 0;
    map.set(edge.source, sourceDegree + 1);
    const targetDegree = map.get(edge.target) || 0;
    map.set(edge.target, targetDegree + 1);
  });
  return {
    nodes: nodes.map((node) => {
      const { id, x, y, z, olabel, data } = node;
      return {
        id,
        data: {
          x,
          y,
          z,
          label: olabel,
          ...data,
          degree: map.get(id),
        },
      };
    }),
    edges:
      data.edges?.map((edge) => ({
        id: `edge-${Math.random()}`,
        source: edge.source,
        target: edge.target,
      })) || [],
  };
};

const clusteringNodes = (dataAUR = {}, options = {}, graphCore) => {
  const { dataAdded = {}, dataUpdated = {}, dataRemoved = {} } = dataAUR;
  const handler = (data = {}, options = {}, core) => {
    if (!Algorithm?.labelPropagation || !data.nodes?.length) return data;
    const nodes = graphCore ? core.getAllNodes() : data.nodes;
    const edges = graphCore ? core.getAllEdges() : data.edges;
    const clusteredData = Algorithm.labelPropagation({ nodes, edges }, false);
    clusteredData.clusters.forEach((cluster, i) => {
      cluster.nodes.forEach((node) => {
        node.data.cluster = `c${i}`;
      });
    });
    return data;
  };
  return {
    dataAdded: handler(dataAdded, options, graphCore),
    dataUpdated: handler(dataUpdated, options, graphCore),
    dataRemoved: dataRemoved || {},
  };
};

const ExtGraph = extend(Graph, {
  transforms: {
    'data-format': dataFormat,
    'clustering-node': clusteringNodes,
    'map-node-size': Extensions.MapNodeSize,
  },
  nodes: {
    'sphere-node': Extensions.SphereNode,
  },
  behaviors: {
    'brush-select': Extensions.BrushSelect,
    'orbit-canvas-3d': Extensions.OrbitCanvas3D,
    'zoom-canvas-3d': Extensions.ZoomCanvas3D,
  },
});

const btnContainer = document.createElement('div');
btnContainer.style.position = 'absolute';
btnContainer.style.zIndex = 10;
container.appendChild(btnContainer);
const tip2 = document.createElement('span');
tip2.innerHTML = '🌊 Fetching data....';
btnContainer.appendChild(tip2);
const tip = document.createElement('span');
tip.innerHTML = '<br />👉 Change Theme:';
btnContainer.appendChild(tip);

const graph = new ExtGraph({
  container,
  width,
  height,
  transforms: [
    'data-format',
    'clustering-node',
    {
      type: 'map-node-size',
      field: 'degree',
      range: [6, 30],
    },
  ],
  modes: {
    default: [
      { type: 'zoom-canvas', key: '123', triggerOnItems: true },
      'drag-node',
      'drag-canvas',
      'brush-select',
      'click-select',
    ],
  },
  theme: { ...themes['🌞 Light'] },
  autoFit: 'view',
  edge: (innerModel) => {
    return {
      ...innerModel,
      data: {
        ...innerModel.data,
        type: 'line-edge',
        animates: getDefaultEdgeAnimates(),
        keyShape: {
          lineWidth: 0.3,
          opacity: 0.5,
        },
      },
    };
  },
  // 节点配置
  node: (innerModel) => {
    const { degree } = innerModel.data;
    let labelLod = 3;
    if (degree > 20) labelLod = -2;
    else if (degree > 15) labelLod = -1;
    else if (degree > 10) labelLod = 2;
    else if (degree > 5) labelLod = 4;
    return {
      ...innerModel,
      data: {
        animates: getDefaultNodeAnimates(),
        ...innerModel.data,
        lodStrategy: {
          levels: lodStrategyLevels,
          animateCfg: {
            duration: 500,
          },
        },
        labelShape:
          degree > 5
            ? {
                text: innerModel.data.label,
                maxWidth: '400%',
                offsetY: 8,
                lod: labelLod,
              }
            : undefined,

        labelBackgroundShape:
          degree > 5
            ? {
                lod: labelLod,
              }
            : undefined,
      },
    };
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

fetch('https://gw.alipayobjects.com/os/basement_prod/da5a1b47-37d6-44d7-8d10-f3e046dabf82.json')
  .then((res) => res.json())
  .then((data) => {
    tip2.innerHTML = '🎨 Rendering....';
    graph.read(data);

    Object.keys(themes).forEach((name, i) => {
      const btn = document.createElement('a');
      btn.innerHTML = name;
      btn.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
      btn.style.padding = '4px';
      btn.style.marginLeft = i > 0 ? '24px' : '8px';
      btnContainer.appendChild(btn);
      btn.addEventListener('click', () => {
        graph.updateTheme(themes[name]);
      });
    });
  });

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight - 160]);
  };
