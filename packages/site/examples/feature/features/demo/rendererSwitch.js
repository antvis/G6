import { Graph, Extensions, extend } from '@antv/g6';

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const renderers = {
  '🐰 Canvas': 'canvas',
  '🐢 SVG': 'svg',
  '🚀 WebGL': 'webgl',
  '⭐️ WebGL-3D': 'webgl-3d',
};

const getDefaultNodeAnimates = (delay) => ({
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
      fields: ['opacity'],
      duration: 200,
      shapeId: 'labelShape',
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
  { zoomRange: [0, 0.16] }, // -2
  { zoomRange: [0.16, 0.2] }, // -1
  { zoomRange: [0.2, 0.3], primary: true }, // 0
  { zoomRange: [0.3, 0.5] }, // 1
  { zoomRange: [0.5, 0.8] }, // 2
  { zoomRange: [0.8, 1.5] }, // 3
  { zoomRange: [1.5, 1.8] }, // 4
  { zoomRange: [1.8, 2] }, // 5
  { zoomRange: [2, Infinity] }, // 6
];

const defaultTheme = {
  type: 'spec',
  base: 'light',
  specification: {
    node: {
      dataTypeField: 'cluster',
    },
  },
};

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

const create3DGraph = async (data) => {
  return new ExtGraph({
    container,
    width,
    height,
    renderer: 'webgl-3d',
    transforms: [
      'data-format',
      {
        type: 'map-node-size',
        field: 'degree',
        range: [2, 24],
      },
    ],
    data,
    // layout: {
    //   type: 'force-wasm',
    //   threads,
    //   dimensions: 2,
    //   maxIteration: 5000,
    //   minMovement: 0.1,
    //   distanceThresholdMode: 'mean',
    //   height,
    //   width,
    //   center: [width / 2, height / 2],
    //   factor: 1,
    //   gravity: 5,
    //   linkDistance: 200,
    //   edgeStrength: 200,
    //   nodeStrength: 1000,
    //   coulombDisScale: 0.005,
    //   damping: 0.9,
    //   maxSpeed: 2000,
    //   interval: 0.02,
    // },
    modes: {
      default: [
        {
          type: 'orbit-canvas-3d',
          trigger: 'drag',
        },
        'zoom-canvas-3d',
      ],
    },
    theme: {
      type: 'spec',
      base: 'dark',
      specification: {
        node: {
          dataTypeField: 'cluster',
        },
      },
    },
    edge: (innerModel) => {
      return {
        ...innerModel,
        data: {
          ...innerModel.data,
          keyShape: {
            lineWidth: 0.6,
            opacity: 0.6,
            stroke: '#fff',
          },
          type: 'line-edge',
        },
      };
    },
    node: (innerModel) => {
      const { degree = 1 } = innerModel.data;
      return {
        ...innerModel,
        data: {
          ...innerModel.data,
          type: 'sphere-node',
          labelShape:
            degree > 20
              ? {
                  text: innerModel.data.label,
                  fontSize: 100,
                  lod: -1,
                  fill: 'rgba(255,255,255,0.85)',
                  wordWrap: false, // FIXME: mesh.getBounds() returns an empty AABB
                  isBillboard: true,
                }
              : undefined,
        },
      };
    },
  });
};

const create2DGraph = (renderer, data) => {
  return new ExtGraph({
    container,
    width,
    height,
    renderer,
    transforms: [
      'data-format',
      {
        type: 'map-node-size',
        field: 'degree',
        range: [2, 24],
      },
    ],
    modes: {
      default: [
        { type: 'zoom-canvas', key: '123', triggerOnItems: true, enableOptimize: true },
        'drag-node',
        'drag-canvas',
        'brush-select',
        'click-select',
      ],
    },
    theme: { ...defaultTheme },
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
      if (degree > 40) labelLod = -2;
      else if (degree > 20) labelLod = -1;
      else if (degree > 10) labelLod = 0;
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
            degree > 10
              ? {
                  text: innerModel.data.label,
                  maxWidth: '400%',
                  offsetY: 8,
                  lod: labelLod,
                }
              : undefined,

          labelBackgroundShape:
            degree !== 0
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
    data,
  });
};

const handleCreateGraph = (renderer, data, prevGraph, tip) => {
  let graph;
  const func = () => {
    if (renderer === 'webgl-3d') {
      graph = create3DGraph(data);
    } else {
      graph = create2DGraph(renderer, data);
    }
    graph.on('afterrender', (e) => {
      tip.innerHTML = '👌 Done!';
    });
  };
  if (prevGraph) {
    prevGraph.destroy(() => {
      return func();
    });
  } else {
    func();
  }
  return graph;
};

const ExtGraph = extend(Graph, {
  transforms: {
    'data-format': dataFormat,
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
let graph;
let graphData3D;

const btnContainer = document.createElement('div');
btnContainer.style.position = 'absolute';
btnContainer.style.zIndex = 10;
container.appendChild(btnContainer);
const tip2 = document.createElement('span');
tip2.innerHTML = '🌊 Fetching data....';
btnContainer.appendChild(tip2);
const tip = document.createElement('span');
tip.innerHTML = '<br />👉 Change Renderer:';
btnContainer.appendChild(tip);

fetch('https://gw.alipayobjects.com/os/basement_prod/0b9730ff-0850-46ff-84d0-1d4afecd43e6.json')
  .then((res) => res.json())
  .then((data) => {
    tip2.innerHTML = '🎨 Rendering....';
    Object.keys(renderers).forEach((name, i) => {
      const btn = document.createElement('a');
      btn.innerHTML = name;
      btn.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
      btn.style.padding = '4px';
      btn.style.marginLeft = i > 0 ? '24px' : '8px';
      btnContainer.appendChild(btn);
      btn.addEventListener('click', () => {
        tip2.innerHTML = '🎨 Rendering....';
        if (renderers[name] === 'webgl-3d') {
          if (!graphData3D) {
            fetch('https://assets.antv.antgroup.com/g6/eva-3d.json')
              .then((res) => res.json())
              .then((data3d) => {
                graphData3D = data3d;
                graph = handleCreateGraph(renderers[name], graphData3D, graph, tip2);
              });
          } else {
            graph = handleCreateGraph(renderers[name], graphData3D, graph, tip2);
          }
        } else {
          graph = handleCreateGraph(renderers[name], data, graph, tip2);
        }
      });
    });

    graph = handleCreateGraph('canvas', data, graph, tip2);
  });

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight - 160]);
  };
